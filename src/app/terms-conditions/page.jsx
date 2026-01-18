"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaFileContract,
  FaArrowLeft,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const TermsConditions = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const terms = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using SafeTap, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.",
    },
    {
      title: "2. User Accounts",
      content:
        "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.",
    },
    {
      title: "3. Booking & Payments",
      content:
        "All bookings are subject to availability. We reserve the right to refuse or cancel any order for any reason at any time. Prices for our products are subject to change without notice.",
    },
    {
      title: "4. User Conduct",
      content:
        "You agree not to use the service for any unlawful purpose, to solicit others to perform or participate in any unlawful acts, or to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.",
    },
    {
      title: "5. Intellectual Property",
      content:
        "The Service and its original content, features, and functionality are and will remain the exclusive property of SafeTap and its licensors. The Service is protected by copyright, trademark, and other laws.",
    },
    {
      title: "6. Termination",
      content:
        "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation.",
    },
    {
      title: "7. Limitation of Liability",
      content:
        "In no event shall SafeTap, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages.",
    },
  ];

  return (
    <div
      className={`min-h-screen ${isDark ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            href="/"
            className={`inline-flex items-center mb-6 text-sm font-medium transition-colors ${
              isDark
                ? "text-cyan-400 hover:text-cyan-300"
                : "text-cyan-600 hover:text-cyan-700"
            }`}
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>

          <div className="flex items-center space-x-4">
            <div
              className={`p-4 rounded-full ${
                isDark
                  ? "bg-gray-800 text-cyan-400"
                  : "bg-white text-cyan-600 shadow-md"
              }`}
            >
              <FaFileContract size={32} />
            </div>
            <div>
              <h1
                className={`text-3xl md:text-4xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Terms & Conditions
              </h1>
              <p
                className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Effective Date: October 2023
              </p>
            </div>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`p-6 rounded-2xl mb-8 border-l-4 border-cyan-600 ${
            isDark
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <p
            className={
              isDark
                ? "text-gray-300 leading-relaxed"
                : "text-gray-700 leading-relaxed"
            }
          >
            Welcome to <span className="font-bold text-cyan-600">SafeTap</span>.
            These terms and conditions outline the rules and regulations for the
            use of our Website and Services.
          </p>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {terms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-6 rounded-xl border ${
                isDark
                  ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                  : "bg-white border-gray-200 hover:shadow-md"
              } transition-all duration-300`}
            >
              <h3
                className={`text-lg font-bold mb-3 flex items-center ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                <FaExclamationCircle
                  className="mr-2 text-amber-500"
                  size={20}
                />
                {term.title}
              </h3>
              <p
                className={
                  isDark
                    ? "text-gray-400 leading-relaxed"
                    : "text-gray-600 leading-relaxed"
                }
              >
                {term.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer / Agreement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={`mt-12 p-8 rounded-2xl text-center ${
            isDark ? "bg-gray-800" : "bg-white shadow-lg"
          }`}
        >
          <div className="flex justify-center mb-4">
            <div
              className={`p-3 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <FaCheckCircle className="text-green-500" size={40} />
            </div>
          </div>
          <h4
            className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            By using our services, you agree to these terms.
          </h4>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Please read them carefully to ensure you understand your rights and
            obligations.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default TermsConditions;
