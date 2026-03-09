# review/serializers.py
from rest_framework import serializers
from django.templatetags.static import static  # ★追加
from .models import Review #, CyclingRoad

# class CyclingRoadSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CyclingRoad
#         fields = ['id', 'name', 'location', 'length_km', 'difficulty_level', 'created_at', 'updated_at']

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    user_gender = serializers.CharField(source='user.gender', read_only=True)
    user_age = serializers.IntegerField(source='user.age', read_only=True)
    user_icon = serializers.ImageField(source='user.icon', read_only=True, use_url=False)
    user_icon_url = serializers.SerializerMethodField()  # ★追加

    class Meta:
        model = Review
        fields = [
            'id',
            'user_name',
            'user_gender',
            'user_age',
            'user_icon',
            'user_icon_url',      # ★追加：フロントはこれを使う
            'title',
            'body',
            'rating',
            'created_at',
            'updated_at'
        ]
        read_only_fields = [
            'user_name',
            'user_gender',
            'user_age',
            'user_icon',
            'created_at',
            'updated_at'
        ]

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


    # ★追加：常に“絶対URL”で返す（Cloudinary/STATIC 両対応）
    def get_user_icon_url(self, obj):
        request = self.context.get("request", None)
        user = getattr(obj, "user", None)

        # 1) Cloudinary運用では user.icon.url は https で返る（そのままOK）
        icon = getattr(user, "icon", None) if user else None
        if icon:
            try:
                url = icon.url  # Cloudinaryなら絶対URL、旧MEDIAなら相対の可能性あり
                if isinstance(url, str) and url.startswith("/") and request:
                    return request.build_absolute_uri(url)
                return url
            except Exception:
                pass

        # 2) 未設定 → STATIC の既定を返す
        default_rel = static("img/default-icon.png")
        return request.build_absolute_uri(default_rel) if request else default_rel
