# review/views.py

# from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from decimal import Decimal
from .models import Review #, CyclingRoad
from .serializers import ReviewSerializer #, CyclingRoadSerializer
from api.pagination import CustomPagination


# class CyclingRoadViewSet(viewsets.ModelViewSet):
#     queryset = CyclingRoad.objects.all()
#     serializer_class = CyclingRoadSerializer
#     permission_classes = [permissions.AllowAny]


class IsOwnerOrReadOnly(permissions.BasePermission):
    # 投稿者本人のみ 編集・削除 可能
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    pagination_class = CustomPagination

    # ★ 並び替え・フィルタリングを有効化
    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,
    ]

    # ★ 並び替え可能なフィールド
    ordering_fields = ['created_at', 'rating']
    ordering = ['-created_at']  # デフォルト：新着順

    # ★ get_queryset をあなたの構成に合わせて拡張
    def get_queryset(self):
        queryset = Review.objects.filter(is_deleted=False)

        # # --- 並び順（ordering） ---（※ 並び順は filter_backends（OrderingFilter） が処理する）
        # ordering = self.request.query_params.get('ordering')
        # if ordering:
        #     queryset = queryset.order_by(ordering)

        # --- rating フィルタ（★の絞り込み） ---
        rating = self.request.query_params.get('rating')
        if rating:
            try:
                base = Decimal(rating)
                queryset = queryset.filter(
                    rating__gte=base,
                    rating__lt=base + Decimal("1.0")
                )
            except:
                pass

        # --- 年代フィルタ（age_group） ---
        age_group = self.request.query_params.get('user__age')
        age_null = self.request.query_params.get('user__age__isnull')
        if age_null:
            queryset = queryset.filter(user__age__isnull=True)
        elif age_group:
            queryset = queryset.filter(user__age=age_group)

        # --- 性別フィルタ（gender） ---
        gender = self.request.query_params.get('user__gender')
        if gender:
            queryset = queryset.filter(user__gender=gender)

        return queryset


    # ★ 権限設定（あなたの構成を維持）
    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.IsAuthenticated()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsOwnerOrReadOnly()]
        return [permissions.AllowAny()]


    # ★ 論理削除    
    def destroy(self, request, *args, **kwargs):
        review = self.get_object()
        review.delete()
        return Response({"detail": "deleted"}, status=200)


    # ★ 自分のレビュー一覧
    @action(
        detail=False,
        methods=['get'],
        url_path='my',
        permission_classes=[IsAuthenticated],
        filter_backends=[]
    )
    def my_reviews(self, request):
        user = request.user
        queryset = Review.objects.filter(user=user, is_deleted=False).order_by('-created_at')

        # ページネーションを適用
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)