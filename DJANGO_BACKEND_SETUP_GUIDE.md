# Django Backend Setup Guide - Phone Verification API

## ✅ Prerequisites
- Django 3.2 or higher
- Django REST Framework
- django-rest-framework-simplejwt
- Twilio or another SMS provider (for sending verification codes)
- Python 3.8+

## 📦 Installation

### 1. Install Required Packages

```bash
pip install django
pip install djangorestframework
pip install django-rest-framework-simplejwt
pip install django-cors-headers
pip install twilio  # For SMS verification
pip install qrcode pillow  # For QR code generation
pip install python-decouple  # For environment variables
```

### 2. Django Settings Configuration

Add to your `settings.py`:

```python
# settings.py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt',
    
    # Local apps
    'api',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
]

# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
}

# JWT Configuration
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

# Twilio Configuration (or your SMS provider)
TWILIO_ACCOUNT_SID = os.environ.get('TWILIO_ACCOUNT_SID', 'your_account_sid')
TWILIO_AUTH_TOKEN = os.environ.get('TWILIO_AUTH_TOKEN', 'your_auth_token')
TWILIO_PHONE_NUMBER = os.environ.get('TWILIO_PHONE_NUMBER', '+1234567890')
```

### 3. Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

## 🔌 API Endpoints

### 1. **Send Verification Code**
```
POST /api/auth/send-code/

Request Headers:
Content-Type: application/json

Request Body:
{
  "phone": "01234567890"
}

Response (Success - 200):
{
  "message": "Verification code sent successfully"
}

Response (Error - 400):
{
  "detail": "Failed to send verification code"
}
```

### 2. **Verify Code & Create User**
```
POST /api/auth/verify-code/

Request Body:
{
  "phone": "01234567890",
  "code": "123456"
}

Response (Success - 200):
{
  "message": "Phone number verified successfully",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "user_01234567890",
    "email": null,
    "phone": "01234567890",
    "first_name": null,
    "last_name": null,
    "role": "customer"
  },
  "support_link": "https://yourapp.com/support/uuid",
  "qr_code": "base64_encoded_image"
}

Response (Error - 400):
{
  "detail": "Invalid verification code"
}
```

### 3. **Get Divisions**
```
GET /api/divisions/

Response (200):
[
  {
    "id": 1,
    "name": "Dhaka"
  },
  {
    "id": 2,
    "name": "Chittagong"
  }
]
```

### 4. **Get Districts**
```
GET /api/districts/?division_id=1

Response (200):
[
  {
    "id": 1,
    "name": "Dhaka",
    "division": 1,
    "thanas": []
  }
]
```

### 5. **Get Thanas**
```
GET /api/thanas/?district_id=1

Response (200):
[
  {
    "id": 1,
    "name": "Gulshan",
    "district": 1
  }
]
```

### 6. **Get Support Info** (Authenticated)
```
GET /api/auth/support-info/

Headers:
Authorization: Bearer {access_token}

Response (200):
{
  "support_link": "https://yourapp.com/support/uuid",
  "qr_code": "base64_encoded_image"
}
```

## 🛠️ Backend Services

### SMS Service (services.py)

```python
# api/services.py
import random
import string
from twilio.rest import Client
from django.conf import settings

def generate_verification_code():
    """Generate a random 6-digit verification code"""
    return ''.join(random.choices(string.digits, k=6))

def send_sms_verification(phone, code):
    """Send SMS verification code using Twilio"""
    try:
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=f"Your SafeTap verification code is: {code}",
            from_=settings.TWILIO_PHONE_NUMBER,
            to=phone
        )
        return message.sid is not None
    except Exception as e:
        print(f"SMS Error: {str(e)}")
        return False
```

## 📋 File Structure

```
your_project/
├── manage.py
├── project/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py        ← Main URL configuration
│   ├── asgi.py
│   └── wsgi.py
├── api/
│   ├── __init__.py
│   ├── models.py      ← User models with role system
│   ├── views.py       ← API views and endpoints
│   ├── serializers.py ← Data serializers
│   ├── urls.py        ← API URL routes
│   ├── admin.py       ← Admin configuration
│   ├── services.py    ← SMS and utility services
│   └── migrations/
└── requirements.txt
```

## 🚀 Running the Server

### Development Server

```bash
# Terminal 1: Start Django backend
python manage.py runserver 0.0.0.0:8000

# Terminal 2: Start Next.js frontend
npm run dev
```

### Production Server

```bash
# Collect static files
python manage.py collectstatic

# Run with Gunicorn
gunicorn project.wsgi:application --bind 0.0.0.0:8000
```

## ✅ Testing the API

### Using cURL

```bash
# Send verification code
curl -X POST http://127.0.0.1:8000/api/auth/send-code/ \
  -H "Content-Type: application/json" \
  -d '{"phone": "01234567890"}'

# Verify code (replace with actual code)
curl -X POST http://127.0.0.1:8000/api/auth/verify-code/ \
  -H "Content-Type: application/json" \
  -d '{"phone": "01234567890", "code": "123456"}'

# Get divisions
curl http://127.0.0.1:8000/api/divisions/

# Get districts
curl http://127.0.0.1:8000/api/districts/?division_id=1

# Get thanas
curl http://127.0.0.1:8000/api/thanas/?district_id=1
```

### Using Postman

1. Create POST request to `http://127.0.0.1:8000/api/auth/send-code/`
2. Set Body to JSON:
   ```json
   {
     "phone": "01234567890"
   }
   ```
3. Send and check response

## 🐛 Troubleshooting

### 404 Error on API Endpoints
**Problem**: `POST http://127.0.0.1:8000/api/auth/send-code/ 404 (Not Found)`

**Solution**:
1. Verify `api/urls.py` exists and is properly configured
2. Check `project/urls.py` includes API URLs:
   ```python
   path('api/', include('api.urls')),
   ```
3. Restart Django server

### CORS Error
**Problem**: CORS policy blocked the request

**Solution**: Add frontend URL to `CORS_ALLOWED_ORIGINS` in `settings.py`

### SMS Not Sending
**Problem**: Verification code not received

**Solution**:
1. Check Twilio credentials in environment variables
2. Verify phone number format (with country code)
3. Check SMS service is configured in `services.py`

## 📝 Environment Variables (.env)

```
DEBUG=True
SECRET_KEY=your-secret-key-here
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

## 🔐 Security Considerations

1. **Never commit credentials** - Use environment variables
2. **HTTPS in production** - Always use HTTPS for API
3. **CORS whitelist** - Only allow trusted domains
4. **Rate limiting** - Implement rate limiting on verification endpoints
5. **Verification timeout** - Set expiration on verification codes (5-10 minutes)

## ✨ Next Steps

1. Create SMS service with Twilio
2. Set up email notifications
3. Implement booking history tracking
4. Add user dashboard
5. Set up admin panel for role management

## 📞 Support

For issues or questions about the API integration, check:
- Django documentation: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- Twilio Python SDK: https://www.twilio.com/docs/python/install
