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
from .serializers import ProfileSerializer
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
                'cohort': profile.cohort,
                'bio': profile.bio,
                'facebook': profile.facebook,
                'twitter': profile.twitter,
                'linkedin': profile.linkedin,
                'avatar': profile.avatar,
                'updated': profile.updated,
                # Add other fields as needed
            }
            # Return the serialized user data as JSON response
            return Response(data)

    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# @api_view(['GET'])
# def get_user_by_github_username(request, github_username):
#     """Get user info by github_username"""
#     user = get_object_or_404(User, username=github_username.lower())
#     profile = get_object_or_404(Profile, user=user)
#     # print("RETRIEVED PROFILE", profile.location)
#     data = {
#         'id': user.id,
#         'username': user.username,
#         'email': user.email,
#         'full_name': profile.full_name,
#         'location': profile.location,
#         'cohort': profile.cohort,
#         'bio': profile.bio,
#         'facebook': profile.facebook,
#         'twitter': profile.twitter,
#         'linkedin': profile.linkedin,
#         'avatar': profile.avatar,
#         'updated': profile.updated,
#         # Add other fields as needed
#     }
#     return Response(data)   
# 

@api_view(['GET'])
def get_user_by_github_username(request, github_username):
    """Get user info by github_username"""
    user = get_object_or_404(User, username=github_username.lower())
    
    try:
        profile = Profile.objects.get(user=user)
        profile_data = {
            'full_name': profile.full_name,
            'location': profile.location,
            'cohort': profile.cohort,
            'bio': profile.bio,
            'facebook': profile.facebook,
            'twitter': profile.twitter,
            'linkedin': profile.linkedin,
            'avatar': profile.avatar,
            'updated': profile.updated,
            # Add other fields as needed
        }
    except Profile.DoesNotExist:
        profile_data = {
            'full_name': '',
            'location': '',
            'cohort': '',
            'bio': '',
            'facebook': '',
            'twitter': '',
            'linkedin': '',
            'avatar': '',
            'updated': None
        }
    # print("RETRIEVED PROFILE", profile.location)

    data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        **profile_data  # Merge profile data into the response
    }
    return Response(data)       


@api_view(['GET'])
def get_all_users_with_profiles(request):
    """Get a list of all users with their profiles"""
    try:
        users = User.objects.select_related('profile').all()
        users_data = []

        for user in users:
            if hasattr(user, 'profile'):
                user_data = {
                    'full_name': user.profile.full_name,
                    'github_username': user.username,
                    'country': user.profile.location  # Assuming 'location' contains the country
                }
                users_data.append(user_data)

        return JsonResponse(users_data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['PUT'])
@csrf_exempt
# @authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """Update user profile and user details"""
    # print("REACHED HERE")
    user = request.user
    
    profile = get_object_or_404(Profile, user=user)

    # print("Profile avatar", profile.avatar)

    # Combine user and profile data
    data = request.data.copy()
    # data['profile'] = {
    #     'full_name': data.get('full_name', profile.full_name),
    #     'email': data.get('email', user.email),
    #     'location': data.get('location', profile.location),
    #     'cohort': data.get('cohort', profile.cohort),
    #     'bio': data.get('bio', profile.bio),
    #     'facebook': data.get('facebook', profile.facebook),
    #     'twitter': data.get('twitter', profile.twitter),
    #     'linkedin': data.get('linkedin', profile.linkedin),
    #     'avatar': profile.avatar if profile.avatar else None,
    #     'updated': True,
    # }
    data.update({
        'full_name': data.get('full_name', profile.full_name),
        'email': data.get('email', user.email),
        'location': data.get('location', profile.location),
        'cohort': data.get('cohort', profile.cohort),
        'bio': data.get('bio', profile.bio),
        'facebook': data.get('facebook', profile.facebook),
        'twitter': data.get('twitter', profile.twitter),
        'linkedin': data.get('linkedin', profile.linkedin),
        'avatar': profile.avatar if profile.avatar else None,
        'updated': True,  # Update this in the profile later
    })

    
    # print("DATA: ", data)

    serializer = UserSerializer(user, data=data, partial=True)
    # print("VALIDITY::", serializer.is_valid())
    if serializer.is_valid():
        # print("REACHED HERE:")
        serializer.save()
        profile = get_object_or_404(Profile, user=user)
        profile.updated = True
        profile.save()

        response_data = serializer.data
        # print('PROFILEEEEEEEEEE',profile.cohort)
        response_data['avatar'] = profile.avatar if profile.avatar else None
        return Response(response_data)

    # print("Serializer errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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
            full_name = user_data.get("name") if user_data.get("name") else ""
            avatar_url = user_data.get("avatar_url")
            location = user_data.get('location') if user_data.get('location') else ""
            # location = location if location else ""

            bio = user_data.get('bio')
            bio = bio if bio else ""

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

            primary_email = primary_email if primary_email else ""
        
            with transaction.atomic():
                user, created = User.objects.get_or_create(
                    username=username.lower(),
                    # defaults={
                    #     'email': primary_email,
                    # }
                )


                profile, profile_created = Profile.objects.get_or_create(
                    user=user,
                    # defaults={
                    #     'full_name': full_name,
                    #     'location': location,
                    #     'avatar': avatar_url,
                    #     'bio': bio,
                    # }
                )

                # Only update fields if the profile has not been manually updated
                # The avatar will be updated each time a login occurs, insuring a change in github is also fetched
                profile.avatar = avatar_url
                # print("PROFILE:", profile)
                profile.save()
                if not profile.updated:
                    profile.full_name = full_name
                    profile.location = location
                    profile.bio = bio
                    profile.save()
                    user.email = primary_email
                    user.save()
                    saved_profile = Profile.objects.get(user=user)
                    # print("Saved avatar URL in database:", saved_profile.avatar)
                    # print("PROFILE AVATAR URL NOT FROM THE DATABASE:", profile.avatar)
                    # print("USER:", user)
                else:
                # if profile.updated:
                    primary_email = user.email
                    location = profile.location
                    full_name = profile.full_name
                
                # print(f"CREATION STATUS: USER~{created}, PROFILE~{profile_created}")
                
                # print("PROFILE FIELDS:")
                # for field in Profile._meta.fields:
                #     print(f"{field.name}: {getattr(profile, field.name)}")

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                "is_authenticated": True, 
                "github_token": access_token, 
                "full_name": full_name, 
                "token": str(refresh.access_token),
                "refresh": str(refresh),
                "email": primary_email,
                "username": username,
                # "avatar": avatar_url,
                "location": location,
                "cohort": profile.cohort,
                "bio": profile.bio,
                "facebook": profile.facebook,
                "twitter": profile.twitter,
                "linkedin": profile.linkedin,
                "avatar": profile.avatar,
                "updated": profile.updated
                })
            
    # Handle authentication failure
    return JsonResponse({"is_authenticated": False, "error": "Authentication failed"}, status=400)
