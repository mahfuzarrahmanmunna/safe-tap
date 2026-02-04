"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios"; // Make sure to import axios

import {
  FaTimes,
  FaPhoneAlt,
  FaUser,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaStickyNote,
  FaCheckCircle,
  FaIdCard,
  FaChevronDown,
} from "react-icons/fa";
import { useTheme } from "@/app/contexts/ThemeContext";
import PhoneVerificationModal from "./PhoneVerificationModal";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

function BookingModal({
  isOpen,
  onClose,
  selectedPlan,
  onRegistrationSuccess,
}) {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const { user } = useAuth();
  console.log(user);

  // Location data states
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [locationError, setLocationError] = useState("");
  const [fetchingLocation, setFetchingLocation] = useState(false);

  // State for the map source URL
  const [mapSrc, setMapSrc] = useState(
    "https://www.google.com/maps?q=Bangladesh&output=embed",
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    referral: "",
    city: "",
    notes: "",
    fullName: "",
    email: "",
    nid: "",
    division: "",
    district: "",
    thana: "",
    addressDetails: "",
  });

  // API base URL
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    setMounted(true);
    // Check if user is logged in
    checkAuthStatus();
  }, []);

  // Fetch divisions when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchDivisions();
    }
  }, [isOpen]);

  // Check if user is logged in
  const checkAuthStatus = () => {
    const token = localStorage.getItem("accessToken"); // Changed from access_token to accessToken
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setUserName(userData.first_name || userData.username || "User");
        // Pre-fill form with user data
        setFormData((prev) => ({
          ...prev,
          fullName:
            userData.first_name && userData.last_name
              ? `${userData.first_name} ${userData.last_name}`
              : userData.username || "",
          email: userData.email || "",
          phone: userData.phone || "",
        }));
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  // Fetch all divisions
  const fetchDivisions = async () => {
    try {
      setFetchingLocation(true);
      setLocationError("");
      console.log("Fetching divisions from:", `${API_BASE_URL}/api/divisions/`);

      const response = await axios.get(`${API_BASE_URL}/api/divisions/`);
      console.log("Divisions response:", response.data);
      setDivisions(response.data);
    } catch (err) {
      console.error("Error fetching divisions:", err);
      setLocationError("Failed to fetch divisions. Please try again later.");
      Swal.fire({
        title: "Error",
        text: "Failed to fetch divisions. Please try again later.",
        icon: "error",
        confirmButtonColor: "#0891b2",
      });
    } finally {
      setFetchingLocation(false);
    }
  };

  // Update the map source whenever location data changes
  useEffect(() => {
    const thanaName = thanas.find((t) => t.id == formData.thana)?.name;
    const districtName = districts.find((d) => d.id == formData.district)?.name;
    const divisionName = divisions.find((d) => d.id == formData.division)?.name;

    const locationQuery =
      thanaName || districtName || divisionName || "Bangladesh";
    const newMapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
      locationQuery,
    )}&output=embed`;
    setMapSrc(newMapSrc);
  }, [
    formData.thana,
    formData.district,
    formData.division,
    thanas,
    districts,
    divisions,
  ]);

  // Handler for form inputs
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for division selection
  const handleDivisionSelect = async (e) => {
    const divisionId = e.target.value;

    setDistricts([]);
    setThanas([]);
    setFormData((prev) => ({
      ...prev,
      division: divisionId,
      district: "",
      thana: "",
    }));

    if (divisionId) {
      try {
        setFetchingLocation(true);
        console.log("Fetching districts for division:", divisionId);

        const response = await axios.get(
          `${API_BASE_URL}/api/districts/?division_id=${divisionId}`,
        );
        console.log("Districts response:", response.data);
        setDistricts(response.data);
      } catch (err) {
        console.error("Error fetching districts:", err);
        setLocationError("Failed to fetch districts. Please try again later.");
        Swal.fire({
          title: "Error",
          text: "Failed to fetch districts. Please try again later.",
          icon: "error",
          confirmButtonColor: "#0891b2",
        });
      } finally {
        setFetchingLocation(false);
      }
    }
  };

  // Handler for district selection
  const handleDistrictSelect = async (e) => {
    const districtId = e.target.value;

    setThanas([]);
    setFormData((prev) => ({
      ...prev,
      district: districtId,
      thana: "",
    }));

    if (districtId) {
      try {
        setFetchingLocation(true);
        console.log("Fetching thanas for district:", districtId);

        const response = await axios.get(
          `${API_BASE_URL}/api/thanas/?district_id=${districtId}`,
        );
        console.log("Thanas response:", response.data);
        setThanas(response.data);
      } catch (err) {
        console.error("Error fetching thanas:", err);
        setLocationError("Failed to fetch thanas. Please try again later.");
        Swal.fire({
          title: "Error",
          text: "Failed to fetch thanas. Please try again later.",
          icon: "error",
          confirmButtonColor: "#0891b2",
        });
      } finally {
        setFetchingLocation(false);
      }
    }
  };

  // Handler for thana selection
  const handleThanaSelect = (e) => {
    const thanaId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      thana: thanaId,
    }));
  };

  // Download QR Code automatically
  const downloadQRCode = (qrCodeData, userName) => {
    if (!qrCodeData) return;

    const link = document.createElement("a");
    link.href = `data:image/png;base64,${qrCodeData}`;
    link.download = `${userName || "user"}-safetap-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!mounted) return null;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is already logged in
    if (isLoggedIn) {
      // Show a message and proceed with subscription directly
      Swal.fire({
        title: "Already Logged In",
        text: `You are already logged in as ${userName}. Proceeding with your subscription...`,
        icon: "info",
        confirmButtonColor: "#0891b2",
        confirmButtonText: "Continue",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Save location data and proceed to subscription/checkout
          const subscriptionData = {
            ...formData,
            selectedPlan,
            returnPath: window.location.pathname,
            fromBookingModal: true,
            skipRegistration: true, // Flag to skip registration
          };

          // Save to localStorage for checkout page
          localStorage.setItem(
            "subscriptionData",
            JSON.stringify(subscriptionData),
          );

          // Redirect to subscription/checkout page instead of register
          router.push("/subscription");
        }
      });
      return;
    }

    if (!validate()) {
      return;
    }

    // Save the form data to localStorage to be used in the register page
    localStorage.setItem(
      "bookingFormData",
      JSON.stringify({
        ...formData,
        selectedPlan,
        returnPath: window.location.pathname,
        // Add a flag to indicate this data came from the booking modal
        fromBookingModal: true,
      }),
    );

    // Close the modal and navigate to register page
    onClose();
    router.push("/register");
  };

  // Validate form
  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.nid.trim()) newErrors.nid = "NID number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10,11}$/.test(formData.phone))
      newErrors.phone = "Please enter a valid phone number (10-11 digits)";
    if (!formData.division) newErrors.division = "Select a division";
    if (!formData.district) newErrors.district = "Select a district";
    if (!formData.thana) newErrors.thana = "Select a thana";
    if (!formData.addressDetails.trim())
      newErrors.addressDetails = "Address details are required";

    console.log("Form validation errors:", newErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle close modal
  const handleCloseModal = () => {
    if (bookingSuccess) {
      setBookingSuccess(false);
      setQrCode("");
      setUserId(null);
      setEmail("");
      setPhone("");
    }
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      nid: "",
      referral: "",
      division: "",
      district: "",
      thana: "",
      addressDetails: "",
      notes: "",
    });
    setErrors({});
    onClose();
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`relative w-full max-w-lg rounded-[2.5rem] shadow-2xl transition-colors duration-300 h-[90vh] overflow-y-auto pointer-events-auto
    scrollbar-hide md:scrollbar-default
    ${isDark ? "bg-slate-900 border border-slate-800 text-white" : "bg-white border border-cyan-50 text-slate-900"}`}
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {/* Header */}
            <div
              className={`sticky top-0 z-20 p-6 flex justify-between items-center border-b border-slate-100 dark:border-slate-800 ${isDark ? "bg-slate-900" : "bg-white"}`}
            >
              <div>
                <h2 className="text-xl font-black text-cyan-600 tracking-tight">
                  Start 7-Day Trial
                </h2>
                <p
                  className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  Plan: <span className="text-cyan-500">{selectedPlan}</span>
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className={`p-2 rounded-full ${isDark
                  ? "bg-slate-800 text-slate-400"
                  : "bg-slate-100 text-slate-500"
                  }`}
              >
                <FaTimes size={14} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Map Section */}
              <div className="w-full h-48 rounded-3xl overflow-hidden shadow-inner border-2 border-cyan-500/20 relative bg-slate-100">
                <iframe
                  key={mapSrc}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: isDark
                      ? "invert(90%) hue-rotate(180deg) brightness(95%)"
                      : "none",
                  }}
                  src={mapSrc}
                  loading="lazy"
                ></iframe>
                <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full text-[10px] font-bold text-cyan-600 flex items-center gap-1 shadow-sm">
                  <FaMapMarkerAlt size={10} />{" "}
                  {thanas.find((t) => t.id == formData.thana)?.name ||
                    districts.find((d) => d.id == formData.district)?.name ||
                    divisions?.find((d) => d?.id == formData?.division)?.name ||
                    "Service Area"}
                </div>
              </div>

              {/* User Status Alert */}
              {isLoggedIn && (
                <div
                  className={`p-4 rounded-xl ${isDark
                    ? "bg-cyan-900/30 border border-cyan-700/50"
                    : "bg-cyan-50 border border-cyan-200"
                    } flex items-start gap-3`}
                >
                  <FaCheckCircle className="text-cyan-500 mt-0.5" size={16} />
                  <div>
                    <p
                      className={`text-sm font-medium ${isDark ? "text-cyan-100" : "text-cyan-900"
                        }`}
                    >
                      You are logged in!
                    </p>
                    <p
                      className={`text-xs ${isDark ? "text-cyan-200" : "text-cyan-700"
                        } mt-1`}
                    >
                      Your account information has been pre-filled. Just
                      complete your location details to subscribe.
                    </p>
                  </div>
                </div>
              )}

              {/* Location Error Alert */}
              {locationError && (
                <div
                  className={`p-4 rounded-xl ${isDark
                    ? "bg-red-900/30 border border-red-700/50"
                    : "bg-red-50 border border-red-200"
                    } flex items-start gap-3`}
                >
                  <FaTimes className="text-red-500 mt-0.5" size={16} />
                  <div>
                    <p
                      className={`text-sm font-medium ${isDark ? "text-red-100" : "text-red-900"
                        }`}
                    >
                      Location Data Error
                    </p>
                    <p
                      className={`text-xs ${isDark ? "text-red-200" : "text-red-700"
                        } mt-1`}
                    >
                      {locationError}
                    </p>
                  </div>
                </div>
              )}

              {/* Loading Indicator */}
              {fetchingLocation && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                  <span className="ml-2 text-sm text-cyan-600">
                    Loading location data...
                  </span>
                </div>
              )}

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Full Name - Disabled if logged in */}
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-medium ${isDark
                      ? "bg-slate-800/50 text-white border-transparent"
                      : "bg-slate-50 text-slate-900 border-slate-100"
                      } focus:border-cyan-500 ${isLoggedIn ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    value={formData.fullName}
                    onChange={handleFormInputChange}
                    disabled={isLoggedIn}
                  />
                  {errors.fullName && (
                    <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email - Disabled if logged in */}
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-medium ${isDark
                      ? "bg-slate-800/50 text-white border-transparent"
                      : "bg-slate-50 text-slate-900 border-slate-100"
                      } focus:border-cyan-500 ${isLoggedIn ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    value={formData.email}
                    onChange={handleFormInputChange}
                    disabled={isLoggedIn}
                  />
                  {errors.email && (
                    <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone - Disabled if logged in */}
                <div className="relative">
                  <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (10-11 digits)"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-medium ${isDark
                      ? "bg-slate-800/50 text-white border-transparent"
                      : "bg-slate-50 text-slate-900 border-slate-100"
                      } focus:border-cyan-500 ${isLoggedIn ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    value={formData.phone}
                    onChange={(e) => {
                      if (!isLoggedIn) {
                        const value = e.target.value.replace(/\D/g, "");
                        setFormData((prev) => ({ ...prev, phone: value }));
                      }
                    }}
                    maxLength={11}
                    disabled={isLoggedIn}
                  />
                  {errors.phone && (
                    <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* NID - Hidden if logged in */}
                {!isLoggedIn && (
                  <div className="relative">
                    <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <input
                      type="text"
                      name="nid"
                      placeholder="NID Card Number"
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-medium ${isDark
                        ? "bg-slate-800/50 text-white border-transparent"
                        : "bg-slate-50 text-slate-900 border-slate-100"
                        } focus:border-cyan-500`}
                      value={formData.nid}
                      onChange={handleFormInputChange}
                    />
                    {errors.nid && (
                      <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">
                        {errors.nid}
                      </p>
                    )}
                  </div>
                )}

                {/* Division Selection */}
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                  <select
                    name="division"
                    className={`w-full pl-12 pr-10 py-4 rounded-2xl border-2 outline-none appearance-none transition-all text-sm font-medium ${isDark
                      ? "bg-slate-800/50 text-white border-transparent"
                      : "bg-slate-50 text-slate-900 border-slate-100"
                      } focus:border-cyan-500 cursor-pointer ${fetchingLocation ? "opacity-50" : ""
                      }`}
                    value={formData.division}
                    onChange={handleDivisionSelect}
                    disabled={fetchingLocation}
                  >
                    <option value="">Select Division *</option>
                    {divisions.map((division) => (
                      <option key={division.id} value={division.id}>
                        {division.name}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none" />
                  {errors.division && (
                    <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">
                      {errors.division}
                    </p>
                  )}
                </div>

                {/* District Selection */}
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                  <select
                    name="district"
                    className={`w-full pl-12 pr-10 py-4 rounded-2xl border-2 outline-none appearance-none transition-all text-sm font-medium ${isDark
                      ? "bg-slate-800/50 text-white border-transparent"
                      : "bg-slate-50 text-slate-900 border-slate-100"
                      } focus:border-cyan-500 cursor-pointer ${formData.division ? "" : "opacity-50"
                      } ${fetchingLocation ? "opacity-50" : ""}`}
                    value={formData.district}
                    onChange={handleDistrictSelect}
                    disabled={!formData.division || fetchingLocation}
                  >
                    <option value="">Select District *</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none" />
                  {errors.district && (
                    <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">
                      {errors.district}
                    </p>
                  )}
                </div>

                {/* Thana Selection */}
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                  <select
                    name="thana"
                    className={`w-full pl-12 pr-10 py-4 rounded-2xl border-2 outline-none appearance-none transition-all text-sm font-medium ${isDark
                      ? "bg-slate-800/50 text-white border-transparent"
                      : "bg-slate-50 text-slate-900 border-slate-100"
                      } focus:border-cyan-500 cursor-pointer ${formData.district ? "" : "opacity-50"
                      } ${fetchingLocation ? "opacity-50" : ""}`}
                    value={formData.thana}
                    onChange={handleThanaSelect}
                    disabled={!formData.district || fetchingLocation}
                  >
                    <option value="">Select Thana *</option>
                    {thanas.map((thana) => (
                      <option key={thana.id} value={thana.id}>
                        {thana.name}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none" />
                  {errors.thana && (
                    <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">
                      {errors.thana}
                    </p>
                  )}
                </div>

                {/* Address Details */}
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-5 text-cyan-500" />
                  <textarea
                    name="addressDetails"
                    placeholder="Enter your detailed address (house number, street, etc.)"
                    rows="3"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-transparent outline-none transition-all text-sm font-medium focus:border-cyan-500 resize-none ${isDark
                      ? "bg-slate-800/50 text-white"
                      : "bg-slate-50 text-slate-900"
                      }`}
                    value={formData.addressDetails}
                    onChange={handleFormInputChange}
                  />
                  {errors.addressDetails && (
                    <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">
                      {errors.addressDetails}
                    </p>
                  )}
                </div>

                {/* Referral (Optional) */}
                <div className="relative">
                  <FaTicketAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                  <input
                    type="text"
                    name="referral"
                    placeholder="Referral Code (Optional)"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-transparent outline-none transition-all text-sm font-medium focus:border-cyan-500 ${isDark
                      ? "bg-slate-800/50 text-white"
                      : "bg-slate-50 text-slate-900"
                      }`}
                    value={formData.referral}
                    onChange={handleFormInputChange}
                  />
                </div>

                {/* Notes Field  */}
                <div className="relative">
                  <FaStickyNote className="absolute left-4 top-5 text-cyan-500" />
                  <textarea
                    name="notes"
                    placeholder="Any special instructions or notes?"
                    rows="3"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-transparent outline-none transition-all text-sm font-medium focus:border-cyan-500 resize-none ${isDark
                      ? "bg-slate-800/50 text-white"
                      : "bg-slate-50 text-slate-900"
                      }`}
                    value={formData.notes}
                    onChange={handleFormInputChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white font-black text-lg rounded-2xl shadow-lg transition-all active:scale-95 shadow-cyan-600/20 flex items-center justify-center gap-2"
                  disabled={loading || fetchingLocation}
                >
                  {loading || fetchingLocation ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {fetchingLocation
                        ? "Loading Location Data..."
                        : "Processing..."}
                    </>
                  ) : isLoggedIn ? (
                    "Subscribe Now"
                  ) : (
                    "Start 7-Day Trial"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

export default BookingModal;
