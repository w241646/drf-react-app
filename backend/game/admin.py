# game/admin.py
from django.contrib import admin

# Register your models here.
from .models import GameScore

@admin.register(GameScore)
class GameScoreAdmin(admin.ModelAdmin):
    # 一覧画面に表示する項目
    list_display = ("id", "user", "score", "created_at")

    # 並び順（新しいスコアが上に来る）
    ordering = ("-created_at",)

    # 検索ボックス（ユーザー名で検索できる）
    search_fields = ("user__username",)

    # 絞り込み（サイドバー）
    list_filter = ("created_at",)

    # 1ページあたりの表示件数
    list_per_page = 50