from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReviewViewSet, CyclingRoadViewSet

router = DefaultRouter()
router.register(r'reviews', ReviewViewSet)
router.register(r'cycling-roads', CyclingRoadViewSet)

urlpatterns = [
    path('', include(router.urls)),
]