from django.templatetags.static import static
from rest_framework import serializers
from .models import User


# ============================
#  マイページ用（GET / PATCH）
# ============================
class UserSerializer(serializers.ModelSerializer):
    # フルURLを返さない（相対パスで返す）
    icon = serializers.ImageField(use_url=False, allow_null=True, required=False) 
    icon_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'icon',
            'icon_url',
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

   
    # ----------------------------
    #  表示用URL（未設定なら STATIC のデフォルト）
    # ----------------------------
    def get_icon_url(self, obj):
        request = self.context.get("request", None)

        # 登録済みのユーザーアイコン（ImageField）があれば、その絶対URLを返す
        if getattr(obj, "icon", None):
            try:
                rel_url = obj.icon.url  # 例: /media/...
                # obj.icon が存在し、ストレージにファイルがある場合のみ
                return request.build_absolute_uri(rel_url) if request else rel_url
            except Exception:
                # 例：ファイル実体が無い等はデフォルトにフォールバック
                pass

        # 未設定なら STATIC のデフォルトを返す
        # ファイルパスは backend/account/static/img/default-icon.png
        default_rel = static("img/default-icon.png")  # 例: /static/img/default-icon.png
        return request.build_absolute_uri(default_rel) if request else default_rel



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
