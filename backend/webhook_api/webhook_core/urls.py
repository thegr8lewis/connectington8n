from django.urls import path
from . import views
from .views import WeeklyFeatureView

urlpatterns = [
    path('query/', views.process_agri_query, name='process_query'),
    path('history/', views.get_query_history, name='query_history'),
    path('profile/', views.create_farmer_profile, name='create_profile'),
    path('dashboard/', views.get_dashboard_stats, name='dashboard_stats'),
    path('weekly-features/', WeeklyFeatureView.as_view(), name='weekly-features'),
]