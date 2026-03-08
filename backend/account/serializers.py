from rest_framework import serializers
from .models import User


# ============================
#  マイページ用（GET / PATCH）
# ============================
class UserSerializer(serializers.ModelSerializer):
    # フルURLを返さない（相対パスで返す）
    icon = serializers.ImageField(use_url=False, allow_null=True, required=False) 

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'icon',
            'gender',
            'age'
            ]
        read_only_fields = ['id']

    # ----------------------------
    #  username のバリデーション
    # ----------------------------
    def validate_username(self, value):
        user = self.instance  # 現在のユーザー
        if User.objects.exclude(id=user.id).filter(username=value).exists():
            raise serializers.ValidationError("このユーザー名は既に使用されています")
        return value

    # ----------------------------
    #  email のバリデーション
    # ----------------------------
    def validate_email(self, value):
        user = self.instance
        if User.objects.exclude(id=user.id).filter(email=value).exists():
            raise serializers.ValidationError("このメールアドレスは既に登録されています")
        return value

    # ----------------------------
    #  update（アイコン削除対応）
    # ----------------------------
    def update(self, instance, validated_data):
        # アイコン削除（空文字 or None の場合）
        if 'icon' in validated_data:
            icon = validated_data.get('icon')

            # 空文字 "" または None を削除扱いにする
            # if icon in ["", None]:
            if not icon:
                instance.icon.delete(save=False)
                instance.icon = None
                validated_data.pop('icon', None)

        return super().update(instance, validated_data)


# ============================
#  新規登録用（POST /register）
# ============================
class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, min_length=8)
    gender = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    age = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'gender',
            'age'
        ]

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("このユーザー名は既に使用されています")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("このメールアドレスは既に登録されています")
        return value

    def create(self, validated_data):
        password=validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user