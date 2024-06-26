from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth.models import User
from .models import Project
from .serializers import ProjectSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
import logging


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

    # def create_with_token(self, request, *args, **kwargs):
    #     auth_header = request.headers.get('Authorization')
        
    #     if not auth_header or not auth_header.startswith('Bearer '):
    #         return Response({"error": "No access token provided"}, status=status.HTTP_400_BAD_REQUEST)
        
    #     access_token_str = auth_header.split(' ')[1]
        
    #     try:
    #         access_token = AccessToken(access_token_str)
    #         user_id = access_token['user_id']
    #         user = User.objects.get(id=user_id)
            
    #         if user.is_authenticated:
    #             request.user = user  # Set the user in the request
    #             # Include the user in the request data
    #             request.data._mutable = True  # Allow modification of request data
    #             request.data['user'] = user.id
    #             request.data._mutable = False
    #             print("CREATE WITH TOKEN ----- USER: ", request.user)
                
    #             # Initialize the serializer with the request data
    #             serializer = self.get_serializer(data=request.data, context={'request': request})
                
    #             # Check if the data is valid
    #             if serializer.is_valid(raise_exception=True):
    #                 self.perform_create(serializer)
    #                 headers = self.get_success_headers(serializer.data)
    #                 return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    #             else:
    #                 # Log the serializer errors
    #                 logger.error(f"Serializer errors: {serializer.errors}")
    #                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #         else:
    #             return Response({"error": "User is not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
    #     except TokenError as e:
    #         return Response({"error": f"Token error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
    #     except User.DoesNotExist:
    #         return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    #     except Exception as e:
    #         logger.error(f"An unexpected error occurred: {str(e)}")
    #         return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        # This method should not be called directly, instead use create_with_token
        return Response({"error": "Use the create_with_token endpoint"}, status=status.HTTP_400_BAD_REQUEST)

    def get_permissions(self):
        if self.action == 'create_with_token':  # Only allow POST method for creating new projects with token
            return [permissions.IsAuthenticated()]
        elif self.action in ['list', 'retrieve']:  # Allow GET method for listing and retrieving projects
            return [permissions.AllowAny()]
        return super(ProjectViewSet, self).get_permissions()

    @action(detail=False, url_path='user/(?P<github_username>.+)')
    def user_projects(self, request, github_username=None):
        # projects = self.get_queryset().filter(user__username=github_username)
        # serializer = self.get_serializer(projects, many=True)
        # return Response(serializer.data)
        projects = self.get_queryset().filter(Q(user__username=github_username.lower()) | Q(users__username=github_username.lower())).distinct()
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import viewsets, permissions, status
# from .models import Project
# from .serializers import ProjectSerializer
# from rest_framework.decorators import action
# import logging
# from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from  rest_framework.decorators import authentication_classes, permission_classes
# from rest_framework.authentication import SessionAuthentication, TokenAuthentication
# from django.contrib.auth import get_user_model

# User = get_user_model()


# def get_new_access_token(refresh_token):
#     try:
#         refresh = RefreshToken(refresh_token)
#         access_token = str(refresh.access_token)
#         return access_token
#     except Exception as e:
#         # Handle any exceptions (e.g., token expired, invalid token)
#         return None

# logger = logging.getLogger(__name__)

# class ProjectViewSet(viewsets.ModelViewSet):
#     queryset = Project.objects.all()
#     serializer_class = ProjectSerializer
#     # authentication_classes = [JWTAuthentication]
#     # permission_classes = [permissions.IsAuthenticated]

#     @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
#     # @authentication_classes([SessionAuthentication, TokenAuthentication])
#     # @permission_classes([permissions.IsAuthenticated])
#     def create_with_token(self, request, *args, **kwargs):
#         auth_header = request.headers.get('Authorization')
#         access_token_str = auth_header.split(' ')[1]
#         # print("TOKEN.???????????: ", access_token_str)
#         try:
#             access_token = AccessToken(access_token_str)
#             user_id = access_token['user_id']
#             user = User.objects.get(id=user_id)
            
#             if user.is_authenticated:
#                 request.user = user  # Set the user in the request
                
#                 return self.create(request, *args, **kwargs)
#             else:
#                 return Response({"error": "User is not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
#         except Exception:
#             pass

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

#     def create(self, request, *args, **kwargs):
#         # logger.debug(request)
#         serializer = self.get_serializer(data=request.data)
#         # print("SERIALIZED REQUEST DATA: ", serializer)
#         # serializer.is_valid(raise_exception=True)
        
#         self.perform_create(serializer)
#         print("REACHEDHERE")
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

#     def get_permissions(self):
#         if self.action == 'create':  # Only allow POST method for creating new projects
#             return [permissions.IsAuthenticated()]
#         elif self.action in ['list', 'retrieve']:  # Allow GET method for listing and retrieving projects
#             return [permissions.AllowAny()]
#         return super(ProjectViewSet, self).get_permissions()

#     @action(detail=False, url_path='user/(?P<github_username>.+)')
#     def user_projects(self, request, github_username=None):
#         projects = self.get_queryset().filter(user__username=github_username)
#         serializer = self.get_serializer(projects, many=True)
#         return Response(serializer.data)


# ##########################################################################################
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import viewsets, permissions, status
# from .models import Project
# from .serializers import ProjectSerializer
# from rest_framework.decorators import action
# import logging
# from rest_framework_simplejwt.tokens import RefreshToken


# def get_new_access_token(refresh_token):
#     try:
#         refresh = RefreshToken(refresh_token)
#         access_token = str(refresh.access_token)
#         return access_token
#     except Exception as e:
#         # Handle any exceptions (e.g., token expired, invalid token)
#         return None

# logger = logging.getLogger(__name__)
# # from django.views.decorators.csrf import csrf_exempt

# class ProjectViewSet(viewsets.ModelViewSet):
#     queryset = Project.objects.all()
#     serializer_class = ProjectSerializer
#     permission_classes = [permissions.IsAuthenticated]


#     def post(self, request):
#         # Assuming the frontend sends the refresh token in the request
#         refresh_token = request.data.get('refresh_token')

#         # Get a new access token
#         new_access_token = get_new_access_token(refresh_token)

#         if new_access_token:
#             # Use the new access token for further actions (e.g., create project)
#             # ...
#             return Response({"message": "Project created successfully"}, status=status.HTTP_201_CREATED)
        
#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

#     def create(self, request, *args, **kwargs):
#         logger.debug(request)
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
#     def get_permissions(self):
#         if self.action == 'create':  # Only allow POST method for creating new projects
#             return [permissions.IsAuthenticated()]
#         elif self.action in ['list', 'retrieve']:  # Allow GET method for listing and retrieving projects
#             return [permissions.AllowAny()]
#         return super(ProjectViewSet, self).get_permissions()

#     # @csrf_exempt
#     @action(detail=False, url_path='user/(?P<github_username>.+)')
#     def user_projects(self, request, github_username=None):
#         projects = self.get_queryset().filter(user__username=github_username)
#         serializer = self.get_serializer(projects, many=True)
#         return Response(serializer.data)
