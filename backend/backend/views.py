#views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

from django.shortcuts import get_object_or_404

from  rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth.models import User
from .models import Profile
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from django.conf import settings
from django.db import transaction
import requests

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed for {}".format(request.user))


@api_view(['GET'])
def all_users(request):
    """Get a list of all users"""
    # Query all users from the database
    users = User.objects.all()
    # Serialize the users data
    serializer = UserSerializer(users, many=True)
    # Return the serialized data as a JSON response
    return Response(serializer.data)


@api_view(['GET'])
def get_user(request, user_id):
    """Get single user info"""
    try:
        # Retrieve the user object or return 404 if not found
        user = get_object_or_404(User, pk=user_id)
        #Fetching all the additional info from the User profile table
        profile = Profile.objects.get(user=user)

        if request.method == 'GET':
            # Serialize the user data
            data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'full_name': profile.full_name,
                'location': profile.location,
                # Add other fields as needed
            }
            # Return the serialized user data as JSON response
            return Response(data)

        # The following makes it possible to delete a user, but it requires no authentication, which is not a good idea. Addint that possibility later but only when logged in as the superuser.
        # elif request.method == 'DELETE':
        #     # Delete the user
        #     user.delete()
        #     # Return a success message
        #     return Response({'message': 'User deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

@csrf_exempt
@api_view(['GET'])
def github_callback(request):
    """callback function for github authentication"""
    # Extract the authorization code from the query parameters
    code = request.GET.get('code')

    # Exchange the authorization code for an access token with GitHub's OAuth API
    token_response = requests.post(
        'https://github.com/login/oauth/access_token',
        data={
            'client_id': settings.SOCIAL_AUTH_GITHUB_KEY,
            'client_secret': settings.SOCIAL_AUTH_GITHUB_SECRET,
            'code': code
        },
        headers={
            'Accept': 'application/json'
        }
    )

    if token_response.ok:
        # Extract the access token from the response
        # print(token_response.json())
        access_token = token_response.json().get('access_token')

        # Use the access token to fetch user data from GitHub
        user_response = requests.get(
            'https://api.github.com/user',
            headers={
                'Authorization': f'Bearer {access_token}'
            }
        )

        if user_response.ok:
            user_data = user_response.json()
            username = user_data.get('login')
            full_name = user_data.get("name")
            avatar_url = user_data.get("avatar_url")
            location = user_data.get('location')

            email_response = requests.get(
                'https://api.github.com/user/emails',
                headers={
                    'Authorization': f'Bearer {access_token}'
                }
            )

            # print(email_response.json())
            primary_email = None
            if email_response.ok:
                email_data = email_response.json()
                
                primary_email = next((email['email'] for email in email_data if email.get('primary')), None)

            if not primary_email:
                primary_email=""
            
            # user, created = User.objects.get_or_create(username=username,
            #                                            email=primary_email,
            #                                            first_name=full_name)

            with transaction.atomic():
                user, created = User.objects.update_or_create(
                    username=username.lower(),
                    defaults={
                        'email': primary_email,
                        # Add other fields you want to update or create
                    }
                )

                profile, profile_created = Profile.objects.update_or_create(
                    user=user,
                    defaults={
                        'full_name': full_name,
                        'location': location,
                    }
                )

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            return JsonResponse({
                "is_authenticated": True, 
                # "token": access_token, 
                "name": full_name, 
                "token": str(refresh.access_token),
                "refresh": str(refresh),
                "email": primary_email,
                "username": username,
                "avatar": avatar_url,
                "location": location
                })
            
    # Handle authentication failure
    return JsonResponse({"is_authenticated": False, "error": "Authentication failed"}, status=400)
