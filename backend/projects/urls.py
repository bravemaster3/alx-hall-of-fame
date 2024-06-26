from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet #, LoginView, LogoutView, GitHubAuthView

# Create a router and register the ProjectViewSet with it.
router = DefaultRouter()
router.register(r'', ProjectViewSet, basename='project')

urlpatterns = [
    # Include the routes for the ProjectViewSet
    path('', include(router.urls)),
]
