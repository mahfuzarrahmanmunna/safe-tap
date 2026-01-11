# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    home,
    post_list,
    CustomAuthToken,
    CityViewSet,
    TechSpecViewSet,
    DivisionViewSet,
    DistrictViewSet,
    ThanaViewSet,
    ProductFeatureViewSet,
    register_user,
    send_verification_code,
    verify_code,
    get_support_info,
    bangladesh_data
)

# Create a router and register viewsets
router = DefaultRouter()
router.register(r'cities', CityViewSet, basename='city')
router.register(r'techspecs', TechSpecViewSet, basename='techspec')
router.register(r'divisions', DivisionViewSet, basename='division')
router.register(r'districts', DistrictViewSet, basename='district')
router.register(r'thanas', ThanaViewSet, basename='thana')
router.register(r'features', ProductFeatureViewSet, basename='product-feature')

app_name = 'api'

urlpatterns = [
    # Home
    path('', home, name='home'),
    
    # Router URLs
    path('', include(router.urls)),
    
    # Posts
    path('posts/', post_list, name='post-list'),
    
    # Bangladesh geographical data
    path('bangladesh-data/', bangladesh_data, name='bangladesh-data'),
    
    # Authentication endpoints
    path('auth/register/', register_user, name='register-user'),
    path('auth/send-code/', send_verification_code, name='send-verification-code'),
    path('auth/verify-code/', verify_code, name='verify-code'),
    path('auth/token/', CustomAuthToken.as_view(), name='auth-token'),
    path('auth/support-info/', get_support_info, name='get-support-info'),
]
