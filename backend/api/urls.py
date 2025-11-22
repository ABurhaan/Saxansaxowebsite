from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    ContactMessageViewSet, ServiceViewSet, TeamMemberViewSet,
    JobViewSet, JobApplicationViewSet, UserProfileViewSet,
    CompanyInfoViewSet, UserViewSet, register, get_current_user, health_check
)

router = DefaultRouter()
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'jobs', JobViewSet, basename='job')
router.register(r'applications', JobApplicationViewSet, basename='application')
router.register(r'profiles', UserProfileViewSet, basename='profile')
router.register(r'company', CompanyInfoViewSet, basename='company')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', register, name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', get_current_user, name='get_current_user'),
    path('health/', health_check, name='health-check'),
]
