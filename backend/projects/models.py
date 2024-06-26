#projects.models
from django.db import models
from django.contrib.auth.models import User

# class Project(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     authors = models.CharField(max_length=255)
#     description = models.TextField()
#     tags = models.CharField(max_length=255)
#     github_repository = models.URLField()
#     live_project_link = models.URLField()
#     project_image = models.ImageField(upload_to='project_images/')

class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_projects")
    users = models.ManyToManyField(User, related_name='projects')
    projectTitle = models.CharField(max_length=100)
    authors = models.CharField(max_length=255)
    description = models.TextField()
    tags = models.CharField(max_length=255)
    githubRepos = models.URLField()
    liveProject = models.URLField()
    imgFile = models.ImageField(upload_to='project_images/')
