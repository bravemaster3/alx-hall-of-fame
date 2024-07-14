from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth.models import User
from .models import Project, Comment
from .serializers import ProjectSerializer, CommentSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
import logging
from django.shortcuts import get_object_or_404


logger = logging.getLogger(__name__)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def create_with_token(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return Response({"error": "No access token provided"}, status=status.HTTP_400_BAD_REQUEST)

        access_token_str = auth_header.split(' ')[1]

        try:
            access_token = AccessToken(access_token_str)
            user_id = access_token['user_id']
            user = User.objects.get(id=user_id)

            if user.is_authenticated:
                request.user = user  # Set the user in the request
                request.data._mutable = True  # Allow modification of request data
                request.data['user'] = user.id
                request.data['users'] = user.id
                request.data['authors'] = request.data['authors'].lower()
                
                # Parse the authors field and create/link users
                authors = request.data.get('authors', '')
                author_usernames = [username.strip().lower() for username in authors.split(',')]
                author_users = []
                
                for username in author_usernames:
                    if username:
                        author_user, created = User.objects.get_or_create(username=username)
                        author_users.append(author_user)
                
                if not user in author_users:
                    request.data['authors'] = f"{user.username}, {request.data['authors']}"
                    author_users.insert(0, user)
                
                # Serialize the project data
                serializer = self.get_serializer(data=request.data, context={'request': request})
                
                if serializer.is_valid(raise_exception=True):
                    project = serializer.save(user=user)
                    # logger.info(f"Related users: {[user.username for user in project.users.all()]}")
                    
                    # Link project to author users
                    # for author_user in author_users:
                        # print("REACHED HERREEEEEEEEE")
                    project.users.add(*author_users)
                    
                    headers = self.get_success_headers(serializer.data)
                    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "User is not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
        except TokenError as e:
            return Response({"error": f"Token error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"An unexpected error occurred: {str(e)}")
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        # This method should not be called directly, instead use create_with_token
        return Response({"error": "Use the create_with_token endpoint"}, status=status.HTTP_400_BAD_REQUEST)   

    
    def get_permissions(self):
        if self.action in ['create_with_token', 'update', 'destroy']:  # Only allow POST method for creating new projects with token
            return [permissions.IsAuthenticated()]
        elif self.action in ['list', 'retrieve']:  # Allow GET method for listing and retrieving projects
            return [permissions.AllowAny()]
        return super(ProjectViewSet, self).get_permissions()
    
    # @action(detail=False, methods=['delete'], permission_classes=[permissions.IsAuthenticated])
    def destroy(self, request, *args, **kwargs):
        # Only allow DELETE if the user is authenticated
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_403_FORBIDDEN)
        # Check if the user is the owner of the project
        project = self.get_object()
        if request.user != project.user:
            return Response({"detail": "You do not have permission to delete this project."}, status=status.HTTP_403_FORBIDDEN)

        return super(ProjectViewSet, self).destroy(request, *args, **kwargs)
    
    # @action(detail=False, methods=['put'], permission_classes=[permissions.IsAuthenticated])
    # def update(self, request, *args, **kwargs):
    #     # Only allow DELETE if the user is authenticated
    #     if not request.user.is_authenticated:
    #         return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_403_FORBIDDEN)
    #     # Check if the user is the owner of the project
    #     project = self.get_object()
    #     if request.user != project.user:
    #         return Response({"detail": "You do not have permission to edit this project."}, status=status.HTTP_403_FORBIDDEN)

    #     return super(ProjectViewSet, self).update(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_403_FORBIDDEN)

        project = self.get_object()
        if request.user != project.user:
            return Response({"detail": "You do not have permission to edit this project."}, status=status.HTTP_403_FORBIDDEN)

        request.data._mutable = True
        request.data['authors'] = request.data['authors'].lower()

        authors = request.data.get('authors', '')
        author_usernames = [username.strip().lower() for username in authors.split(',')]
        author_users = []

        for username in author_usernames:
            if username:
                author_user, created = User.objects.get_or_create(username=username)
                author_users.append(author_user)

        if not request.user in author_users:
            request.data['authors'] = f"{request.user.username}, {request.data['authors']}"
            author_users.insert(0, request.user)

        response = super(ProjectViewSet, self).update(request, *args, **kwargs)
        if response.status_code == 200:
            project.users.set(author_users)
            response.data['authors'] = ', '.join(user.username for user in project.users.all()) # [user.username for user in project.users.all()]

        return response
    

    @action(detail=False, url_path='user/(?P<github_username>.+)')
    def user_projects(self, request, github_username=None):
        # projects = self.get_queryset().filter(user__username=github_username)
        # serializer = self.get_serializer(projects, many=True)
        # return Response(serializer.data)
        projects = self.get_queryset().filter(Q(user__username=github_username.lower()) | Q(users__username=github_username.lower())).distinct()
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)
    
    # Endpoint to handle likes
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        try:
            project = self.get_object()
            user = request.user
            if user in project.likes.all():
                project.likes.remove(user)
                message = 'You disliked this project'
            else:
                project.likes.add(user)
                message = 'You liked this project'
            project.save()
            return Response({'status': message, 'likes_count': project.total_likes()}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)  


# class CommentViewSet(viewsets.ModelViewSet):
#     queryset = Comment.objects.all().order_by('-created_at')
#     serializer_class = CommentSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     # @action(detail=True, methods=['get', 'post', 'put'])
#     def perform_create(self, serializer):
#         project_id = self.kwargs['project_pk']
#         project = get_object_or_404(Project, id=project_id)
#         serializer.save(user=self.request.user, project=project)

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # Get the project_id from the URL
        project_pk = self.kwargs['project_pk']
        # Filter comments by project
        return Comment.objects.filter(project_id=project_pk).order_by('-created_at')

    def perform_create(self, serializer):
        project_pk = self.kwargs['project_pk']
        project = get_object_or_404(Project, id=project_pk)
        serializer.save(user=self.request.user, project=project)
