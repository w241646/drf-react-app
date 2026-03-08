# game/views.py
from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import GameScore
from .serializers import GameScoreSerializer

class GameScoreViewSet(viewsets.ModelViewSet):
    queryset = GameScore.objects.all().order_by('-score')
    serializer_class = GameScoreSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def ranking(self, request):
        queryset = GameScore.objects.order_by('-score')

        # ★ ページネーションを適用
        paginator = PageNumberPagination()
        paginator.page_size = int(request.GET.get("page_size", 10))

        page = paginator.paginate_queryset(queryset, request)
        serializer = self.get_serializer(page, many=True)

        # {count, next, previous, results} の形式で返す
        return paginator.get_paginated_response(serializer.data)