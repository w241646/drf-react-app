# backend/api/urls.py
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from review.views import ReviewViewSet #, CyclingRoadViewSet
from game.views import GameScoreViewSet
from account.views import LogoutView, RegisterView
from .views import HealthView


router = DefaultRouter()
router.register(r'reviews', ReviewViewSet, basename='review')
# router.register(r'cycling-roads', CyclingRoadViewSet, basename='cyclingroad')
router.register(r'scores', GameScoreViewSet, basename='gamescore')
# router.register(r'me', MeViewSet, basename='me')

urlpatterns = [
    path('health/', HealthView.as_view(), name='api-health'),
    path('', include(router.urls)),

    # account アプリの URL を include
    path('', include('account.urls')),

    path('logout/', LogoutView.as_view(), name='api-logout'),
    path('register/', RegisterView.as_view(), name='api-register'),
]