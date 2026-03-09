"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

from django.http import JsonResponse  # ★ 追加


# ★ 追加：超軽量ヘルスチェック（起動ウォームアップ用）
def healthz(_request):
    return JsonResponse({"ok": True})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('healthz/', healthz),            # ★ 追加（/healthz）
    path('api/', include('api.urls')),
]


# 開発中のメディア配信
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# JWT 認証用のエンドポイントを追加
urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]





# --- debug: DB 接続情報を確認（作業後に削除してOK） ---
from django.http import JsonResponse
from django.conf import settings
from django.db import connection

def dbinfo(_request):
    s = settings.DATABASES["default"]
    return JsonResponse({
        "engine": s["ENGINE"],
        "name": s.get("NAME"),
        "host": connection.settings_dict.get("HOST"),
        "port": connection.settings_dict.get("PORT"),
        "user": connection.settings_dict.get("USER"),
    })

urlpatterns += [
    path("dbinfo/", dbinfo),
]


# --- debug: DBのユーザー件数を確認（作業後に削除可） ---
from account.models import User  # ← 追加

def dbusers(_request):
    sample = list(User.objects.values("id", "username", "email", "is_staff", "is_active")[:20])
    return JsonResponse({"count": User.objects.count(), "sample": sample})

urlpatterns += [
    path("dbusers/", dbusers),  # ← 追加
]
