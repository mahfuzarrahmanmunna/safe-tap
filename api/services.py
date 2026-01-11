import random
import string
import importlib

try:
    _twilio_rest = importlib.import_module('twilio.rest')
    Client = getattr(_twilio_rest, 'Client', None)
except Exception:
    Client = None

from django.conf import settings

def generate_verification_code():
    """Generate a random 6-digit verification code"""
    return ''.join(random.choices(string.digits, k=6))

def send_sms_verification(phone_number, code):
    """Send SMS verification code via Twilio"""
    try:
        if Client is None:
            print("Twilio client not available: install the 'twilio' package to enable SMS sending.")
            # For development, print the code instead
            print(f"Verification code for {phone_number}: {code}")
            return True
        
        account_sid = settings.TWILIO_ACCOUNT_SID
        auth_token = settings.TWILIO_AUTH_TOKEN
        
        if not account_sid or not auth_token:
            print("Twilio credentials not configured. SMS sending disabled.")
            print(f"Verification code for {phone_number}: {code}")
            return True
        
        client = Client(account_sid, auth_token)
        
        message = client.messages.create(
            body=f"Your SafeTap verification code is: {code}",
            from_=settings.TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        print(f"SMS sent successfully: {message.sid}")
        return True
    except Exception as e:
        print(f"Failed to send SMS: {e}")
        return False
