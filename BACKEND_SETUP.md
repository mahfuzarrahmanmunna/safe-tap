# SafeTap Backend Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install django
pip install djangorestframework
pip install django-rest-framework-simplejwt
pip install django-cors-headers
pip install twilio
pip install qrcode pillow
pip install psycopg2-binary
pip install python-decouple
pip install axios
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and update with your credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
SECRET_KEY=your-django-secret-key
DEBUG=True
DB_NAME=SafeTap
DB_USER=postgres
DB_PASSWORD=your-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890
```

### 3. Database Setup

```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### 4. Start Development Server

```bash
python manage.py runserver
```

Server will run at `http://127.0.0.1:8000`

## 📁 Project Structure

```
api/
├── models.py          # Django models (User, UserProfile, City, etc.)
├── views.py           # API endpoints
├── serializers.py     # DRF serializers
├── urls.py            # API URL routing
├── services.py        # Business logic (SMS service)
├── admin.py           # Django admin configuration
└── __init__.py

safeTap/
├── settings.py        # Django settings (JWT, CORS, etc.)
└── urls.py            # Main URL configuration
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/send-code/` - Send verification code via SMS
- `POST /api/auth/verify-code/` - Verify code and get JWT token
- `POST /api/auth/token/` - Get auth token
- `GET /api/auth/support-info/` - Get support link (requires auth)

### Geographical Data
- `GET /api/divisions/` - List all divisions
- `GET /api/districts/?division_id=1` - List districts by division
- `GET /api/thanas/?district_id=1` - List thanas by district
- `GET /api/bangladesh-data/` - Get complete BD geographical data

### City Data
- `GET /api/cities/` - List all cities
- `GET /api/cities/{slug}/` - Get city details
- `POST /api/cities/bulk/` - Bulk create cities

### Features & Tech Specs
- `GET /api/features/` - List all product features
- `GET /api/techspecs/` - List all tech specifications

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Flow:
1. User enters phone → `POST /api/auth/send-code/`
2. SMS code sent to phone
3. User enters code → `POST /api/auth/verify-code/`
4. Backend returns `access` and `refresh` tokens
5. Frontend stores tokens in localStorage
6. Use `access` token in Authorization header:
   ```
   Authorization: Bearer <access-token>
   ```

## 📲 Phone Verification Process

### Step 1: Send Code
```bash
POST http://127.0.0.1:8000/api/auth/send-code/
Content-Type: application/json

{
  "phone": "01234567890"
}
```

**Response:**
```json
{
  "message": "Verification code sent successfully"
}
```

### Step 2: Verify Code
```bash
POST http://127.0.0.1:8000/api/auth/verify-code/
Content-Type: application/json

{
  "phone": "01234567890",
  "code": "123456"
}
```

**Response:**
```json
{
  "message": "Phone number verified successfully",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "01234567890",
    "email": "01234567890@safetap.local",
    "first_name": "Customer",
    "phone": "01234567890",
    "role": "customer"
  },
  "support_link": "https://safetap.app/support/uuid",
  "qr_code": "data:image/png;base64,..."
}
```

## 🧪 Testing

### Test Send Code
```bash
curl -X POST http://127.0.0.1:8000/api/auth/send-code/ \
  -H "Content-Type: application/json" \
  -d '{"phone": "01234567890"}'
```

### Test Verify Code
```bash
curl -X POST http://127.0.0.1:8000/api/auth/verify-code/ \
  -H "Content-Type: application/json" \
  -d '{"phone": "01234567890", "code": "123456"}'
```

### Test Get Divisions
```bash
curl http://127.0.0.1:8000/api/divisions/
```

## ⚙️ Configuration

### CORS Settings (settings.py)
Allows requests from:
- `http://localhost:3000`
- `http://127.0.0.1:3000`

Update `CORS_ALLOWED_ORIGINS` for production.

### JWT Settings (settings.py)
- Access token lifetime: 60 minutes
- Refresh token lifetime: 7 days
- Token rotation enabled

### SMS Service (services.py)
- Uses Twilio for SMS delivery
- Falls back to console logging if Twilio not configured
- Verification code: 6 random digits

## 🐛 Troubleshooting

### 404 Errors on Auth Endpoints
**Solution:** Ensure `safeTap/urls.py` includes `path('api/', include('api.urls'))`

### CORS Errors
**Solution:** Add your frontend URL to `CORS_ALLOWED_ORIGINS` in settings.py

### SMS Not Sending
**Solution:** Check Twilio credentials in `.env` file

### Database Connection Error
**Solution:** Verify PostgreSQL is running and credentials are correct

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SECRET_KEY` | Django secret key | `your-secret-key` |
| `DEBUG` | Debug mode | `True` or `False` |
| `DB_ENGINE` | Database engine | `django.db.backends.postgresql` |
| `DB_NAME` | Database name | `SafeTap` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `your-password` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `TWILIO_ACCOUNT_SID` | Twilio account ID | `AC...` |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | `your-token` |
| `TWILIO_PHONE_NUMBER` | Twilio phone number | `+1234567890` |

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Configure `.env` file
3. ✅ Run migrations
4. ✅ Create superuser
5. ✅ Start server
6. ✅ Test endpoints with curl/Postman
7. ⏳ Set up SMS service (Twilio)
8. ⏳ Configure production settings

## 📚 Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [JWT Authentication](https://django-rest-framework-simplejwt.readthedocs.io/)
- [Twilio SMS API](https://www.twilio.com/docs/sms)
