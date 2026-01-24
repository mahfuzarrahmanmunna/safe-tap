// pages/register/page.jsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowRight,
  FaSun,
  FaMoon,
  FaIdCard,
  FaSms,
  FaTimes,
  FaExclamation,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import Lottie from "lottie-react";
import registerAnimation from "../public/animations/register-animation.json";
import successAnimation from "../public/animations/success-animation.json";
import {
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth, setupRecaptcha } from "../config/firebase";

const RegisterPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const {
    user,
    loading: authLoading,
    error,
    signInWithGoogle,
    signInWithFacebook,
    completeRegistration,
  } = useFirebaseAuth();
  const isDark = theme === "dark";

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    nid: "",
    email: "",
    phone: "",
    pin: "",
    confirmPin: "",
    address: "",
    division: "",
    district: "",
    thana: "",
    referral: "",
    notes: "",
    agreeToTerms: false,
  });

  // Phone verification states
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [phoneVerificationLoading, setPhoneVerificationLoading] =
    useState(false);

  // Development mode to bypass phone verification
  const [devMode, setDevMode] = useState(true); // Default to true for now

  // UI states
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formStep, setFormStep] = useState(1);
  const [animationDirection, setAnimationDirection] = useState(1);
  const [fromBookingModal, setFromBookingModal] = useState(false);
  const [authMethod, setAuthMethod] = useState("email"); // "email", "google", or "facebook"
  const [firebaseUser, setFirebaseUser] = useState(null);

  // Location data states
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [returnPath, setReturnPath] = useState("/");
  const [locationDataLoaded, setLocationDataLoaded] = useState(false);

  // Refs for Firebase
  const recaptchaContainerRef = useRef(null);

  // API base URL
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  // Initialize Firebase reCAPTCHA only if not in development mode
  useEffect(() => {
    if (
      !devMode &&
      typeof window !== "undefined" &&
      recaptchaContainerRef.current
    ) {
      setupRecaptcha("recaptcha-container");
    }
  }, [devMode]);

  // Fetch all divisions on component mount
  useEffect(() => {
    const initializeLocationData = async () => {
      try {
        const divisionsData = await fetchDivisions();
        setLocationDataLoaded(true);
        return divisionsData;
      } catch (error) {
        console.error("Failed to initialize location data:", error);
        setLocationDataLoaded(true); // Still set to true to prevent infinite loading
        return [];
      }
    };

    initializeLocationData();
  }, []);

  // Check for saved form data and theme preference on mount
  useEffect(() => {
    // Load saved form data from localStorage (from booking modal)
    const savedBookingData = localStorage.getItem("bookingFormData");
    if (savedBookingData) {
      try {
        const parsed = JSON.parse(savedBookingData);

        // Check if data came from booking modal
        if (parsed.fromBookingModal) {
          setFromBookingModal(true);

          // Pre-fill ALL fields from the booking modal
          setFormData((prev) => ({
            ...prev,
            fullName: parsed.fullName || "",
            nid: parsed.nid || "",
            email: parsed.email || "",
            phone: parsed.phone || "",
            division: parsed.division || "",
            district: parsed.district || "",
            thana: parsed.thana || "",
            address: parsed.addressDetails || "",
            referral: parsed.referral || "",
            notes: parsed.notes || "",
          }));

          // Fixed: Use parsed.fullName instead of undefined fullName
          console.log("Loaded booking form data:", parsed.fullName);

          setSelectedPlan(parsed.selectedPlan || "");
          setReturnPath(parsed.returnPath || "/");

          // Fetch districts and thanas if location data is present
          // Wait for divisions to be loaded first
          if (parsed.division && locationDataLoaded) {
            fetchDistricts(parsed.division).then(() => {
              if (parsed.district) {
                fetchThanas(parsed.district);
              }
            });
          }
        } else {
          // Regular form data
          setFormData((prev) => ({
            ...prev,
            fullName: parsed.fullName || "",
            nid: parsed.nid || "",
            email: parsed.email || "",
            phone: parsed.phone || "",
            address: parsed.address || "",
          }));
        }
        // Remove the saved data after loading
        localStorage.removeItem("bookingFormData");
      } catch (e) {
        console.error("Failed to parse saved booking data", e);
      }
    } else {
      // Load regular saved form data
      const savedFormData = localStorage.getItem("registerFormData");
      if (savedFormData) {
        try {
          const parsed = JSON.parse(savedFormData);
          setFormData((prev) => ({
            ...prev,
            fullName: parsed.fullName || "",
            nid: parsed.nid || "",
            email: parsed.email || "",
            phone: parsed.phone || "",
            address: parsed.address || "",
            division: parsed.division || "",
            district: parsed.district || "",
            thana: parsed.thana || "",
          }));

          // Fetch districts and thanas if location data is present
          // Wait for divisions to be loaded first
          if (parsed.division && locationDataLoaded) {
            fetchDistricts(parsed.division).then(() => {
              if (parsed.district) {
                fetchThanas(parsed.district);
              }
            });
          }
        } catch (e) {
          console.error("Failed to parse saved form data", e);
        }
      }
    }
  }, [locationDataLoaded]);

  // Save form data to localStorage whenever it changes (excluding sensitive fields)
  useEffect(() => {
    const dataToSave = {
      fullName: formData.fullName,
      nid: formData.nid,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      division: formData.division,
      district: formData.district,
      thana: formData.thana,
      referral: formData.referral,
      notes: formData.notes,
    };
    localStorage.setItem("registerFormData", JSON.stringify(dataToSave));
  }, [
    formData.fullName,
    formData.nid,
    formData.email,
    formData.phone,
    formData.address,
    formData.division,
    formData.district,
    formData.thana,
    formData.referral,
    formData.notes,
  ]);

  // Fetch all divisions
  const fetchDivisions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/divisions/`);
      setDivisions(response.data);
      console.log("Divisions loaded:", response.data);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch divisions", err);
      return [];
    }
  };

  // Fetch districts for a division
  const fetchDistricts = async (divisionId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/districts/?division_id=${divisionId}`,
      );
      setDistricts(response.data);
      console.log("Districts loaded:", response.data);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch districts", err);
      return [];
    }
  };

  // Fetch thanas for a district
  const fetchThanas = async (districtId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/thanas/?district_id=${districtId}`,
      );
      setThanas(response.data);
      console.log("Thanas loaded:", response.data);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch thanas", err);
      return [];
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Check PIN strength if PIN field is being changed
    if (name === "pin") {
      checkPinStrength(value);
    }

    // Handle location selection
    if (name === "division") {
      setDistricts([]);
      setThanas([]);
      setFormData((prev) => ({
        ...prev,
        division: value,
        district: "",
        thana: "",
      }));

      if (value) {
        fetchDistricts(value);
      }
    } else if (name === "district") {
      setThanas([]);
      setFormData((prev) => ({
        ...prev,
        district: value,
        thana: "",
      }));

      if (value) {
        fetchThanas(value);
      }
    }
  };

  // Check PIN strength
  const checkPinStrength = (pin) => {
    if (!pin) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;

    // Length check
    if (pin.length >= 4) strength += 1;
    if (pin.length >= 6) strength += 1;

    // Complexity checks
    if (/\d/.test(pin)) strength += 1; // Has digits
    if (/[A-Z]/.test(pin)) strength += 1; // Has uppercase
    if (/[a-z]/.test(pin)) strength += 1; // Has lowercase
    if (/[^A-Za-z0-9]/.test(pin)) strength += 1; // Has special chars

    setPasswordStrength(Math.min(strength, 5));
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        setFirebaseUser(result.user);
        setAuthMethod("google");
        setFormStep(2);
        fetchDivisions();

        // Pre-fill form with Google user data
        setFormData((prev) => ({
          ...prev,
          fullName: result.user.displayName || "",
          email: result.user.email || "",
        }));
      } else {
        Swal.fire({
          title: "Authentication Error",
          text: result.error,
          icon: "error",
          confirmButtonColor: "#0891b2",
        });
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      Swal.fire({
        title: "Authentication Error",
        text: "Failed to sign in with Google. Please try again.",
        icon: "error",
        confirmButtonColor: "#0891b2",
      });
    }
  };

  // Handle Facebook sign-in
  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithFacebook();
      if (result.success) {
        setFirebaseUser(result.user);
        setAuthMethod("facebook");
        setFormStep(2);
        fetchDivisions();

        // Pre-fill form with Facebook user data
        setFormData((prev) => ({
          ...prev,
          fullName: result.user.displayName || "",
          email: result.user.email || "",
        }));
      } else {
        Swal.fire({
          title: "Authentication Error",
          text: result.error,
          icon: "error",
          confirmButtonColor: "#0891b2",
        });
      }
    } catch (error) {
      console.error("Facebook sign-in error:", error);
      Swal.fire({
        title: "Authentication Error",
        text: "Failed to sign in with Facebook. Please try again.",
        icon: "error",
        confirmButtonColor: "#0891b2",
      });
    }
  };

  // Send verification code to phone
  const sendPhoneVerificationCode = async () => {
    console.log("sendPhoneVerificationCode called, devMode:", devMode);

    if (!formData.phone) {
      setErrors({ ...errors, phone: "Phone number is required" });
      return;
    }

    // DEVELOPMENT MODE - Skip Firebase verification
    if (devMode) {
      console.log("Using development mode for phone verification");
      setPhoneVerificationLoading(true);

      // Simulate API call delay
      setTimeout(() => {
        setPhoneVerified(true);
        setPhoneVerificationLoading(false);
        Swal.fire({
          title: "Phone Verified!",
          text: "Phone verified in development mode.",
          icon: "success",
          confirmButtonColor: "#0891b2",
        });
      }, 1000);
      return;
    }

    // Check if Firebase is properly initialized
    if (!auth) {
      Swal.fire({
        title: "Configuration Error",
        text: "Firebase is not properly configured. Please check your environment variables.",
        icon: "error",
        confirmButtonColor: "#0891b2",
      });
      return;
    }

    // Format phone number for Firebase (should include country code)
    let phoneNumber = formData.phone;
    if (!phoneNumber.startsWith("+")) {
      // Assuming Bangladesh numbers, add country code if not present
      phoneNumber = "+880" + phoneNumber.substring(1); // Remove leading 0 if present
    }

    setPhoneVerificationLoading(true);

    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        throw new Error("reCAPTCHA not initialized");
      }

      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier,
      );
      setConfirmationResult(result);
      setShowPhoneVerification(true);
      setPhoneVerificationLoading(false);

      Swal.fire({
        title: "Verification Code Sent",
        text: "A verification code has been sent to your phone number.",
        icon: "success",
        confirmButtonColor: "#0891b2",
      });
    } catch (error) {
      console.error("Error sending verification code:", error);
      setPhoneVerificationLoading(false);

      let errorMessage = "Failed to send verification code. Please try again.";

      // Handle specific Firebase errors
      if (error.code === "auth/billing-not-enabled") {
        errorMessage = (
          <div>
            <p>
              Phone authentication requires billing to be enabled in your
              Firebase project.
            </p>
            <p>
              Please enable billing in the Firebase Console or use development
              mode.
            </p>
            <div className="mt-3">
              <button
                className="px-4 py-2 bg-cyan-600 text-white rounded mr-2"
                onClick={() => setDevMode(true)}
              >
                Enable Development Mode
              </button>
              <a
                href="https://console.firebase.google.com/project/_/billing/enable"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Enable Billing
              </a>
            </div>
          </div>
        );
      } else if (error.code === "auth/api-key-not-valid") {
        errorMessage =
          "Firebase configuration error. Please check your API key.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many requests. Please try again later.";
      } else if (error.code === "auth/invalid-phone-number") {
        errorMessage = "Invalid phone number. Please check and try again.";
      } else if (error.code === "auth/quota-exceeded") {
        errorMessage = "SMS quota exceeded. Please try again later.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        title: "Error",
        html: errorMessage,
        icon: "error",
        confirmButtonColor: "#0891b2",
        width: 500,
      });
    }
  };

  // Verify phone number with code
  const verifyPhoneNumber = async () => {
    if (!verificationCode) {
      setErrors({
        ...errors,
        verificationCode: "Verification code is required",
      });
      return;
    }

    // Development mode - skip actual Firebase verification
    if (devMode) {
      setTimeout(() => {
        setPhoneVerified(true);
        setShowPhoneVerification(false);
        Swal.fire({
          title: "Phone Verified!",
          text: "Phone verified in development mode.",
          icon: "success",
          confirmButtonColor: "#0891b2",
        });
      }, 500);
      return;
    }

    try {
      await confirmationResult.confirm(verificationCode);
      setPhoneVerified(true);
      setShowPhoneVerification(false);

      Swal.fire({
        title: "Phone Verified!",
        text: "Your phone number has been verified successfully.",
        icon: "success",
        confirmButtonColor: "#0891b2",
      });
    } catch (error) {
      console.error("Error verifying phone number:", error);

      let errorMessage = "Invalid verification code. Please try again.";
      if (error.code === "auth/invalid-verification-code") {
        errorMessage = "Invalid verification code. Please check and try again.";
      } else if (error.code === "auth/code-expired") {
        errorMessage =
          "Verification code has expired. Please request a new one.";
      }

      Swal.fire({
        title: "Verification Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#0891b2",
      });
    }
  };

  // Create user with email and password in Firebase
  const createFirebaseUser = async (email, password) => {
    try {
      const { createUserWithEmailAndPassword } = await import("firebase/auth");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {
      console.error("Error creating Firebase user:", error);
      throw error;
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.nid.trim()) {
      newErrors.nid = "NID number is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10-11 digits)";
    }

    // Only require phone verification if not in development mode
    if (!devMode && !phoneVerified) {
      newErrors.phoneVerification = "Please verify your phone number";
    }

    if (!formData.pin) {
      newErrors.pin = "PIN is required";
    } else if (formData.pin.length < 4) {
      newErrors.pin = "PIN must be at least 4 characters";
    }

    if (!formData.confirmPin) {
      newErrors.confirmPin = "Please confirm your PIN";
    } else if (formData.pin !== formData.confirmPin) {
      newErrors.confirmPin = "PINs do not match";
    }

    if (!formData.division) {
      newErrors.division = "Select a division";
    }

    if (!formData.district) {
      newErrors.district = "Select a district";
    }

    if (!formData.thana) {
      newErrors.thana = "Select a thana";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to download QR code
  const downloadQRCode = (qrCodeData, userName) => {
    if (!qrCodeData) return;

    // Create a filename with the user's name
    const fileName = `${userName || "user"}-safetap-qr.png`;

    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${qrCodeData}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to download support link as text file
  const downloadSupportLink = (supportLink, userName) => {
    if (!supportLink) return;

    // Create a text file with the support link
    const textContent = `Support Link for ${userName || "User"}\n\n${supportLink}\n\nSave this link for future reference.`;
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    // Create a filename with the user's name
    const fileName = `${userName || "user"}-support-link.txt`;

    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL
    window.URL.revokeObjectURL(url);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let firebaseUserToUse = firebaseUser;

      // If using email authentication, create Firebase user
      if (authMethod === "email") {
        try {
          firebaseUserToUse = await createFirebaseUser(
            formData.email,
            formData.pin,
          );
        } catch (error) {
          let errorMessage = "Failed to create account. Please try again.";

          if (error.code === "auth/email-already-in-use") {
            errorMessage =
              "This email is already registered. Please use a different email or try signing in.";
          } else if (error.code === "auth/weak-password") {
            errorMessage =
              "Password is too weak. Please choose a stronger password.";
          } else if (error.code === "auth/invalid-email") {
            errorMessage = "Invalid email address.";
          }

          setLoading(false);
          Swal.fire({
            title: "Registration Error",
            text: errorMessage,
            icon: "error",
            confirmButtonColor: "#0891b2",
          });
          return;
        }
      }

      // Get ID token from Firebase user
      const idToken = await firebaseUserToUse.getIdToken();

      // Log the Firebase user info
      console.log("Firebase User:", firebaseUserToUse);
      console.log("ID Token:", idToken);

      // Prepare registration data
      const registrationData = {
        id_token: idToken,
        full_name: formData.fullName,
        nid: formData.nid,
        phone: formData.phone,
        division: formData.division,
        district: formData.district,
        thana: formData.thana,
        address: formData.address,
        referral: formData.referral,
        notes: formData.notes,
        plan: selectedPlan,
        is_phone_verified: devMode || phoneVerified,
      };

      // Log the registration data being sent
      console.log("Registration Data:", registrationData);

      let response;

      // Try Firebase registration first
      try {
        response = await axios.post(
          `${API_BASE_URL}/api/auth/firebase/register/`,
          registrationData,
        );
      } catch (error) {
        // Log the full error response
        console.error("Full Error Response:", error.response);
        console.error("Error Data:", error.response?.data);
        console.error("Error Status:", error.response?.status);

        // If Firebase registration fails, try regular registration as fallback
        if (error.response?.status === 400 && devMode) {
          console.log(
            "Firebase registration failed, trying regular registration as fallback",
          );

          const regularRegistrationData = {
            username: formData.email.split("@")[0],
            email: formData.email,
            password: formData.pin,
            pin: formData.pin,
            first_name: formData.fullName.split(" ")[0],
            last_name: formData.fullName.split(" ").slice(1).join(" "),
            phone: formData.phone,
            nid: formData.nid,
            division: formData.division,
            district: formData.district,
            thana: formData.thana,
            address: formData.address,
            referral: formData.referral,
            notes: formData.notes,
            role: "customer",
            is_phone_verified: devMode || phoneVerified,
          };

          console.log("Fallback Registration Data:", regularRegistrationData);

          try {
            response = await axios.post(
              `${API_BASE_URL}/api/auth/register/`,
              regularRegistrationData,
            );
          } catch (fallbackError) {
            console.error("Fallback registration also failed:", fallbackError);
            throw fallbackError;
          }
        } else {
          // Handle connection refused error
          if (error.code === "ECONNREFUSED") {
            throw new Error(
              "Unable to connect to the server. Please check if the server is running.",
            );
          }
          throw error;
        }
      }

      setLoading(false);
      setRegistrationSuccess(true);

      // Clear saved form data after successful registration
      localStorage.removeItem("registerFormData");

      // Store the token for future API calls
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        axios.defaults.headers.common["Authorization"] =
          `Token ${response.data.token}`;
      }

      // Download QR code if available
      if (response.data.qr_code) {
        downloadQRCode(response.data.qr_code, formData.fullName);
      }

      // Download support link if available
      if (response.data.support_link) {
        downloadSupportLink(response.data.support_link, formData.fullName);
      }

      // Show success message
      Swal.fire({
        title: "Registration Successful!",
        text: "Your account has been created successfully. Your QR code and support link have been downloaded.",
        icon: "success",
        confirmButtonColor: "#0891b2",
        confirmButtonText: "Continue",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to the original page or dashboard
          router.push(returnPath);
        }
      });
    } catch (error) {
      setLoading(false);

      let errorMsg = "Registration failed. Please try again.";

      if (error.response) {
        const errorData = error.response.data;

        if (errorData.email) {
          errorMsg = "This email is already registered.";
        } else if (errorData.phone) {
          errorMsg = "This phone number is already registered.";
        } else if (errorData.nid) {
          errorMsg = "This NID is already registered.";
        } else if (errorData.error) {
          errorMsg = errorData.error;
        } else if (errorData.detail) {
          errorMsg = errorData.detail;
        }

        // Handle specific database constraint errors
        if (
          errorData.error &&
          errorData.error.includes("UNIQUE constraint failed")
        ) {
          errorMsg =
            "There was an issue creating your account. This email might already be registered. Please try signing in instead.";
        }
      } else if (error.message) {
        errorMsg = error.message;
      }

      Swal.fire({
        title: "Registration Error",
        text: errorMsg,
        icon: "error",
        confirmButtonColor: "#0891b2",
      });
    }
  };

  // Get password strength color and text
  const getPinStrengthInfo = () => {
    if (passwordStrength === 0) return { color: "bg-gray-300", text: "" };
    if (passwordStrength <= 2) return { color: "bg-red-500", text: "Weak" };
    if (passwordStrength <= 3) return { color: "bg-yellow-500", text: "Fair" };
    if (passwordStrength <= 4) return { color: "bg-blue-500", text: "Good" };
    return { color: "bg-green-500", text: "Strong" };
  };

  const pinStrengthInfo = getPinStrengthInfo();

  // Handle form step navigation
  const nextStep = () => {
    if (formStep < 3) {
      setAnimationDirection(1);
      setFormStep(formStep + 1);
    }
  };

  const prevStep = () => {
    if (formStep > 1) {
      setAnimationDirection(-1);
      setFormStep(formStep - 1);
    }
  };

  // Validate current step
  const validateStep = () => {
    let newErrors = {};

    if (formStep === 1) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required";
      if (!formData.nid.trim()) newErrors.nid = "NID number is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10,11}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number (10-11 digits)";
      }
      // Only require phone verification if not in development mode
      if (!devMode && !phoneVerified) {
        newErrors.phoneVerification = "Please verify your phone number";
      }
    } else if (formStep === 2) {
      if (!formData.pin) {
        newErrors.pin = "PIN is required";
      } else if (formData.pin.length < 4) {
        newErrors.pin = "PIN must be at least 4 characters";
      }
      if (!formData.confirmPin) {
        newErrors.confirmPin = "Please confirm your PIN";
      } else if (formData.pin !== formData.confirmPin) {
        newErrors.confirmPin = "PINs do not match";
      }
    } else if (formStep === 3) {
      if (!formData.division) newErrors.division = "Select a division";
      if (!formData.district) newErrors.district = "Select a district";
      if (!formData.thana) newErrors.thana = "Select a thana";
      if (!formData.address.trim()) newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle step navigation
  const handleNextStep = () => {
    if (validateStep()) {
      nextStep();
    }
  };

  const handlePrevStep = () => {
    prevStep();
  };

  // Reset form when switching auth methods
  const resetForm = () => {
    setFormData({
      fullName: "",
      nid: "",
      email: "",
      phone: "",
      pin: "",
      confirmPin: "",
      address: "",
      division: "",
      district: "",
      thana: "",
      referral: "",
      notes: "",
      agreeToTerms: false,
    });
    setFirebaseUser(null);
    setAuthMethod("email");
    setFormStep(1);
    setPhoneVerified(false);
    setErrors({});
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex flex-col md:flex-row">
            {/* Left side - Animation and info */}
            <div
              className={`md:w-2/5 p-8 flex flex-col justify-center items-center ${
                isDark
                  ? "bg-gray-700"
                  : "bg-gradient-to-br from-cyan-500 to-cyan-600"
              }`}
            >
              <div className="w-full max-w-xs">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white">
                  {registrationSuccess ? (
                    <Lottie
                      animationData={successAnimation}
                      loop={false}
                      className="w-full h-auto"
                    />
                  ) : (
                    <Lottie
                      animationData={registerAnimation}
                      loop={true}
                      className="w-full h-auto"
                    />
                  )}
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    {registrationSuccess
                      ? "Registration Complete!"
                      : "Create Your Account"}
                  </h2>
                  {selectedPlan && !registrationSuccess && (
                    <div className="mb-4 text-center">
                      <p className="text-sm opacity-80">Selected Plan:</p>
                      <p className="text-xl font-bold">{selectedPlan}</p>
                    </div>
                  )}
                  <p className="text-white/80 text-center">
                    {registrationSuccess
                      ? "Your account has been created successfully. You will be redirected shortly."
                      : "Join us today and get access to all our features"}
                  </p>
                  {fromBookingModal && !registrationSuccess && (
                    <div className="mt-4 p-3 bg-white/10 rounded-lg">
                      <p className="text-xs text-center">
                        Your information has been pre-filled from the booking
                        form
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right side - Registration form */}
            <div className="md:w-3/5 p-8">
              {/* Development Mode Toggle */}
              <div className="flex justify-end mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="devMode"
                    checked={devMode}
                    onChange={(e) => setDevMode(e.target.checked)}
                    className="mr-2"
                  />
                  <label
                    htmlFor="devMode"
                    className={`text-sm font-medium ${
                      devMode
                        ? "text-green-600"
                        : isDark
                          ? "text-gray-300"
                          : "text-gray-600"
                    }`}
                  >
                    {devMode ? "Development Mode ON" : "Development Mode OFF"}
                  </label>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step <= formStep
                            ? "bg-cyan-600 text-white"
                            : isDark
                              ? "bg-gray-700 text-gray-400"
                              : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step < formStep ? (
                          <FaCheckCircle size={18} />
                        ) : (
                          <span>{step}</span>
                        )}
                      </div>
                      {step < 3 && (
                        <div
                          className={`flex-1 h-1 mx-2 ${
                            step < formStep
                              ? "bg-cyan-600"
                              : isDark
                                ? "bg-gray-700"
                                : "bg-gray-200"
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Personal Info
                  </span>
                  <span
                    className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Security
                  </span>
                  <span
                    className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Location
                  </span>
                </div>
              </div>

              <h1
                className={`text-2xl font-bold mb-6 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Sign Up
              </h1>

              {/* Development Mode Alert */}
              {devMode && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaExclamation className="mr-2" />
                      <span className="text-sm font-medium">
                        Development Mode is ON - Phone verification is bypassed
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPhoneVerified(true);
                        Swal.fire({
                          title: "Phone Verified!",
                          text: "Phone manually verified in development mode.",
                          icon: "success",
                          confirmButtonColor: "#0891b2",
                          timer: 1500,
                        });
                      }}
                      className="px-3 py-1 bg-green-600 text-white text-xs rounded"
                    >
                      Verify Phone
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {formStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{
                        opacity: 0,
                        x: animationDirection > 0 ? 50 : -50,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        x: animationDirection > 0 ? -50 : 50,
                      }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Auth method selection */}
                      {authMethod === "email" && (
                        <div className="mb-4">
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={handleGoogleSignIn}
                              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg border ${
                                isDark
                                  ? "border-gray-600 hover:bg-gray-700 text-white"
                                  : "border-gray-300 hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              <FaGoogle className="text-red-500" size={18} />
                              <span>Google</span>
                            </button>
                            <button
                              type="button"
                              onClick={handleFacebookSignIn}
                              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg border ${
                                isDark
                                  ? "border-gray-600 hover:bg-gray-700 text-white"
                                  : "border-gray-300 hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              <FaFacebook className="text-blue-600" size={18} />
                              <span>Facebook</span>
                            </button>
                          </div>
                          <div className="relative my-4">
                            <div
                              className={`absolute inset-0 flex items-center ${
                                isDark ? "text-gray-600" : "text-gray-400"
                              }`}
                            >
                              <div className="w-full border-t"></div>
                            </div>
                            <div
                              className={`relative flex justify-center text-sm ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              <span
                                className={`px-2 ${
                                  isDark ? "bg-gray-800" : "bg-white"
                                }`}
                              >
                                OR
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Full Name field */}
                      <div className="relative">
                        <FaUser
                          className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          disabled={authMethod !== "email"}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-200 text-gray-800"
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                            authMethod !== "email" ? "opacity-75" : ""
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <FaExclamationTriangle className="mr-1" size={10} />
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* NID field */}
                      <div className="relative">
                        <FaIdCard
                          className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <input
                          type="text"
                          name="nid"
                          placeholder="NID Card Number"
                          value={formData.nid}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-200 text-gray-800"
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        />
                        {errors.nid && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <FaExclamationTriangle className="mr-1" size={10} />
                            {errors.nid}
                          </p>
                        )}
                      </div>

                      {/* Email field */}
                      <div className="relative">
                        <FaEnvelope
                          className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={authMethod !== "email"}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-200 text-gray-800"
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                            authMethod !== "email" ? "opacity-75" : ""
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <FaExclamationTriangle className="mr-1" size={10} />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone field with verification */}
                      <div className="relative">
                        <FaPhone
                          className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            handleInputChange({
                              target: { name: "phone", value },
                            });
                          }}
                          maxLength={11}
                          disabled={phoneVerified}
                          className={`w-full pl-10 pr-20 py-3 rounded-lg border ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-200 text-gray-800"
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                            phoneVerified ? "opacity-75" : ""
                          }`}
                        />
                        {devMode && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-green-600">
                            <FaCheckCircle size={16} />
                            <span className="ml-1 text-xs">Dev Mode</span>
                          </div>
                        )}
                        {!phoneVerified && !devMode && (
                          <button
                            type="button"
                            onClick={sendPhoneVerificationCode}
                            disabled={
                              phoneVerificationLoading || !formData.phone
                            }
                            className={`absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-xs rounded ${
                              phoneVerificationLoading || !formData.phone
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-cyan-600 text-white hover:bg-cyan-700"
                            }`}
                          >
                            {phoneVerificationLoading ? "Sending..." : "Verify"}
                          </button>
                        )}
                        {!devMode && phoneVerified && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-green-600">
                            <FaCheckCircle size={16} />
                            <span className="ml-1 text-xs">Verified</span>
                          </div>
                        )}
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <FaExclamationTriangle className="mr-1" size={10} />
                            {errors.phone}
                          </p>
                        )}
                        {errors.phoneVerification && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <FaExclamationTriangle className="mr-1" size={10} />
                            {errors.phoneVerification}
                          </p>
                        )}
                      </div>

                      {/* Phone verification modal */}
                      {showPhoneVerification && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                          <div
                            className={`w-full max-w-md p-6 rounded-lg ${
                              isDark ? "bg-gray-800" : "bg-white"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-4">
                              <h3
                                className={`text-lg font-semibold ${
                                  isDark ? "text-white" : "text-gray-800"
                                }`}
                              >
                                Verify Your Phone Number
                              </h3>
                              <button
                                type="button"
                                onClick={() => setShowPhoneVerification(false)}
                                className={`p-1 rounded-full ${
                                  isDark
                                    ? "hover:bg-gray-700 text-gray-400"
                                    : "hover:bg-gray-100 text-gray-600"
                                }`}
                              >
                                <FaTimes size={16} />
                              </button>
                            </div>
                            <p
                              className={`mb-4 ${
                                isDark ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              Enter the 6-digit code sent to {formData.phone}
                            </p>
                            <div className="relative mb-4">
                              <FaSms
                                className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                                  isDark ? "text-gray-400" : "text-gray-500"
                                }`}
                              />
                              <input
                                type="text"
                                placeholder="Verification Code"
                                value={verificationCode}
                                onChange={(e) =>
                                  setVerificationCode(e.target.value)
                                }
                                maxLength={6}
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                  isDark
                                    ? "bg-gray-700 border-gray-600 text-white"
                                    : "bg-gray-50 border-gray-200 text-gray-800"
                                } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                              />
                            </div>
                            <div className="flex space-x-3">
                              <button
                                type="button"
                                onClick={verifyPhoneNumber}
                                className={`flex-1 py-2 rounded-lg font-medium ${
                                  isDark
                                    ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                                    : "bg-cyan-600 hover:bg-cyan-700 text-white"
                                }`}
                              >
                                Verify
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowPhoneVerification(false)}
                                className={`flex-1 py-2 rounded-lg font-medium ${
                                  isDark
                                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                }`}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium flex items-center"
                        >
                          Next
                          <FaArrowRight className="ml-2" size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {formStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{
                        opacity: 0,
                        x: animationDirection > 0 ? 50 : -50,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        x: animationDirection > 0 ? -50 : 50,
                      }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Show user info if using social auth */}
                      {authMethod !== "email" && firebaseUser && (
                        <div
                          className={`p-4 rounded-lg ${
                            isDark ? "bg-gray-700" : "bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {firebaseUser.photoURL && (
                              <img
                                src={firebaseUser.photoURL}
                                alt="Profile"
                                className="w-12 h-12 rounded-full"
                              />
                            )}
                            <div>
                              <p
                                className={`font-medium ${
                                  isDark ? "text-white" : "text-gray-800"
                                }`}
                              >
                                {firebaseUser.displayName || "User"}
                              </p>
                              <p
                                className={`text-sm ${
                                  isDark ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {firebaseUser.email}
                              </p>
                              <p
                                className={`text-xs ${
                                  isDark ? "text-gray-500" : "text-gray-500"
                                }`}
                              >
                                Signed in with{" "}
                                {authMethod === "google"
                                  ? "Google"
                                  : "Facebook"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PIN field - only show for email auth */}
                      {authMethod === "email" && (
                        <div className="relative">
                          <FaLock
                            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <input
                            type={showPin ? "text" : "password"}
                            name="pin"
                            placeholder="Set PIN (min. 4 characters)"
                            value={formData.pin}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-gray-50 border-gray-200 text-gray-800"
                            } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPin(!showPin)}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {showPin ? (
                              <FaEyeSlash size={18} />
                            ) : (
                              <FaEye size={18} />
                            )}
                          </button>
                          {errors.pin && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <FaExclamationTriangle
                                className="mr-1"
                                size={10}
                              />
                              {errors.pin}
                            </p>
                          )}

                          {/* PIN strength indicator */}
                          {formData.pin && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between mb-1">
                                <span
                                  className={`text-xs ${
                                    isDark ? "text-gray-400" : "text-gray-600"
                                  }`}
                                >
                                  PIN Strength
                                </span>
                                <span
                                  className={`text-xs ${
                                    isDark ? "text-gray-400" : "text-gray-600"
                                  }`}
                                >
                                  {pinStrengthInfo.text}
                                </span>
                              </div>
                              <div
                                className={`h-1 w-full rounded-full ${
                                  isDark ? "bg-gray-700" : "bg-gray-200"
                                }`}
                              >
                                <div
                                  className={`h-full rounded-full ${pinStrengthInfo.color} transition-all duration-300`}
                                  style={{
                                    width: `${(passwordStrength / 5) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Confirm PIN field - only show for email auth */}
                      {authMethod === "email" && (
                        <div className="relative">
                          <FaLock
                            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <input
                            type={showConfirmPin ? "text" : "password"}
                            name="confirmPin"
                            placeholder="Confirm PIN"
                            value={formData.confirmPin}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-gray-50 border-gray-200 text-gray-800"
                            } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPin(!showConfirmPin)}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {showConfirmPin ? (
                              <FaEyeSlash size={18} />
                            ) : (
                              <FaEye size={18} />
                            )}
                          </button>
                          {errors.confirmPin && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <FaExclamationTriangle
                                className="mr-1"
                                size={10}
                              />
                              {errors.confirmPin}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className={`px-6 py-2 ${
                            isDark
                              ? "bg-gray-700 hover:bg-gray-600"
                              : "bg-gray-200 hover:bg-gray-300"
                          } rounded-lg font-medium`}
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium flex items-center"
                        >
                          Next
                          <FaArrowRight className="ml-2" size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {formStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{
                        opacity: 0,
                        x: animationDirection > 0 ? 50 : -50,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        x: animationDirection > 0 ? -50 : 50,
                      }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Location fields */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="relative">
                          <FaMapMarkerAlt
                            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <select
                            name="division"
                            value={formData.division}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border appearance-none ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-gray-50 border-gray-200 text-gray-800"
                            } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                          >
                            <option value="">Division</option>
                            {divisions.map((division) => (
                              <option key={division.id} value={division.id}>
                                {division.name}
                              </option>
                            ))}
                          </select>
                          {errors.division && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <FaExclamationTriangle
                                className="mr-1"
                                size={10}
                              />
                              {errors.division}
                            </p>
                          )}
                        </div>

                        <div className="relative">
                          <FaMapMarkerAlt
                            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <select
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            disabled={!formData.division}
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border appearance-none ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-gray-50 border-gray-200 text-gray-800"
                            } focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                              !formData.division ? "opacity-50" : ""
                            }`}
                          >
                            <option value="">District</option>
                            {districts.map((district) => (
                              <option key={district.id} value={district.id}>
                                {district.name}
                              </option>
                            ))}
                          </select>
                          {errors.district && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <FaExclamationTriangle
                                className="mr-1"
                                size={10}
                              />
                              {errors.district}
                            </p>
                          )}
                        </div>

                        <div className="relative">
                          <FaMapMarkerAlt
                            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <select
                            name="thana"
                            value={formData.thana}
                            onChange={handleInputChange}
                            disabled={!formData.district}
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border appearance-none ${
                              isDark
                                ? "bg-gray-700 border-gray-600 text-white"
                                : "bg-gray-50 border-gray-200 text-gray-800"
                            } focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                              !formData.district ? "opacity-50" : ""
                            }`}
                          >
                            <option value="">Thana</option>
                            {thanas.map((thana) => (
                              <option key={thana.id} value={thana.id}>
                                {thana.name}
                              </option>
                            ))}
                          </select>
                          {errors.thana && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <FaExclamationTriangle
                                className="mr-1"
                                size={10}
                              />
                              {errors.thana}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Address field */}
                      <div className="relative">
                        <FaMapMarkerAlt
                          className={`absolute left-3 top-5 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <textarea
                          name="address"
                          placeholder="Address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={3}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-200 text-gray-800"
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none`}
                        ></textarea>
                        {errors.address && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <FaExclamationTriangle className="mr-1" size={10} />
                            {errors.address}
                          </p>
                        )}
                      </div>

                      {/* Referral field */}
                      <div className="relative">
                        <FaUser
                          className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <input
                          type="text"
                          name="referral"
                          placeholder="Referral Code (Optional)"
                          value={formData.referral}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-200 text-gray-800"
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        />
                      </div>

                      {/* Notes field */}
                      <div className="relative">
                        <FaUser
                          className={`absolute left-3 top-5 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <textarea
                          name="notes"
                          placeholder="Notes (Optional)"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={3}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-200 text-gray-800"
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none`}
                        ></textarea>
                      </div>

                      {/* Terms and conditions */}
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          id="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          className="mt-1 mr-2"
                        />
                        <label
                          htmlFor="agreeToTerms"
                          className={`text-sm ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          I agree to the{" "}
                          <a href="#" className="text-cyan-600 hover:underline">
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-cyan-600 hover:underline">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                      {errors.agreeToTerms && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <FaExclamationTriangle className="mr-1" size={10} />
                          {errors.agreeToTerms}
                        </p>
                      )}

                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className={`px-6 py-2 ${
                            isDark
                              ? "bg-gray-700 hover:bg-gray-600"
                              : "bg-gray-200 hover:bg-gray-300"
                          } rounded-lg font-medium`}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                            loading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-cyan-600 hover:bg-cyan-700 text-white"
                          }`}
                        >
                          {loading ? (
                            <span className="flex items-center justify-center">
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Creating Account...
                            </span>
                          ) : (
                            "Create Account"
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Login link */}
              <div
                className={`mt-6 text-center ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-cyan-600 hover:underline font-medium"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Firebase reCAPTCHA container - only render if not in dev mode */}
      {!devMode && (
        <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
      )}
    </div>
  );
};

export default RegisterPage;
