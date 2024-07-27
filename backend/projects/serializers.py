# projects.serializers.py

from rest_framework import serializers
from .models import Project, Comment
from backend.serializers import UserSerializer
from django.conf import settings

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    project = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'project', 'user', 'content', 'created_at']


class ProjectSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    users = UserSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)
    # imgFile = serializers.SerializerMethodField()

    class Meta:
        model = Project
        # fields = '__all__'
        fields = [
            'id', 'user', 'users', 'projectTitle', 'authors', 'description', 
            'tags', 'githubRepos', 'liveProject', 'imgFile', 'likes', 'comments',
            'total_likes', 'likes_count'
        ]
    
    # def get_imgFile(self, obj):
    #     if obj.imgFile:
    #         return f"{settings.MEDIA_URL}{obj.imgFile.name}"  # This returns the relative path
    #     return None
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.imgFile:
            representation['imgFile'] = f"{settings.MEDIA_URL}{instance.imgFile.name}"
        return representation
    
    def get_likes_count(self, obj):
        return obj.total_likes()
