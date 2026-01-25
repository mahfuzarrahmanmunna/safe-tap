// components/layout/DashboardLayout.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import {
  FaTachometerAlt,
  FaChartBar,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaExclamation,
} from "react-icons/fa";
import Link from "next/link";
import { useTheme } from "../../contexts/ThemeContext";

const DashboardLayout = ({ children, title, userRole }) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProfileClick = () => {
    if (userRole === "customer") {
      router.push("/customer-dashboard/my-dashboard");
    } else if (userRole === "technician") {
      router.push("/technicians-dashboard/my-dashboard");
    } else if (userRole === "admin") {
      router.push("/admin-dashboard/my-dashboard");
    }
  };

  return (
    <div className={`flex h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 h-full transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isDark ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="flex flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <h2
              className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}
            >
              <span className="text-cyan-600">Safe</span>
              <span className={isDark ? "text-white" : "text-gray-800"}>
                Tap
              </span>
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex-col py-4 px-3">
            <Link
              href={`/${userRole}-dashboard/my-dashboard`}
              className={`flex items-center px-3 py-2 rounded-lg mb-1 transition-colors ${
                isDark
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaTachometerAlt
                className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              />
              <span
                className={`ml-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Dashboard
              </span>
            </Link>

            <Link
              href={`/${userRole}-dashboard/analytics`}
              className={`flex items-center px-3 py-2 rounded-lg mb-1 transition-colors ${
                isDark
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaChartBar
                className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              />
              <span
                className={`ml-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Analytics
              </span>
            </Link>

            <Link
              href={`/${userRole}-dashboard/settings`}
              className={`flex items-center px-3 py-2 rounded-lg mb-1 transition-colors ${
                isDark
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaCog
                className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              />
              <span
                className={`ml-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Settings
              </span>
            </Link>

            <Link
              href={`/${userRole}-dashboard/help`}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                isDark
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FaExclamation
                className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              />
              <span
                className={`ml-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Help
              </span>
            </Link>
          </nav>
        </div>

        {/* User Profile */}
        <div className="mt-auto p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center text-sm p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
              >
                <FaUserCircle
                  className={`w-8 h-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                />
                <span
                  className={`ml-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  {user?.first_name || user?.username || "User"}
                </span>
                <FaTimes
                  className={`ml-auto ${isDark ? "text-gray-400" : "text-gray-500"}`}
                />
              </button>
            </div>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                  isDark ? "bg-gray-800" : "bg-white"
                } border border-gray-200`}
              >
                <Link
                  href={`/${userRole}-dashboard/my-dashboard`}
                  className={`block px-4 py-2 text-sm ${isDark ? "text-gray-300" : "text-gray-700"} hover:bg-gray-100`}
                >
                  My Dashboard
                </Link>
                <Link
                  href={`/${userRole}-dashboard/settings`}
                  className={`block px-4 py-2 text-sm ${isDark ? "text-gray-300" : "text-gray-700"} hover:bg-gray-100`}
                >
                  Settings
                </Link>
                <hr
                  className={`my-1 ${isDark ? "border-gray-700" : "border-gray-200"}`}
                />
                <button
                  onClick={handleLogout}
                  className={`block w-full text-left px-4 py-2 text-sm ${isDark ? "text-gray-300" : "text-gray-700"} hover:bg-gray-100`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden ${
          sidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {/* Top Header */}
        <header
          className={`sticky top-0 z-20 ${
            isDark ? "bg-gray-800" : "bg-white"
          } shadow-sm`}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-md ${
                isDark
                  ? "text-gray-400 hover:bg-gray-700"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {sidebarOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>

            <h1
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              {title}
            </h1>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`relative p-1 rounded-full ${
                  isDark
                    ? "text-gray-400 hover:bg-gray-700"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <FaCog className="text-lg" />
              </button>

              {/* Notification Bell */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`relative p-1 rounded-full ${
                  isDark
                    ? "text-gray-400 hover:bg-gray-700"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <span className="absolute top-0 right-0 -mt-1 h-2 w-2 bg-red-500 rounded-full"></span>
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              className={`absolute right-4 top-12 w-48 rounded-md shadow-lg py-1 ${
                isDark ? "bg-gray-800" : "bg-white"
              } border border-gray-200`}
            >
              <Link
                href={`/${userRole}-dashboard/settings`}
                className={`block px-4 py-2 text-sm ${isDark ? "text-gray-300" : "text-gray-700"} hover:bg-gray-100`}
              >
                Settings
              </Link>
              <hr
                className={`my-1 ${isDark ? "border-gray-700" : "border-gray-200"}`}
              />
              <button
                onClick={handleLogout}
                className={`block w-full text-left px-4 py-2 text-sm ${isDark ? "text-gray-300" : "text-gray-700"} hover:bg-gray-100`}
              >
                Logout
              </button>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
