from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin
from .models import User


class CustomUserAdmin(UserAdmin):
    model = User

    # 管理画面の一覧に表示する項目
    list_display = ('id', 'username', 'email', 'gender', 'age', 'is_staff')

    # 検索対象
    search_fields = ('username', 'email')

    # フィルタ
    list_filter = ('gender', 'age', 'is_staff')

    # 編集画面のフィールド構成
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('プロフィール情報', {'fields': ('gender', 'age', 'icon')}),
        ('権限', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('その他', {'fields': ('last_login',)}),
    )

    # 新規作成画面のフィールド構成
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'gender', 'age', 'icon'),
        }),
    )

admin.site.register(User, CustomUserAdmin)