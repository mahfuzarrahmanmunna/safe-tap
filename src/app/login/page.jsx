// pages/firebase-login.js
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGoogle,
  FaFacebook,
  FaExclamationTriangle,
  FaShieldAlt,
  FaUserPlus,
  FaArrowRight,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";
import Lottie from "lottie-react";
import loginAnimation from "../public/animations/login-animation.json";

const FirebaseLoginPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { 
    user, 
    loading, 
    error, 
    signInWithGoogle, 
    signInWithFacebook, 
    signOut 
  } = useFirebaseAuth();
  const isDark = theme === "dark";

  // Form states for traditional login
  const [formData, setFormData] = useState({
    email: "",
    pin: "",
    rememberMe: false,
  });
  
  const [showPin, setShowPin] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginLoading, setLoginLoading] = useState(false);
  const [useTraditionalLogin, setUseTraditionalLogin] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Handle input changes for traditional login
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
  };

  // Validate form for traditional login
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.pin) {
      newErrors.pin = "PIN is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle traditional form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoginLoading(true);

    try {
      // API call for traditional login
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const response = await axios.post(`${API_BASE_URL}/api/auth/login/`, {
        email: formData.email,
        pin: formData.pin,
      });

      if (response.data.access && response.data.refresh) {
        // Store tokens
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);

        // Set default authorization header for axios
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.access}`;

        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back. Redirecting to dashboard...",
          icon: "success",
          confirmButtonColor: "#0891b2",
          confirmButtonText: "Continue",
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          router.push("/dashboard");
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: "Login Error",
        text: error.response?.data?.error || "An error occurred during login.",
        icon: "error",
        confirmButtonColor: "#0891b2",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    
    if (result.success) {
      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back. Redirecting to dashboard...",
        icon: "success",
        confirmButtonColor: "#0891b2",
        confirmButtonText: "Continue",
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        router.push("/dashboard");
      });
    } else {
      Swal.fire({
        title: "Login Error",
        text: result.error,
        icon: "error",
        confirmButtonColor: "#0891b2",
      });
    }
  };

  // Handle Facebook sign-in
  const handleFacebookSignIn = async () => {
    const result = await signInWithFacebook();
    
    if (result.success) {
      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back. Redirecting to dashboard...",
        icon: "success",
        confirmButtonColor: "#0891b2",
        confirmButtonText: "Continue",
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        router.push("/dashboard");
      });
    } else {
      Swal.fire({
        title: "Login Error",
        text: result.error,
        icon: "error",
        confirmButtonColor: "#0891b2",
      });
    }
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

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
          className={`w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden ${
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
                  <Lottie
                    animationData={loginAnimation}
                    loop={true}
                    className="w-full h-auto"
                  />
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Welcome Back!
                  </h2>
                  <p className="text-white/80 text-center">
                    Sign in to your account to access your dashboard and manage
                    your services
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Login form */}
            <div className="md:w-3/5 p-8">
              <div className="max-w-md mx-auto">
                <h1
                  className={`text-2xl font-bold mb-6 ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  Sign In
                </h1>

                {!useTraditionalLogin ? (
                  // Social login buttons
                  <div className="space-y-4">
                    <button
                      onClick={handleGoogleSignIn}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-3 ${
                        isDark
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      }`}
                    >
                      <FaGoogle className="text-red-500" size={20} />
                      Continue with Google
                    </button>

                    <button
                      onClick={handleFacebookSignIn}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-3 ${
                        isDark
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      }`}
                    >
                      <FaFacebook className="text-blue-600" size={20} />
                      Continue with Facebook
                    </button>

                    <div className="relative my-6">
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

                    {/* Traditional login link */}
                    <div
                      className={`text-center ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <button
                        onClick={() => setUseTraditionalLogin(true)}
                        className="text-cyan-600 hover:underline font-medium flex items-center justify-center gap-1 w-full"
                      >
                        Sign in with email and PIN
                        <FaArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  // Traditional login form
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="Enter PIN"
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
                        {showPin ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                      </button>
                      {errors.pin && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <FaExclamationTriangle className="mr-1" size={10} />
                          {errors.pin}
                        </p>
                      )}
                    </div>

                    {/* Remember me */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          id="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <label
                          htmlFor="rememberMe"
                          className={`text-sm ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Remember me
                        </label>
                      </div>
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={loginLoading}
                      className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        loginLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-cyan-600 hover:bg-cyan-700 text-white"
                      }`}
                    >
                      {loginLoading ? (
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
                          Signing In...
                        </span>
                      ) : (
                        "Sign In"
                      )}
                    </button>

                    {/* Social login link */}
                    <div
                      className={`text-center ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <button
                        onClick={() => setUseTraditionalLogin(false)}
                        className="text-cyan-600 hover:underline font-medium flex items-center justify-center gap-1 w-full"
                      >
                        <FaArrowRight size={14} className="rotate-180" />
                        Back to social login
                      </button>
                    </div>
                  </form>
                )}

                {/* Register link */}
                <div
                  className={`mt-6 text-center ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Don't have an account?{" "}
                  <Link
                    href="/firebase-register"
                    className="text-cyan-600 hover:underline font-medium flex items-center justify-center gap-1"
                  >
                    <FaUserPlus size={14} />
                    Create Account
                  </Link>
                </div>

                {/* Security note */}
                <div
                  className={`mt-6 p-4 rounded-lg ${
                    isDark ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <FaShieldAlt
                      className={`mt-1 ${
                        isDark ? "text-cyan-400" : "text-cyan-600"
                      }`}
                      size={16}
                    />
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Secure Login
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Your login is protected with Firebase authentication. We never store your password.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default FirebaseLoginPage;