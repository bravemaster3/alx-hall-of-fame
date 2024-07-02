# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import ProjectViewSet, CommentViewSet #, LoginView, LogoutView, GitHubAuthView

# # Create a router and register the ProjectViewSet with it.
# router = DefaultRouter()
# router.register(r'projects', ProjectViewSet, basename='project')
# # router.register(r'comments', CommentViewSet, basename='comment')
# # router.register(r'projects/(?P<project_pk>\d+)/comments', CommentViewSet, basename='project-comments')

# # Register CommentViewSet with nested route
# project_router = DefaultRouter()
# project_router.register(r'projects/(?P<project_pk>\d+)/comments', CommentViewSet, basename='project-comments')

# urlpatterns = [
#     # Include the routes for the ProjectViewSet
#     path('', include(router.urls)),
#     path('', include(project_router.urls)),
#     # path('<int:project_id>/comments/', CommentViewSet.as_view({'post': 'create', 'get': 'list'}), name='project-comments'),
# ]


from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter
from .views import ProjectViewSet, CommentViewSet

# Create a router and register the ProjectViewSet with it.
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

# Register CommentViewSet with nested route under projects
project_router = NestedDefaultRouter(router, r'projects', lookup='project')
project_router.register(r'comments', CommentViewSet, basename='project-comments')
urlpatterns = [
    # Include the routes for the ProjectViewSet
    path('', include(router.urls)),
    # Include the nested routes for the comments
    path('', include(project_router.urls)),
]
