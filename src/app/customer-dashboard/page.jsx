"use client";
import React, { useState } from "react";
import { motion } from "framer-motion"; // Added for animations
import {
  Droplet,
  ShoppingCart,
  Calendar,
  Wrench,
  Sun,
  Moon,
  Bell,
  Menu,
  X,
  Star,
  CheckCircle,
  Activity,
  AlertTriangle,
  ChevronRight,
  Zap,
  MoreHorizontal,
} from "lucide-react"; // Keeping Lucide for consistency in dashboard
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext"; // Assuming you have this context

const CustomerDashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample Data
  const products = [
    {
      id: 1,
      name: "AquaPure RO 1000",
      category: "Water Purifier",
      price: "$299",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&q=80",
    },
    {
      id: 2,
      name: "Copper+ Alkaline Filter",
      category: "Replacement Filter",
      price: "$45",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1602143407151-011141950038?w=500&q=80",
    },
    {
      id: 3,
      name: "Tabletop Dispenser",
      category: "Dispenser",
      price: "$120",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1564419320461-6870880221ad?w=500&q=80",
    },
    {
      id: 4,
      name: "UV Chamber Unit",
      category: "Accessories",
      price: "$85",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1585339016625-29e4d9333727?w=500&q=80",
    },
  ];

  const serviceStatus = {
    nextService: "Oct 25, 2023",
    filterLife: 85,
    tdsLevel: "45 ppm",
    pHLevel: "7.4",
  };

  // Animation variants for staggered entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={`md:hidden overflow-hidden border-b backdrop-blur-xl ${
            isDark
              ? "bg-gray-900/95 border-gray-800"
              : "bg-white/95 border-gray-200"
          }`}
        >
          <div className="flex flex-col p-6 space-y-4">
            <Link
              href="/"
              className={`text-lg font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-lg font-medium text-cyan-600"
            >
              Dashboard
            </Link>
            <Link
              href="/shop"
              className={`text-lg font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Shop
            </Link>
            <Link
              href="/profile"
              className={`text-lg font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Profile
            </Link>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Welcome Header - Styled like Login Header */}
          <motion.div variants={itemVariants} className="mb-10">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Welcome back, Alex! 👋
            </h2>
            <p
              className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              Your water quality is excellent today.
            </p>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Status & Products */}
            <div className="lg:col-span-2 space-y-8">
              {/* Water Status Card - Premium Glassmorphism */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className={`rounded-3xl p-8 shadow-2xl relative overflow-hidden border transition-all duration-300 ${
                  isDark
                    ? "bg-gray-800 border-gray-700 shadow-cyan-900/20"
                    : "bg-white border-gray-100 shadow-cyan-100/20"
                }`}
              >
                {/* Background Gradient Blob */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10">
                  <div>
                    <h3
                      className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Purifier Status
                    </h3>
                    <p
                      className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Last checked: Just now
                    </p>
                  </div>
                  <div
                    className={`mt-4 md:mt-0 px-6 py-2.5 rounded-full flex items-center space-x-2 border shadow-sm transition-all ${
                      serviceStatus.filterLife > 50
                        ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                        : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-bold">
                      {serviceStatus.filterLife}% Filter Life
                    </span>
                  </div>
                </div>

                {/* Quality Metrics */}
                <div className="grid grid-cols-2 gap-6 relative z-10">
                  <div
                    className={`p-6 rounded-2xl border transition-colors group hover:border-cyan-500/50 ${
                      isDark
                        ? "border-gray-700 bg-gray-700/50"
                        : "border-gray-100 bg-gray-50"
                    }`}
                  >
                    <p
                      className={`text-xs font-bold uppercase mb-2 tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      TDS Level
                    </p>
                    <div className="flex items-baseline">
                      <p
                        className={`text-3xl font-bold ${isDark ? "text-cyan-400" : "text-cyan-600"}`}
                      >
                        {serviceStatus.tdsLevel}
                      </p>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Safe to drink
                    </div>
                  </div>
                  <div
                    className={`p-6 rounded-2xl border transition-colors group hover:border-purple-500/50 ${
                      isDark
                        ? "border-gray-700 bg-gray-700/50"
                        : "border-gray-100 bg-gray-50"
                    }`}
                  >
                    <p
                      className={`text-xs font-bold uppercase mb-2 tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      pH Level
                    </p>
                    <div className="flex items-baseline">
                      <p
                        className={`text-3xl font-bold ${isDark ? "text-purple-400" : "text-purple-600"}`}
                      >
                        {serviceStatus.pHLevel}
                      </p>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
                      <Activity className="w-3 h-3 mr-1" />
                      Balanced
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Shop / Products Section */}
              <motion.div variants={itemVariants}>
                <div className="flex justify-between items-end mb-6">
                  <h3
                    className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Recommended Products
                  </h3>
                  <Link
                    href="/shop"
                    className="text-cyan-600 hover:text-cyan-700 text-sm font-semibold flex items-center group"
                  >
                    View All{" "}
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 group ${
                        isDark
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-100"
                      }`}
                    >
                      <div className="h-56 overflow-hidden relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold flex items-center shadow-lg">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1.5" />
                          {product.rating}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <button className="w-full bg-white/90 backdrop-blur text-gray-900 py-2 rounded-lg font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            View Details
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-xs text-cyan-600 font-semibold uppercase tracking-wider mb-2">
                          {product.category}
                        </p>
                        <h4
                          className={`font-bold text-xl mb-3 ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          {product.name}
                        </h4>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {product.price}
                          </span>
                          <button
                            className={`p-3 rounded-xl shadow-md transition-all hover:scale-110 ${
                              isDark
                                ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                                : "bg-cyan-500 hover:bg-cyan-600 text-white"
                            }`}
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Upcoming & Quick Actions */}
            <div className="space-y-8">
              {/* Next Service Card - Modern Gradient Style */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={`rounded-3xl p-6 shadow-xl border-l-8 border-blue-500 relative overflow-hidden ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
              >
                {/* Decoration */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>

                <div className="flex items-center space-x-4 mb-6 relative z-10">
                  <div
                    className={`p-3 rounded-2xl ${
                      isDark
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4
                      className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Next Service
                    </h4>
                    <p
                      className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Filter Replacement
                    </p>
                  </div>
                </div>
                <div
                  className={`rounded-2xl p-6 mb-6 text-center relative overflow-hidden ${
                    isDark ? "bg-gray-700/50" : "bg-blue-50"
                  }`}
                >
                  <div className="absolute inset-0 bg-blue-500/5"></div>
                  <p
                    className={`text-4xl font-bold relative z-10 ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {serviceStatus.nextService}
                  </p>
                </div>
                <button className="w-full py-3 rounded-xl font-bold transition-all duration-300 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  Reschedule
                </button>
              </motion.div>

              {/* Request Service - Call to Action */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={`rounded-3xl p-8 shadow-xl text-white relative overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600`}
              >
                <div className="absolute -right-10 -bottom-10 opacity-20">
                  <Wrench className="w-48 h-48 transform -rotate-12" />
                </div>
                <h3 className="text-2xl font-bold mb-2 relative z-10">
                  Need Support?
                </h3>
                <p className="text-blue-100 text-sm mb-8 relative z-10 leading-relaxed">
                  Facing water pressure issues or bad taste? Book a technician
                  visit now.
                </p>
                <button className="w-full bg-white text-blue-600 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl relative z-10 flex items-center justify-center group">
                  Request Technician
                  <Zap className="w-4 h-4 ml-2 group-hover:animate-pulse" />
                </button>
              </motion.div>

              {/* Recent History - Minimalist List */}
              <motion.div
                variants={itemVariants}
                className={`rounded-3xl p-6 shadow-xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
              >
                <h4
                  className={`font-bold mb-6 text-lg ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Recent Activity
                </h4>
                <div className="space-y-6">
                  {[
                    {
                      title: "Filter Installed",
                      time: "2 days ago",
                      color: "bg-green-500",
                    },
                    {
                      title: "Annual Subscription Paid",
                      time: "1 week ago",
                      color: "bg-blue-500",
                    },
                    {
                      title: "Maintenance Checkup",
                      time: "2 weeks ago",
                      color: "bg-yellow-500",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-4 group cursor-pointer"
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-sm shadow-${item.color}/50 group-hover:scale-125 transition-transform`}
                      ></div>
                      <div className="flex-1 border-b border-gray-100 dark:border-gray-700/50 pb-4 last:border-0 last:pb-0">
                        <p
                          className={`text-sm font-medium ${isDark ? "text-gray-200 group-hover:text-white" : "text-gray-800 group-hover:text-gray-900"}`}
                        >
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.time}
                        </p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-cyan-500">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
