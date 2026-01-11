# BookingModal + PhoneVerificationModal Integration Guide

## Overview
The BookingModal now integrates with PhoneVerificationModal to create a complete free trial booking flow where users verify their phone number through SMS OTP verification.

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  1. USER CLICKS "TRY IT FREE" BUTTON                                    │
│     └─ BookingModal Opens                                              │
│                                                                         │
│  2. USER FILLS BOOKING FORM                                            │
│     ├─ Full Name                                                       │
│     ├─ Phone Number (10-11 digits)                                    │
│     ├─ Select Division → District → Thana                             │
│     ├─ Detailed Address                                               │
│     ├─ Referral Code (Optional)                                       │
│     └─ Special Notes (Optional)                                       │
│                                                                         │
│  3. USER CLICKS "CONFIRM FREE TRIAL" BUTTON                            │
│     └─ Form Validation                                                │
│        ├─ All fields validated                                        │
│        ├─ Phone must be 10-11 digits                                 │
│        ├─ Division, District, Thana required                         │
│        └─ Address details required                                   │
│                                                                         │
│  4. FORM VALIDATION PASSES                                            │
│     ├─ Store pending booking data                                     │
│     └─ Show PhoneVerificationModal                                    │
│                                                                         │
│  5. PHONE VERIFICATION MODAL - STEP 1                                 │
│     ├─ User enters phone number                                      │
│     ├─ Clicks "Send Code"                                            │
│     └─ Backend: POST /api/auth/send-code/                           │
│        └─ SMS sent to phone number                                  │
│                                                                         │
│  6. PHONE VERIFICATION MODAL - STEP 2                                 │
│     ├─ User enters 6-digit code received via SMS                    │
│     ├─ Clicks "Verify Code"                                         │
│     └─ Backend: POST /api/auth/verify-code/                        │
│        ├─ Code validated                                            │
│        ├─ User account created with role='customer'                 │
│        └─ JWT tokens generated                                      │
│                                                                         │
│  7. BACKEND CREATES USER WITH ROLE 'CUSTOMER'                         │
│     UserProfile Model:                                               │
│     {                                                                │
│       user: {                                                        │
│         id: 1,                                                       │
│         username: "auto_generated",                                  │
│         email: (optional),                                           │
│         phone: "1234567890",                                         │
│         first_name: (optional),                                      │
│         last_name: (optional)                                        │
│       },                                                              │
│       phone: "1234567890",                                           │
│       role: "customer",           ← Always 'customer' for free trial│
│       is_phone_verified: true,                                       │
│       support_link: "...",                                           │
│       qr_code: "base64_image"                                        │
│     }                                                                │
│                                                                         │
│  8. PHONE VERIFICATION MODAL - STEP 3 (SUCCESS)                      │
│     ├─ Shows success message                                        │
│     ├─ Displays welcome message with user role                      │
│     └─ "Continue" button closes modal                               │
│                                                                         │
│  9. BOOKING MODAL CLOSES                                             │
│     ├─ Phone verification modal hidden                              │
│     ├─ Booking data combined with verified user info                │
│     ├─ Success notification shown                                   │
│     └─ All states reset                                             │
│                                                                         │
│  10. BOOKING COMPLETED                                               │
│      Final Data Logged:                                              │
│      {                                                                │
│        user_id: 1,                                                   │
│        phone: "1234567890",                                          │
│        name: "John Doe",                                             │
│        division: "Dhaka",                                            │
│        district: "Dhaka",                                            │
│        thana: "Gulshan",                                             │
│        addressDetails: "House 123, Street XYZ",                      │
│        referral: (if provided),                                      │
│        notes: (if provided),                                         │
│        plan: "Premium",                                              │
│        role: "customer"  ← Always customer for free trial users     │
│      }                                                                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Three User Roles in System

### 1. **Admin** (`role: 'admin'`)
- Full system access
- Manage users, service men, and bookings
- View reports and analytics
- Can be created only through admin panel

### 2. **Service Man** (`role: 'service_man'`)
- Assigned to handle customer service requests
- Can view assigned bookings
- Can update service status
- Manually created or invited by admin

### 3. **Customer** (`role: 'customer'`)
- Regular end users booking free trials
- **Automatically assigned during phone verification**
- Can view their bookings and status
- Access to basic features

## State Management

```javascript
// Phone verification trigger
const [showPhoneVerification, setShowPhoneVerification] = useState(false);

// Stores form data before verification
const [pendingBookingData, setPendingBookingData] = useState(null);

// Verified user information from backend
const [verifiedUser, setVerifiedUser] = useState(null);

// JWT token for authenticated requests
const [userAccessToken, setUserAccessToken] = useState('');

// Booking form data
const [formData, setFormData] = useState({
  name: '',
  phone: '',
  referral: '',
  division: '',
  district: '',
  thana: '',
  addressDetails: '',
  notes: ''
});
```

