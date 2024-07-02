# projects.serializers.py

from rest_framework import serializers
from .models import Project, Comment
from backend.serializers import UserSerializer

# class ProjectSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Project
#         fields = '__all__'


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

    class Meta:
        model = Project
        fields = [
            'id', 'user', 'users', 'projectTitle', 'authors', 'description', 
            'tags', 'githubRepos', 'liveProject', 'imgFile', 'likes', 'comments',
            'total_likes', 'likes_count'
        ]

    def get_likes_count(self, obj):
        return obj.total_likes()
