from django.http import HttpResponse
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from .models import Post, City, TechSpec, Division, District, Thana, ProductFeature, UserProfile
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    CitySerializer, CitySlideSerializer, CityStatsSerializer, 
    ProductSerializer, TechSpecSerializer, PostSerializer,
    DivisionSerializer, DistrictSerializer, ThanaSerializer, BangladeshDataSerializer, 
    ProductFeatureSerializer, UserRegistrationSerializer, 
    PhoneVerificationSerializer, CodeVerificationSerializer,
    SupportLinkSerializer
)
from .services import generate_verification_code, send_sms_verification

def home(request):
    return HttpResponse('hello api')

@api_view(['GET', 'POST'])
def post_list(request):
    """
    List all posts, or create a new post.
    """
    if request.method == 'GET':
        posts = Post.objects.all().order_by('-created_at')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            if request.user.is_authenticated:
                serializer.save(author=request.user)
            else:
                return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })

class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    lookup_field = 'slug'
    
    def get_serializer_context(self): 
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    @action(detail=False, methods=['get', 'post'])
    def bulk(self, request):
        if request.method == 'GET':
            cities = City.objects.all()
            serializer = CitySerializer(cities, many=True)
            return Response(serializer.data)
        
        elif request.method == 'POST':
            cities_data = request.data.get('cities', [])
            
            if not cities_data:
                return Response(
                    {"error": "No cities data provided"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            created_cities = []
            errors = []
            
            for city_data in cities_data:
                try:
                    city_serializer = CitySerializer(data={
                        'name': city_data.get('name'),
                        'slug': city_data.get('slug', city_data.get('name', '').lower())
                    })
                    
                    if city_serializer.is_valid():
                        city = city_serializer.save()
                        created_cities.append(city.name)
                    else:
                        errors.append({
                            'city': city_data.get('name', 'Unknown'),
                            'errors': city_serializer.errors
                        })
                
                except Exception as e:
                    errors.append({
                        'city': city_data.get('name', 'Unknown'),
                        'error': str(e)
                    })
            
            response_data = {
                'created_cities': created_cities,
                'count': len(created_cities)
            }
            
            if errors:
                response_data['errors'] = errors
                return Response(response_data, status=status.HTTP_207_MULTI_STATUS)
            
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

class TechSpecViewSet(viewsets.ModelViewSet):
    queryset = TechSpec.objects.all()
    serializer_class = TechSpecSerializer
    
    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_bulk_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return super().create(request, *args, **kwargs)
    
    def perform_bulk_create(self, serializer):
        return TechSpec.objects.bulk_create(
            [TechSpec(**item) for item in serializer.validated_data]
        )

class DivisionViewSet(viewsets.ModelViewSet):
    queryset = Division.objects.all()
    serializer_class = DivisionSerializer
    permission_classes = [permissions.AllowAny]
    
    @action(detail=False, methods=['post'])
    def bulk_import(self, request):
        """
        Bulk import Bangladesh geographical data
        """
        data = request.data
        
        if not isinstance(data, list):
            return Response(
                {"error": "Data should be a list of geographical entries"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        created_divisions = 0
        created_districts = 0
        created_thanas = 0
        errors = []
        
        for entry in data:
            try:
                division, created = Division.objects.get_or_create(
                    name=entry['division']
                )
                if created:
                    created_divisions += 1
                
                district, created = District.objects.get_or_create(
                    name=entry['district'],
                    division=division
                )
                if created:
                    created_districts += 1
                
                for thana_name in entry['thanas']:
                    thana, created = Thana.objects.get_or_create(
                        name=thana_name,
                        district=district
                    )
                    if created:
                        created_thanas += 1
                        
            except Exception as e:
                errors.append({
                    'entry': entry.get('_id', 'Unknown'),
                    'error': str(e)
                })
        
        response_data = {
            'created_divisions': created_divisions,
            'created_districts': created_districts,
            'created_thanas': created_thanas,
            'total_entries_processed': len(data)
        }
        
        if errors:
            response_data['errors'] = errors
            return Response(response_data, status=status.HTTP_207_MULTI_STATUS)
        
        return Response(response_data, status=status.HTTP_201_CREATED)

class DistrictViewSet(viewsets.ModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = District.objects.all()
        division_id = self.request.query_params.get('division_id', None)
        if division_id is not None:
            queryset = queryset.filter(division_id=division_id)
        return queryset

class ThanaViewSet(viewsets.ModelViewSet):
    queryset = Thana.objects.all()
    serializer_class = ThanaSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = Thana.objects.all()
        district_id = self.request.query_params.get('district_id', None)
        if district_id is not None:
            queryset = queryset.filter(district_id=district_id)
        return queryset

@api_view(['GET'])
def bangladesh_data(request):
    """
    Get all Bangladesh geographical data
    """
    divisions = Division.objects.all()
    result = []
    
    for division in divisions:
        for district in division.districts.all():
            thanas = [thana.name for thana in district.thanas.all()]
            result.append({
                'division': division.name,
                'district': district.name,
                'thanas': thanas
            })
    
    return Response(result)

class ProductFeatureViewSet(viewsets.ModelViewSet):
    queryset = ProductFeature.objects.all()
    serializer_class = ProductFeatureSerializer
    permission_classes = [permissions.AllowAny]
    
    @action(detail=False, methods=['get'])
    def active_features(self, request):
        """
        Get only active product features
        """
        active_features = ProductFeature.objects.all()
        serializer = self.get_serializer(active_features, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        """
        Handle both single and bulk creation
        """
        if isinstance(request.data, list):
            return self.bulk_create(request, *args, **kwargs)
        else:
            return super().create(request, *args, **kwargs)
    
    def bulk_create(self, request, *args, **kwargs):
        """
        Handle bulk creation of product features
        """
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_bulk_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def perform_bulk_create(self, serializer):
        """
        Perform the bulk creation
        """
        ProductFeature.objects.bulk_create([
            ProductFeature(**item) for item in serializer.validated_data
        ])

# Authentication and User Registration Views

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    """Register a new user and send verification code"""
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        
        # Generate and send verification code
        profile = user.profile
        code = generate_verification_code()
        profile.verification_code = code
        profile.save()
        
        # Send SMS
        send_sms_verification(profile.phone, code)
        
        # Generate support link and QR code
        profile.generate_support_link()
        profile.generate_qr_code()
        
        return Response({
            'message': 'User registered successfully. Please verify your phone number.',
            'user_id': user.id,
            'phone': profile.phone
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def send_verification_code(request):
    """Send verification code to a phone number"""
    serializer = PhoneVerificationSerializer(data=request.data)
    if serializer.is_valid():
        phone = serializer.validated_data['phone']
        
        try:
            profile = UserProfile.objects.get(phone=phone)
        except UserProfile.DoesNotExist:
            # For new users, create a profile without a User first
            profile = UserProfile.objects.create(phone=phone, role='customer')
        
        # Generate and send new verification code
        code = generate_verification_code()
        profile.verification_code = code
        profile.save()
        
        # Send SMS
        if send_sms_verification(phone, code):
            return Response({'message': 'Verification code sent successfully'})
        else:
            return Response(
                {'error': 'Failed to send verification code'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def verify_code(request):
    """Verify the phone number with the code"""
    serializer = CodeVerificationSerializer(data=request.data)
    if serializer.is_valid():
        phone = serializer.validated_data['phone']
        
        try:
            profile = UserProfile.objects.get(phone=phone)
        except UserProfile.DoesNotExist:
            return Response(
                {'error': 'Phone number not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Mark phone as verified
        profile.is_phone_verified = True
        profile.verification_code = None
        profile.save()
        
        # If user doesn't exist, create one
        if not profile.user:
            user = User.objects.create_user(
                username=phone,
                email=f"{phone}@safetap.local",
                first_name='Customer'
            )
            profile.user = user
            profile.save()
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(profile.user)
        access_token = str(refresh.access_token)
        
        # Get support link and QR code
        support_link = profile.support_link or profile.generate_support_link()
        qr_code = profile.qr_code or profile.generate_qr_code()
        
        return Response({
            'message': 'Phone number verified successfully',
            'access': access_token,
            'refresh': str(refresh),
            'user': {
                'id': profile.user.id,
                'username': profile.user.username,
                'email': profile.user.email,
                'first_name': profile.user.first_name,
                'phone': profile.phone,
                'role': profile.role
            },
            'support_link': support_link,
            'qr_code': qr_code
        })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_support_info(request):
    """Get support link and QR code for authenticated user"""
    profile = request.user.profile
    
    # Ensure support link and QR code exist
    support_link = profile.support_link or profile.generate_support_link()
    qr_code = profile.qr_code or profile.generate_qr_code()
    
    serializer = SupportLinkSerializer(profile)
    return Response(serializer.data)
