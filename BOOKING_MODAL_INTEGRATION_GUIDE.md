# BookingModal Integration - Phone Verification Flow

## Overview
The BookingModal component now integrates PhoneVerificationModal for a seamless phone verification flow before users proceed with booking their free trial.

## Flow Diagram

```
User Clicks "Try it Free" Button
           ↓
BookingModal Opens
           ↓
PhoneVerificationModal Shows (Step 1)
           ↓
User Enters Phone Number
           ↓
Backend: /api/auth/send-code/ (POST)
Sends verification code to phone
           ↓
PhoneVerificationModal Shows (Step 2)
           ↓
User Enters 6-digit Code
           ↓
Backend: /api/auth/verify-code/ (POST)
Validates code and returns JWT tokens + user data
           ↓
onVerificationSuccess Triggered
           ↓
PhoneVerificationModal Closes
BookingModal Shows Booking Form
           ↓
Form Auto-filled with:
- Verified Phone Number (Read-only, marked with ✓)
- User Name (if provided in registration)
           ↓
User Fills Additional Details:
- Select Division, District, Thana
- Enter Detailed Address
- Add Referral Code (Optional)
- Add Notes (Optional)
           ↓
User Submits Form
           ↓
Booking Data Sent to Backend with:
- user_id (verified)
- verified_phone
- selected_plan
- location details
- address details
           ↓
Success Message
Modal Closes
```

## Key Features

### 1. Phone Verification First
- Users must verify their phone number before proceeding with booking
- Uses backend SMS verification service
- JWT tokens generated after successful verification

### 2. Form Pre-filling
- Phone number automatically filled and read-only (shown with green checkmark)
- User name pre-filled if available
- Location map updates in real-time as user selects Division → District → Thana

### 3. State Management
```javascript
// Phone verification states
const [showPhoneVerification, setShowPhoneVerification] = useState(true);
const [verifiedPhone, setVerifiedPhone] = useState('');
const [verifiedUser, setVerifiedUser] = useState(null);
const [userAccessToken, setUserAccessToken] = useState('');

// Booking form states
const [formData, setFormData] = useState({...});
const [errors, setErrors] = useState({});
```

### 4. Handlers

#### `handlePhoneVerificationSuccess(verificationData)`
- Called when user successfully verifies phone
- Extracts: phone, user data, JWT token
- Pre-fills booking form
- Hides phone verification modal
- Shows success alert

#### `handleCloseModal()`
- Resets all states
- Shows phone verification modal again
- Clears form data
- Calls parent `onClose()`

#### `handleSubmit(e)`
- Validates all booking form fields
- Prepares booking data with verified info
- Sends to backend
- Shows success message

## Backend Integration

### API Endpoints Required

1. **Send Verification Code**
   ```
   POST /api/auth/send-code/
   Body: { "phone": "1234567890" }
   Response: { "message": "Verification code sent successfully" }
   ```

2. **Verify Code**
   ```
   POST /api/auth/verify-code/
   Body: { "phone": "1234567890", "code": "123456" }
   Response: {
     "message": "Phone number verified successfully",
     "access": "jwt_token",
     "refresh": "refresh_token",
     "user": {
       "id": 1,
       "username": "user",
       "email": "user@example.com",
       "phone": "1234567890",
       "first_name": "John",
       "last_name": "Doe",
       "role": "customer"
     },
     "support_link": "...",
     "qr_code": "base64_encoded_image"
   }
   ```

3. **Get Divisions** (Already implemented)
   ```
   GET /api/divisions/
   ```

4. **Get Districts** (Already implemented)
   ```
   GET /api/districts/?division_id=1
   ```

5. **Get Thanas** (Already implemented)
   ```
   GET /api/thanas/?district_id=1
   ```

## Usage

```jsx
import BookingModal from '@/app/components/citypage/BookingModal';

export default function YourComponent() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Premium');

  return (
    <>
      <button onClick={() => {
        setSelectedPlan('Premium');
        setIsBookingModalOpen(true);
      }}>
        Try it Free
      </button>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </>
  );
}
```

## Form Validation

The form validates:
- ✓ Name (required)
- ✓ Phone (already verified, read-only)
- ✓ Division (required)
- ✓ District (required)
- ✓ Thana (required)
- ✓ Address Details (required)
- ✓ Referral Code (optional)
- ✓ Notes (optional)

## Error Handling

- Phone not registered: Shows error from backend
- Invalid verification code: Shows error message
- Invalid form fields: Shows inline error messages
- Network errors: Shows error alerts

## Responsive Design

- Mobile optimized
- Dark/Light theme support
- Scrollable form for small screens
- Touch-friendly inputs and buttons

## Security Features

- Phone verification required
- JWT token-based authentication
- Read-only verified phone field
- All user data comes from verified backend response
