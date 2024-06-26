from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['full_name', 'location']

# class UserSerializer(serializers.ModelSerializer):
#     """serializer for the User class"""
#     full_name = serializers.SerializerMethodField()

#     class Meta(object):
#         model = User
#         fields = ['id', 'username', 'full_name', 'email']
    
#     def get_full_name(self, obj):
#         return obj.first_name


class UserSerializer(serializers.ModelSerializer):
    # profile = ProfileSerializer(source='profile_set', read_only=True)
    full_name = serializers.CharField(source='profile.full_name', read_only=True)
    location = serializers.CharField(source='profile.location', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'full_name', 'location']

    def update(self, instance, validated_data):
        # Update logic for User model if needed
        return instance