## Handler Functions

### `handleSubmit(e)`
- Validates booking form
- Stores pending booking data
- Triggers PhoneVerificationModal
- Does NOT submit directly (waits for phone verification)

### `handlePhoneVerificationSuccess(verificationData)`
- Called after user verifies phone via SMS
- Receives user data with role='customer'
- Combines booking form data with verified user info
- Logs complete booking data
- Shows success alert
- Closes PhoneVerificationModal and BookingModal

### `handleCloseModal()`
- Resets all states
- Closes both modals
- Clears form data
- Calls parent `onClose()`

## Backend Integration Points

### API Endpoint 1: Send Verification Code
```
POST /api/auth/send-code/

Request:
{
  "phone": "01234567890"
}

Response (Success):
{
  "message": "Verification code sent successfully"
}

Response (Error):
{
  "detail": "Phone number not valid" or "User already exists"
}
```

### API Endpoint 2: Verify Code & Create User
```
POST /api/auth/verify-code/

Request:
{
  "phone": "01234567890",
  "code": "123456"
}

Response (Success):
{
  "message": "Phone number verified successfully",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "user_1234567890",
    "email": null,
    "phone": "01234567890",
    "first_name": null,
    "last_name": null,
    "role": "customer"  ← ALWAYS 'customer' for free trial users
  },
  "support_link": "https://yourapp.com/support/uuid",
  "qr_code": "base64_encoded_image"
}

Response (Error):
{
  "detail": "Invalid verification code" or "Phone not found"
}
```

### API Endpoint 3: Save Booking (Optional - Your Backend)
```
POST /api/bookings/create/

Headers:
{
  "Authorization": "Bearer {access_token}"
}

Request:
{
  "user_id": 1,
  "phone": "01234567890",
  "name": "John Doe",
  "division": "1",
  "district": "1",
  "thana": "1",
  "addressDetails": "House 123, Street XYZ",
  "referral": "PROMO2024",
  "notes": "Please call before visiting",
  "plan": "Premium",
  "role": "customer"
}
```

## Form Validation Rules

| Field | Required | Rules |
|-------|----------|-------|
| Name | Yes | Non-empty string |
| Phone | Yes | 10-11 digits only |
| Division | Yes | Must select from dropdown |
| District | Yes | Must select after division |
| Thana | Yes | Must select after district |
| Address Details | Yes | Non-empty, descriptive text |
| Referral Code | No | Optional, alphanumeric |
| Special Notes | No | Optional, any text |

## Error Handling

```javascript
// Form validation errors
{
  name: "Name is required",
  phone: "Please enter a valid phone number (10-11 digits)",
  division: "Select a division",
  district: "Select a district",
  thana: "Select a thana",
  addressDetails: "Address details are required"
}

// Backend errors
{
  phone: "Phone number not valid",
  code: "Invalid verification code"
}
```

## Usage Example

```jsx
import BookingModal from '@/app/components/citypage/BookingModal';

export default function ProductPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Premium');

  const handleTryFree = (plan) => {
    setSelectedPlan(plan);
    setIsBookingOpen(true);
  };

  return (
    <>
      <button onClick={() => handleTryFree('Premium')}>
        Try Premium Free
      </button>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedPlan={selectedPlan}
      />
    </>
  );
}
```

## Key Features

✅ **Phone Verification Required** - Users must verify via SMS OTP
✅ **Automatic User Creation** - User created with role='customer' automatically
✅ **Role Assignment** - Free trial users always get 'customer' role
✅ **Real-time Location** - Google Maps updates as user selects location
✅ **Form Validation** - Client-side validation before phone verification
✅ **Error Handling** - User-friendly error messages
✅ **Mobile Optimized** - Responsive design for all screen sizes
✅ **Dark Mode Support** - Seamless light/dark theme integration
✅ **JWT Authentication** - Secure token-based authentication

## Important Notes

1. **User Creation**: Users are created during phone verification step
2. **Role Assignment**: All free trial users get role='customer' automatically
3. **Phone Verification**: Required before booking completion
4. **No Pre-existing Account**: Phone number must not be registered
5. **SMS Gateway**: Backend must have SMS gateway configured (Twilio, etc.)
6. **Tokens Storage**: Access and refresh tokens stored in localStorage
7. **Success Flow**: After verification, booking completes automatically
