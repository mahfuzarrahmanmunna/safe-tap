# Django Backend Setup Checklist

## ✅ Step-by-Step Setup Instructions

### Phase 1: Project Structure
- [ ] Create `api/urls.py` with URL routing (DONE ✓)
- [ ] Create `project/urls.py` with main URL configuration (DONE ✓)
- [ ] Verify file structure is correct

### Phase 2: Django Configuration
- [ ] Add apps to `INSTALLED_APPS` in settings.py:
  ```python
  INSTALLED_APPS = [
      # ... existing apps ...
      'rest_framework',
      'corsheaders',
      'rest_framework_simplejwt',
      'api',
  ]
  ```

- [ ] Add CORS middleware to `MIDDLEWARE`:
  ```python
  MIDDLEWARE = [
      # ... other middleware ...
      'corsheaders.middleware.CorsMiddleware',
      # ... other middleware ...
  ]
  ```

- [ ] Add CORS configuration:
  ```python
  CORS_ALLOWED_ORIGINS = [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:8000",
      "http://127.0.0.1:8000",
  ]
  ```

- [ ] Add REST Framework config:
  ```python
  REST_FRAMEWORK = {
      'DEFAULT_AUTHENTICATION_CLASSES': (
          'rest_framework_simplejwt.authentication.JWTAuthentication',
      ),
  }
  ```

### Phase 3: Dependencies
- [ ] Install packages:
  ```bash
  pip install djangorestframework
  pip install django-rest-framework-simplejwt
  pip install django-cors-headers
  pip install twilio
  pip install qrcode pillow
  ```

### Phase 4: Database Setup
- [ ] Run migrations:
  ```bash
  python manage.py makemigrations
  python manage.py migrate
  ```

- [ ] Create superuser:
  ```bash
  python manage.py createsuperuser
  ```

### Phase 5: SMS Service Setup
- [ ] Create `api/services.py` with SMS functions
- [ ] Set up Twilio account (or alternative SMS provider)
- [ ] Add SMS credentials to environment variables:
  ```
  TWILIO_ACCOUNT_SID=your_sid
  TWILIO_AUTH_TOKEN=your_token
  TWILIO_PHONE_NUMBER=your_twilio_number
  ```

### Phase 6: Testing
- [ ] Start Django server:
  ```bash
  python manage.py runserver
  ```

- [ ] Test API endpoints:
  ```bash
  # Send code endpoint
  curl -X POST http://127.0.0.1:8000/api/auth/send-code/ \
    -H "Content-Type: application/json" \
    -d '{"phone": "01234567890"}'
  
  # Verify code endpoint
  curl -X POST http://127.0.0.1:8000/api/auth/verify-code/ \
    -H "Content-Type: application/json" \
    -d '{"phone": "01234567890", "code": "123456"}'
  
  # Get divisions endpoint
  curl http://127.0.0.1:8000/api/divisions/
  ```

- [ ] Check if 404 errors are resolved

## 🔧 Quick Fixes for Current Issues

### Issue: `POST http://127.0.0.1:8000/api/auth/send-code/ 404`

**Root Cause**: Missing URL routing

**Solutions**:
1. Ensure `api/urls.py` exists with the code provided
2. Ensure `project/urls.py` includes:
   ```python
   path('api/', include('api.urls')),
   ```
3. Restart Django server: `python manage.py runserver`

### Issue: CORS Errors

**Solution**: Add frontend domain to `CORS_ALLOWED_ORIGINS`

### Issue: SMS Not Sending

**Solution**: 
1. Verify Twilio credentials
2. Check phone number format (should include country code)
3. Ensure SMS service is implemented in `services.py`

## 📊 API Status Check

Test each endpoint:

```bash
# Check divisions
curl http://127.0.0.1:8000/api/divisions/
# Expected: 200 OK with division list

# Check send-code
curl -X POST http://127.0.0.1:8000/api/auth/send-code/ \
  -H "Content-Type: application/json" \
  -d '{"phone": "01234567890"}'
# Expected: 200 OK with success message

# Check verify-code
curl -X POST http://127.0.0.1:8000/api/auth/verify-code/ \
  -H "Content-Type: application/json" \
  -d '{"phone": "01234567890", "code": "123456"}'
# Expected: 200 OK with user data and tokens
```

## 🎯 Next Actions

1. **Update settings.py** with CORS and REST Framework config
2. **Restart Django server** after making changes
3. **Test endpoints** using curl or Postman
4. **Fix any remaining 404 errors** by verifying URL routing
5. **Configure SMS service** with Twilio

## 📞 Common Commands

```bash
# Start Django server
python manage.py runserver

# Make migrations
python manage.py makemigrations

# Run migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Access Django admin
# Go to http://127.0.0.1:8000/admin

# Shell
python manage.py shell
```

## ✨ Success Indicators

✅ Frontend can send POST to `/api/auth/send-code/`
✅ Backend sends SMS verification code
✅ Frontend receives 200 OK response
✅ User can enter verification code
✅ Backend verifies code and creates user
✅ Frontend receives JWT tokens and user data
✅ Booking modal closes after successful verification

---

**Status**: Configuration files created ✓
**Next**: Apply settings.py changes and restart server
