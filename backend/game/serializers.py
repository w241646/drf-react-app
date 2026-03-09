# game/serializers.py
from rest_framework import serializers
from django.templatetags.static import static  # ★ 追加：既定アイコン用
from .models import GameScore

class GameScoreSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)
    user_icon = serializers.ImageField(source="user.icon", read_only=True, use_url=False)
    user_icon_url = serializers.SerializerMethodField()  # ★ 追加：フロントはこれを使う

    class Meta:
        model = GameScore
        fields = ['id', 'user', 'user_icon', 'user_icon_url', 'score', 'created_at']  # ★ ← ここに user_icon_url を追加
        read_only_fields = ['user', 'created_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


    # ★ 追加：常に“絶対URL”を返す（Cloudinary/STATIC 両対応）
    def get_user_icon_url(self, obj):
        request = self.context.get("request", None)
        user = getattr(obj, "user", None)

        icon = getattr(user, "icon", None) if user else None
        if icon:
            try:
                url = icon.url  # Cloudinaryなら https://res.cloudinary.com/...、旧MEDIAなら相対の可能性
                if isinstance(url, str) and url.startswith("/") and request:
                    return request.build_absolute_uri(url)
                return url
            except Exception:
                pass

        # 未設定 → STATIC の既定を返す
        default_rel = static("img/default-icon.png")
        return request.build_absolute_uri(default_rel) if request else default_rel
