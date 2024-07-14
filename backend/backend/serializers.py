from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['full_name', 'location', 'cohort', 'bio', 'updated', 'facebook', 'twitter', 'linkedin']
# class UserSerializer(serializers.ModelSerializer):
#     """serializer for the User class"""
#     full_name = serializers.SerializerMethodField()

#     class Meta(object):
#         model = User
#         fields = ['id', 'username', 'full_name', 'email']
    
#     def get_full_name(self, obj):
#         return obj.first_name


# class UserSerializer(serializers.ModelSerializer):
#     # profile = ProfileSerializer(source='profile_set', read_only=True)
#     full_name = serializers.CharField(source='profile.full_name', read_only=True)
#     location = serializers.CharField(source='profile.location', read_only=True)
#     cohort = serializers.CharField(source='profile.cohort', read_only=True)

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'full_name', 'location', 'cohort']

#     def update(self, instance, validated_data):
#         # Update logic for User model if needed
#         return instance

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='profile.full_name', required=False)
    location = serializers.CharField(source='profile.location', required=False)
    cohort = serializers.CharField(source='profile.cohort', required=False)
    updated = serializers.BooleanField(source='profile.updated', required=False)
    bio = serializers.CharField(source='profile.bio', required=False, allow_blank=True, allow_null=True)
    facebook = serializers.URLField(source='profile.facebook', required=False, allow_blank=True, allow_null=True)
    twitter = serializers.URLField(source='profile.twitter', required=False, allow_blank=True, allow_null=True)
    linkedin = serializers.URLField(source='profile.linkedin', required=False, allow_blank=True, allow_null=True)
    avatar = serializers.URLField(source='profile.avatar', required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'full_name', 'location', 'cohort', 'bio', 'facebook', 'twitter', 'linkedin', 'avatar', 'updated']
    
    def to_internal_value(self, data):
        # Handle empty strings for URL fields and convert to None
        for field in ['bio', 'facebook', 'twitter', 'linkedin']:
            if field in data and data[field] == '':
                data[field] = None
        return super().to_internal_value(data)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})

        # Update User instance
        # instance.username = validated_data.get('username', instance.username) # we want username to only come from github.
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        # Update Profile instance
        profile = instance.profile
        profile.full_name = profile_data.get('full_name', profile.full_name)
        profile.location = profile_data.get('location', profile.location)
        profile.cohort = profile_data.get('cohort', profile.cohort)
        profile.bio = profile_data.get('bio', profile.bio)
        profile.facebook = profile_data.get('facebook', profile.facebook)
        profile.twitter = profile_data.get('twitter', profile.twitter)
        profile.linkedin = profile_data.get('linkedin', profile.linkedin)
        profile.avatar = profile_data.get('avatar', profile.avatar)
        profile.save()

        return instance

