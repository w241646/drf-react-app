# backend/account/urls.py
from django.urls import path
# from rest_framework.routers import DefaultRouter
from .views import MeView, ChangePasswordView

# router = DefaultRouter()
# router.register(r'me', MeViewSet, basename='me')

urlpatterns = [
    path('me/', MeView.as_view(), name='me'),
    path('me/change-password/', ChangePasswordView.as_view(), name='change-password'),
]