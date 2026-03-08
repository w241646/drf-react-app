# backend/api/pagination.py
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    # デフォルトの件数
    page_size = 5
    # クエリパラメータで ?page_size=xxx を受け付ける
    page_size_query_param = 'page_size'
    # 最大件数（安全のための上限）
    max_page_size = 10000