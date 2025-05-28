import json
import requests
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from .models import QueryHistory, FarmerProfile
from .serializers import AgriQuerySerializer, QueryHistorySerializer, FarmerProfileSerializer

import logging
from rest_framework.views import APIView
from .models import WeeklyFeature
from .serializers import WeeklyFeatureSerializer

class WeeklyFeatureView(APIView):
    def post(self, request):
        data = request.data.get('data')
        if not data:
            return Response({"error": "No data provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        weekly_feature = WeeklyFeature(
            daily_stats=data.get('dailyStats'),
            weekly_stats=data.get('weeklyStats'),
            weekly_plan=data.get('weeklyPlan'),
            advice=data.get('advice')
        )
        weekly_feature.save()
        serializer = WeeklyFeatureSerializer(weekly_feature)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def get(self, request):
        features = WeeklyFeature.objects.last()  # Get the latest entry
        if not features:
            return Response({"error": "No data available"}, status=status.HTTP_404_NOT_FOUND)
        serializer = WeeklyFeatureSerializer(features)
        return Response(serializer.data)

# Set up logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
def process_agri_query(request):
    """
    Process agricultural query through n8n workflow
    
    Expected request format:
    {
        "query": "How do I treat tomato blight?",
        "location": "Kenya",  # optional, defaults to "Nairobi"
        "farmer_id": 123      # optional integer
    }
    """
    
    # Debug logging - remove in production
    logger.info("=" * 50)
    logger.info(f"Request method: {request.method}")
    logger.info(f"Content-Type: {request.content_type}")
    logger.info(f"Raw data: {request.data}")
    logger.info(f"Data type: {type(request.data)}")
    logger.info("=" * 50)
    
    # Validate request data
    serializer = AgriQuerySerializer(data=request.data)
    
    if not serializer.is_valid():
        logger.error(f"Validation errors: {serializer.errors}")
        return Response({
            'success': False,
            'error': 'Invalid request data',
            'details': serializer.errors,
            'received_data': request.data
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Get validated data
    query_data = serializer.validated_data
    query_text = query_data['query']
    location = query_data.get('location', 'Nairobi')
    farmer_id = query_data.get('farmer_id')
    
    logger.info(f"Processing query: {query_text}")
    logger.info(f"Location: {location}")
    logger.info(f"Farmer ID: {farmer_id}")
    
    # Prepare payload for n8n webhook
    n8n_payload = {
        "body": {
            "text": query_text,
            "from": f"web_{farmer_id if farmer_id else 'anonymous'}",
            "location": location
        }
    }
    
    try:
        # Check if N8N_WEBHOOK_URL is configured
        if not hasattr(settings, 'N8N_WEBHOOK_URL') or not settings.N8N_WEBHOOK_URL:
            logger.error("N8N_WEBHOOK_URL not configured in settings")
            return Response({
                'success': False,
                'error': 'Webhook URL not configured'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        logger.info(f"Sending request to n8n: {settings.N8N_WEBHOOK_URL}")
        logger.info(f"Payload: {n8n_payload}")
        
        # Send request to n8n webhook
        response = requests.post(
            settings.N8N_WEBHOOK_URL,
            json=n8n_payload,
            headers={
                'Content-Type': 'application/json',
                'User-Agent': 'Django-AgriBot/1.0'
            },
            timeout=30
        )
        
        logger.info(f"n8n response status: {response.status_code}")
        logger.info(f"n8n response: {response.text}")
        
        if response.status_code == 200:
            # Parse n8n response
            try:
                # Try to parse as JSON first
                if response.headers.get('content-type', '').startswith('application/json'):
                    n8n_response_data = response.json()
                    n8n_response = n8n_response_data.get('response', response.text.strip())
                else:
                    n8n_response = response.text.strip()
                
                if not n8n_response:
                    n8n_response = "No response received from the system."
                    
            except json.JSONDecodeError:
                n8n_response = response.text.strip()
            
            # Detect query type
            query_type = detect_query_type(query_text)
            
            # Save to query history
            try:
                query_history = QueryHistory.objects.create(
                    query_type=query_type,
                    query_text=query_text,
                    response_text=n8n_response,
                    location=location,
                    farmer_id=farmer_id
                )
                
                logger.info(f"Query saved to history with ID: {query_history.id}")
                
                return Response({
                    'success': True,
                    'response': n8n_response,
                    'query_id': query_history.id,
                    'query_type': query_type,
                    'location': location,
                    'timestamp': query_history.created_at.isoformat()
                }, status=status.HTTP_200_OK)
                
            except Exception as db_error:
                logger.error(f"Database error: {str(db_error)}")
                # Still return the response even if saving fails
                return Response({
                    'success': True,
                    'response': n8n_response,
                    'query_type': query_type,
                    'location': location,
                    'warning': 'Response generated but not saved to history'
                }, status=status.HTTP_200_OK)
        
        else:
            logger.error(f"n8n webhook failed with status {response.status_code}: {response.text}")
            return Response({
                'success': False,
                'error': f'External service error (Status: {response.status_code})',
                'details': response.text if response.text else 'No error details available'
            }, status=status.HTTP_502_BAD_GATEWAY)
            
    except requests.exceptions.Timeout:
        logger.error("Request to n8n webhook timed out")
        return Response({
            'success': False,
            'error': 'Request timed out. Please try again.'
        }, status=status.HTTP_504_GATEWAY_TIMEOUT)
        
    except requests.exceptions.ConnectionError:
        logger.error("Failed to connect to n8n webhook")
        return Response({
            'success': False,
            'error': 'Unable to connect to external service. Please try again later.'
        }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error: {str(e)}")
        return Response({
            'success': False,
            'error': f'Connection error: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return Response({
            'success': False,
            'error': 'An unexpected error occurred. Please try again.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def detect_query_type(query):
    """
    Detect query type based on keywords in the query text
    
    Args:
        query (str): The user's query text
        
    Returns:
        str: The detected query type
    """
    if not query:
        return 'general'
        
    query_lower = query.lower()
    
    # Weather related queries
    weather_keywords = ['weather', 'rain', 'temperature', 'climate', 'drought', 'flood', 'season', 'humidity', 'wind']
    if any(word in query_lower for word in weather_keywords):
        return 'weather'
    
    # Pest and disease related queries
    pest_keywords = ['pest', 'disease', 'attack', 'bug', 'insect', 'fungus', 'virus', 'infection', 'blight', 'rot']
    if any(word in query_lower for word in pest_keywords):
        return 'pest'
    
    # Soil related queries
    soil_keywords = ['soil', 'ph', 'nutrient', 'nitrogen', 'phosphorus', 'potassium', 'organic', 'compost', 'erosion']
    if any(word in query_lower for word in soil_keywords):
        return 'soil'
    
    # Credit and financial queries
    credit_keywords = ['loan', 'credit', 'money', 'fund', 'bank', 'finance', 'subsidy', 'grant', 'insurance']
    if any(word in query_lower for word in credit_keywords):
        return 'credit'
    
    # Crop management queries (broader category)
    crop_keywords = ['fertilizer', 'grow', 'plant', 'seed', 'harvest', 'crop', 'farming', 'agriculture', 'yield']
    if any(word in query_lower for word in crop_keywords):
        return 'crop'
    
    # Market related queries
    market_keywords = ['price', 'market', 'sell', 'buy', 'trade', 'export', 'profit', 'income']
    if any(word in query_lower for word in market_keywords):
        return 'market'
    
    # Default to crop management
    return 'crop'

@api_view(['GET'])
def get_query_history(request):
    """Get query history for a farmer or all queries"""
    farmer_id = request.GET.get('farmer_id')
    
    if farmer_id:
        queries = QueryHistory.objects.filter(farmer_id=farmer_id).order_by('-created_at')
    else:
        queries = QueryHistory.objects.all().order_by('-created_at')[:20]
    
    serializer = QueryHistorySerializer(queries, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_farmer_profile(request):
    """Create or update farmer profile"""
    serializer = FarmerProfileSerializer(data=request.data)
    
    if serializer.is_valid():
        profile = serializer.save()
        return Response({
            'success': True,
            'farmer_id': profile.id,
            'message': 'Profile created successfully'
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_dashboard_stats(request):
    """Get dashboard statistics"""
    total_queries = QueryHistory.objects.count()
    weather_queries = QueryHistory.objects.filter(query_type='weather').count()
    pest_queries = QueryHistory.objects.filter(query_type='pest').count()
    crop_queries = QueryHistory.objects.filter(query_type='crop').count()
    
    recent_queries = QueryHistory.objects.order_by('-created_at')[:5]
    recent_serializer = QueryHistorySerializer(recent_queries, many=True)
    
    return Response({
        'total_queries': total_queries,
        'query_breakdown': {
            'weather': weather_queries,
            'pest': pest_queries,
            'crop': crop_queries,
            'other': total_queries - weather_queries - pest_queries - crop_queries
        },
        'recent_queries': recent_serializer.data
    })