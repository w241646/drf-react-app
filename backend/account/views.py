from django.shortcuts import render

# Create your views here.
# from rest_framework import viewsets
# from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
# from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
# from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, RegisterSerializer


# ============================
#  /api/me/ 取得・更新・削除
# ============================
class MeView(APIView):
    # queryset = User.objects.all()
    # serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    # GET /api/me/
    def get(self, request):
        # serializer = UserSerializer(request.user)
        # ★ 追加：context={"request": request}
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(serializer.data)

    # PATCH /api/me/
    def patch(self, request):
        serializer = UserSerializer(
            request.user,
            data=request.data,
            partial=True,
            context={"request": request},  # ★ 追加
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    # DELETE /api/me/
    def delete(self, request):
        request.user.delete()
        return Response({"detail": "アカウントを削除しました"}, status=204)


# ============================
#  パスワード変更
# ============================
class ChangePasswordView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    # POST /api/me/change-password/
    def post(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not user.check_password(old_password):
            return Response({"detail": "現在のパスワードが違います"}, status=400)
        
        user.set_password(new_password)
        user.save()
        return Response({"detail": "パスワードを変更しました"}, status=200)


# ============================
#  ログアウト（トークン無効化）
# ============================
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# ============================
#  新規登録（POST /api/register/）
# ============================
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "登録が完了しました"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
