from django.db import models
from django.contrib.auth.models import User


class WeeklyFeature(models.Model):
    date = models.DateField(auto_now_add=True)
    daily_stats = models.JSONField()
    weekly_stats = models.JSONField()
    weekly_plan = models.JSONField()
    advice = models.TextField()

class FarmerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    location = models.CharField(max_length=100)
    farm_size = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    primary_crops = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class QueryHistory(models.Model):
    QUERY_TYPES = (
        ('weather', 'Weather'),
        ('pest', 'Pest Prediction'),
        ('crop', 'Crop Guide'),
        ('soil', 'Soil Info'),
        ('credit', 'Credit Scoring'),
    )
    
    farmer = models.ForeignKey(FarmerProfile, on_delete=models.CASCADE, null=True, blank=True)
    query_type = models.CharField(max_length=20, choices=QUERY_TYPES)
    query_text = models.TextField()
    response_text = models.TextField()
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)