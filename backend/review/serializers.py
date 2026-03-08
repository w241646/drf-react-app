# review/serializers.py
from rest_framework import serializers
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

    class Meta:
        model = Review
        fields = [
            'id',
            'user_name',
            'user_gender',
            'user_age',
            'user_icon',
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