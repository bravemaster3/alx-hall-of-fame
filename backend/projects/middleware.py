import logging

logger = logging.getLogger(__name__)
from rest_framework.request import Request
from django.utils.functional import SimpleLazyObject
from django.contrib.auth.middleware import get_user
from rest_framework_simplejwt.authentication import JWTAuthentication

# def get_user_jwt(request):
#     user = get_user(request)
#     if user.is_authenticated:
#         return user
#     try:
#         user_jwt = JWTAuthentication().authenticate(Request(request))
#         if user_jwt is not None:
#             return user_jwt[0]
#     except:
#         pass
#     return user

logger = logging.getLogger(__name__)

def get_user_jwt(request):
    user = get_user(request)
    # user = request.user

    if user.is_authenticated:
        return user

    authorization_header = request.headers.get('Authorization', None)
    if not authorization_header:
        logger.debug("No Authorization header found")
        return user  # Return anonymous user if no Authorization header

    try:
        # Assuming token format is "Bearer <token>"
        token = authorization_header.split()[1]
        user_jwt = JWTAuthentication().authenticate(Request(request))
        # print("TRIED AUTH:", user_jwt)
        # logger.debug(f"User authenticated: {user_jwt[0].is_authenticated}")
        if user_jwt is not None:
            return user_jwt[0]
    except Exception as e:
        logger.error(f"Error authenticating JWT: {e}")
    
    return user  # Return anonymous user if authentication fails


class LoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.user = SimpleLazyObject(lambda: get_user_jwt(request))
        logger.debug(f"Request method: {request.method}")
        logger.debug(f"Request path: {request.path}")
        # logger.debug(f"User authenticated: {request.user.is_authenticated}")
        logger.debug(f"JWT token: {request.headers.get('Authorization')}")
        logger.debug(f"JWT user data: {request.user if request.user else None}")
        logger.debug(f"Request user: {request.user}")
        # logger.debug(f'workaround user: {my_user}')
        # print(f'workaround user: {my_user}')
        logger.debug(f"Request headers: {request.headers}")
        logger.debug(f"Request body: {request.body}")
        response = self.get_response(request)

        return response
