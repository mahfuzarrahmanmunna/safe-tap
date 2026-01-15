// RegisterPage.jsx
"use client";
import React, { useState, useEffect } from "react";
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
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
import Lottie from "lottie-react";
import registerAnimation from "../public/animations/register-animation.json";
import successAnimation from "../public/animations/success-animation.json";

const RegisterPage = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
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

  // Location data states
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [returnPath, setReturnPath] = useState("/");

  // API base URL
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

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

          setSelectedPlan(parsed.selectedPlan || "");
          setReturnPath(parsed.returnPath || "/");

          // Fetch divisions, districts, and thanas if location data is present
          if (parsed.division) {
            fetchDivisions().then(() => {
              if (parsed.division) {
                fetchDistricts(parsed.division).then(() => {
                  if (parsed.district) {
                    fetchThanas(parsed.district);
                  }
                });
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
        console.log(fullName);

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
          }));
        } catch (e) {
          console.error("Failed to parse saved form data", e);
        }
      }
    }
  }, []);

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
        `${API_BASE_URL}/api/districts/?division_id=${divisionId}`
      );
      setDistricts(response.data);
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
        `${API_BASE_URL}/api/thanas/?district_id=${districtId}`
      );
      setThanas(response.data);
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

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Send registration data to API
      const response = await axios.post(`${API_BASE_URL}/api/auth/register/`, {
        full_name: formData.fullName,
        nid: formData.nid,
        email: formData.email,
        phone: formData.phone,
        pin: formData.pin,
        division: formData.division,
        district: formData.district,
        thana: formData.thana,
        address: formData.address,
        referral: formData.referral,
        notes: formData.notes,
        plan: selectedPlan,
      });

      setLoading(false);
      setRegistrationSuccess(true);

      // Clear saved form data after successful registration
      localStorage.removeItem("registerFormData");

      // Download QR code if available
      if (response.data.qr_code) {
        downloadQRCode(response.data.qr_code, formData.fullName);
      }

      // Show success message
      Swal.fire({
        title: "Registration Successful!",
        text: "Your account has been created successfully and your QR code has been downloaded.",
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
      }

      Swal.fire({
        title: "Registration Error",
        text: errorMsg,
        icon: "error",
        confirmButtonColor: "#0891b2",
      });
    }
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
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-200 text-gray-800"
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
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

                      {/* Phone field */}
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
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-200 text-gray-800"
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <FaExclamationTriangle className="mr-1" size={10} />
                            {errors.phone}
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
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            isDark
                              ? "bg-gray-700 border-gray-600 text-white"
                              : "bg-gray-50 border-gray-200 text-gray-800"
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <FaExclamationTriangle className="mr-1" size={10} />
                            {errors.email}
                          </p>
                        )}
                      </div>

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
                      {/* PIN field */}
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
                            <FaExclamationTriangle className="mr-1" size={10} />
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

                      {/* Confirm PIN field */}
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
                            <FaExclamationTriangle className="mr-1" size={10} />
                            {errors.confirmPin}
                          </p>
                        )}
                      </div>

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
    </div>
  );
};

export default RegisterPage;
