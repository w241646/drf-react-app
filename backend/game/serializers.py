# game/serializers.py
from rest_framework import serializers
from .models import GameScore

class GameScoreSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)
    user_icon = serializers.ImageField(source="user.icon", read_only=True, use_url=False)

    class Meta:
        model = GameScore
        fields = ['id', 'user', 'user_icon', 'score', 'created_at']
        read_only_fields = ['user', 'created_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)