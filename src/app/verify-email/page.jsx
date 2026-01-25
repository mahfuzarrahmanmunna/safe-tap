// pages/verify-email.js
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/router";
import { useTheme } from "../contexts/ThemeContext";
import {
  FaEnvelope,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import Swal from "sweetalert2";

const VerifyEmailPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    const { email, token } = router.query;

    if (!email || !token) {
      setStatus("error");
      setMessage(
        "Invalid verification link. Please check your email and try again.",
      );
      return;
    }

    verifyEmail(email, token);
  }, [router.query]);

  const verifyEmail = async (email, token) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/verify-email/`,
        {
          email,
          token,
        },
      );

      if (response.data.access && response.data.refresh) {
        // Store tokens
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);

        // Show success message
        Swal.fire({
          title: "Email Verified!",
          text: "Your email has been verified successfully. You can now log in.",
          icon: "success",
          confirmButtonColor: "#0891b2",
          confirmButtonText: "Go to Login",
        }).then(() => {
          router.push("/login");
        });
      }

      setStatus("success");
      setMessage("Your email has been verified successfully!");
    } catch (error) {
      setStatus("error");
      setMessage(
        error.response?.data?.error ||
          "Failed to verify email. Please try again.",
      );
    }
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
          className={`w-full max-w-md rounded-2xl shadow-xl p-8 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="text-center">
            {status === "loading" && (
              <>
                <FaSpinner
                  className={`mx-auto h-16 w-16 animate-spin ${
                    isDark ? "text-cyan-400" : "text-cyan-600"
                  }`}
                />
                <h2
                  className={`mt-4 text-xl font-semibold ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  Verifying your email...
                </h2>
                <p
                  className={`mt-2 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Please wait while we verify your email address.
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <FaCheckCircle
                  className={`mx-auto h-16 w-16 ${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                />
                <h2
                  className={`mt-4 text-xl font-semibold ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  Email Verified!
                </h2>
                <p
                  className={`mt-2 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {message}
                </p>
                <button
                  onClick={() => router.push("/login")}
                  className={`mt-6 px-6 py-2 rounded-lg font-medium transition-colors ${
                    isDark
                      ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                      : "bg-cyan-600 hover:bg-cyan-700 text-white"
                  }`}
                >
                  Go to Login
                </button>
              </>
            )}

            {status === "error" && (
              <>
                <FaExclamationTriangle
                  className={`mx-auto h-16 w-16 ${
                    isDark ? "text-red-400" : "text-red-600"
                  }`}
                />
                <h2
                  className={`mt-4 text-xl font-semibold ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  Verification Failed
                </h2>
                <p
                  className={`mt-2 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {message}
                </p>
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => router.push("/login")}
                    className={`w-full px-6 py-2 rounded-lg font-medium transition-colors ${
                      isDark
                        ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                        : "bg-cyan-600 hover:bg-cyan-700 text-white"
                    }`}
                  >
                    Go to Login
                  </button>
                  <button
                    onClick={() => router.push("/register")}
                    className={`w-full px-6 py-2 rounded-lg font-medium transition-colors ${
                      isDark
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    Register Again
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default VerifyEmailPage;
