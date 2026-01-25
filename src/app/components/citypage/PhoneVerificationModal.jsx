"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaTimes, FaPhoneAlt, FaShieldAlt, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import Swal from 'sweetalert2';

function PhoneVerificationModal({ isOpen, onClose, onVerificationSuccess, initialPhone = '' }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mounted, setMounted] = useState(false);

  // Form states
  const [step, setStep] = useState(1); // 1: Enter phone, 2: Enter code, 3: Success
  const [phone, setPhone] = useState(initialPhone);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [resendTimer, setResendTimer] = useState(0);
  const [userData, setUserData] = useState(null);

  // API base URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

  // Configure axios defaults
  useEffect(() => {
    // Create a new axios instance with custom configuration
    const apiClient = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    
    // Add a request interceptor to include credentials
    apiClient.interceptors.request.use(config => {
      config.withCredentials = true;
      return config;
    });
    
    // Store the client in a ref to avoid recreating it
    if (!window.apiClient) {
      window.apiClient = apiClient;
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      console.log('PhoneVerificationModal mounted with isOpen:', isOpen);
      // If phone is provided, skip to step 2 (enter code)
      if (initialPhone) {
        setPhone(initialPhone);
        setStep(2);
      }
    }
    return () => setMounted(false);
  }, [isOpen, initialPhone]);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Always render the modal when isOpen is true, regardless of mounted state
  if (!isOpen) return null;

  // Validate phone number
  const validatePhone = () => {
    const newErrors = {};
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,11}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number (10-11 digits)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate verification code
  const validateCode = () => {
    const newErrors = {};
    if (!verificationCode.trim()) {
      newErrors.code = "Verification code is required";
    } else if (!/^\d{6}$/.test(verificationCode)) {
      newErrors.code = "Please enter a valid 6-digit code";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send verification code
  const sendVerificationCode = async (isResend = false) => {
    if (!validatePhone()) return;

    setLoading(true);
    setErrors({});

    try {
      console.log('Sending verification code to:', `${API_BASE_URL}/api/auth/phone/send-code/`);
      
      // Use the stored apiClient with the correct endpoint
      const response = await window.apiClient.post('/api/auth/phone/send-code/', {
        phone: phone
      });

      console.log('Response received:', response.data);

      setLoading(false);
      setStep(2);
      
      if (isResend) {
        setResendTimer(60);
        Swal.fire({
          title: "Code Resent",
          text: "A new verification code has been sent to your phone",
          icon: "success",
          confirmButtonColor: "#0891b2",
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          title: "Code Sent",
          text: `A 6-digit code has been sent to ${phone}`,
          icon: "info",
          confirmButtonColor: "#0891b2",
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      setLoading(false);
      console.error('Error sending verification code:', error);
      
      // Handle different error types
      let errorMsg = "Failed to send verification code";
      
      if (error.response) {
        console.log('Error response:', error.response);
        errorMsg = error.response.data?.detail || error.response.data?.error || `Server error (${error.response.status})`;
      } else if (error.request) {
        console.log('No response received:', error.request);
        errorMsg = "Network error. Please check your connection.";
      } else {
        console.log('Request setup error:', error.message);
        errorMsg = error.message || errorMsg;
      }
      
      setErrors({ phone: errorMsg });
      
      Swal.fire({
        title: "Error",
        text: errorMsg,
        icon: "error",
        confirmButtonColor: "#0891b2"
      });
    }
  };

  // Verify the code
  const verifyCode = async () => {
    if (!validateCode()) return;

    setLoading(true);
    setErrors({});

    try {
      console.log('Verifying code with:', `${API_BASE_URL}/api/auth/phone/verify/`);
      
      // Use the stored apiClient
      const response = await window.apiClient.post('/api/auth/phone/verify/', {
        phone: phone,
        code: verificationCode
      });

      console.log('Verification response:', response.data);

      setLoading(false);
      setStep(3);
      setUserData(response.data);

      // Store tokens in localStorage
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      // Call success callback after a short delay
      setTimeout(() => {
        if (onVerificationSuccess) {
          onVerificationSuccess(response.data);
        }
      }, 1500);

    } catch (error) {
      setLoading(false);
      console.error('Error verifying code:', error);
      
      let errorMsg = "Invalid verification code";
      
      if (error.response) {
        console.log('Error response:', error.response);
        errorMsg = error.response.data?.detail || error.response.data?.error || `Server error (${error.response.status})`;
      } else if (error.request) {
        console.log('No response received:', error.request);
        errorMsg = "Network error. Please check your connection.";
      } else {
        console.log('Request setup error:', error.message);
        errorMsg = error.message || errorMsg;
      }
      
      setErrors({ code: errorMsg });
    }
  };

  // Handle phone input change
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    setPhone(value);
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  // Handle code input change
  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6); // Only 6 digits
    setVerificationCode(value);
    if (errors.code) {
      setErrors(prev => ({ ...prev, code: '' }));
    }
  };

  // Reset modal when closed
  const handleClose = () => {
    setStep(1);
    setPhone(initialPhone);
    setVerificationCode('');
    setErrors({});
    setResendTimer(0);
    setUserData(null);
    onClose();
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 min-h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm pointer-events-auto"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`relative w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden transition-colors duration-300 pointer-events-auto
              ${isDark ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white border border-cyan-50 text-slate-900'}`}
          >
            {/* Header */}
            <div className={`sticky top-0 z-20 p-6 flex justify-between items-center border-b border-slate-100 dark:border-slate-800 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
              <div>
                <h2 className="text-xl font-black text-cyan-600 tracking-tight">Phone Verification</h2>
                <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {step === 1 && "Enter your phone number"}
                  {step === 2 && "Enter verification code"}
                  {step === 3 && "Verification successful"}
                </p>
              </div>
              <button onClick={handleClose} className={`p-2 rounded-full ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                <FaTimes size={14} />
              </button>
            </div>

            <div className="p-8">
              {/* Step 1: Enter Phone Number */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="mx-auto w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                      <FaPhoneAlt className="text-cyan-600 text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Verify Your Phone</h3>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      We&apos;ll send you a verification code to confirm your identity
                    </p>
                  </div>

                  <div className="relative">
                    <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all text-sm font-medium ${isDark ? 'bg-slate-800/50 text-white border-transparent' : 'bg-slate-50 text-slate-900 border-slate-100'} focus:border-cyan-500`}
                      maxLength={11}
                    />
                    {errors.phone && <p className="text-[10px] font-bold text-red-500 mt-1 ml-3">{errors.phone}</p>}
                  </div>

                  <button
                    onClick={() => sendVerificationCode(false)}
                    disabled={loading || !phone}
                    className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white font-black text-lg rounded-2xl shadow-lg transition-all active:scale-95 shadow-cyan-600/20 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Code
                        <FaArrowRight className="text-sm" />
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              {/* Step 2: Enter Verification Code */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="mx-auto w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                      <FaShieldAlt className="text-cyan-600 text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Enter Verification Code</h3>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      We&apos;ve sent a 6-digit code to {phone}
                    </p>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={verificationCode}
                      onChange={handleCodeChange}
                      className={`w-full px-4 py-4 rounded-2xl border-2 outline-none transition-all text-center text-lg font-bold tracking-widest ${isDark ? 'bg-slate-800/50 text-white border-transparent' : 'bg-slate-50 text-slate-900 border-slate-100'} focus:border-cyan-500`}
                      maxLength={6}
                    />
                    {errors.code && <p className="text-[10px] font-bold text-red-500 mt-1 text-center">{errors.code}</p>}
                  </div>

                  <button
                    onClick={verifyCode}
                    disabled={loading || verificationCode.length !== 6}
                    className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white font-black text-lg rounded-2xl shadow-lg transition-all active:scale-95 shadow-cyan-600/20 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify Code
                        <FaCheckCircle className="text-sm" />
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
                      Didn&apos;t receive the code?
                    </p>
                    <button
                      onClick={() => sendVerificationCode(true)}
                      disabled={resendTimer > 0 || loading}
                      className="text-cyan-600 font-bold text-sm hover:underline disabled:text-cyan-400 disabled:no-underline"
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                    </button>
                  </div>

                  <button
                    onClick={() => setStep(1)}
                    className="w-full py-2 text-cyan-600 font-bold text-sm hover:underline"
                  >
                    Change Phone Number
                  </button>
                </motion.div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-green-600 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600">Verification Successful!</h3>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Your phone number has been verified successfully
                  </p>
                  {userData?.user && (
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                      <p className={`text-xs font-bold uppercase ${isDark ? 'text-slate-500' : 'text-slate-600'} mb-1`}>
                        Welcome, {userData.user.first_name || userData.user.username}!
                      </p>
                      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Role: <span className="font-bold capitalize">{userData.user.role}</span>
                      </p>
                    </div>
                  )}
                  <button
                    onClick={handleClose}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black text-lg rounded-2xl shadow-lg transition-all active:scale-95 shadow-green-600/20"
                  >
                    Continue
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Always use createPortal if window is available
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  
  return null;
}

export default PhoneVerificationModal;