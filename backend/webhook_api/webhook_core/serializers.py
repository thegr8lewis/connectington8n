from rest_framework import serializers
from .models import FarmerProfile, QueryHistory
from .models import WeeklyFeature

class WeeklyFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklyFeature
        fields = ['id', 'date', 'daily_stats', 'weekly_stats', 'weekly_plan', 'advice']

class FarmerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmerProfile
        fields = '__all__'

class QueryHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = QueryHistory
        fields = '__all__'

class AgriQuerySerializer(serializers.Serializer):
    query = serializers.CharField(max_length=500)
    location = serializers.CharField(max_length=100, default="Nairobi")
    farmer_id = serializers.IntegerField(required=False)