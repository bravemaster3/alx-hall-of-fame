# projects.serializers.py

from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


# from rest_framework import serializers
# from .models import Project
# from django.contrib.auth.models import User

# class ProjectSerializer(serializers.ModelSerializer):
#     users = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

#     class Meta:
#         model = Project
#         fields = ['id', 'users', 'projectTitle', 'authors', 'description', 'tags', 'githubRepos', 'liveProject', 'imgFile']
