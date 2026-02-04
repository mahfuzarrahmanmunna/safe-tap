import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  LogOut,
  ArrowRight,
  X,
  Settings,
  Headphones,
  CreditCard,
  History,
  FileText
} from "lucide-react";
import { useRouter } from "next/navigation";

const ProfileModal = ({ isOpen, onClose, theme, userProfile, onLogout }) => {
  const modalRef = useRef(null);
  const router = useRouter();

  // Get user role safely
  const userRole = userProfile?.profile?.role || userProfile?.role || null;
  const userId = userProfile?.id || null;
  const isCustomer = userRole === "customer";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const navigateToDashboard = () => {
    router.push("/admin-dashboard");
    onClose();
  };

  const navigateToProfile = () => {
    router.push(`/profile/${userId}`);
    onClose();
  };

  const navigateToSupport = () => {
    router.push(`/support/${userId}`);
    onClose();
  };

  const navigateToOrders = () => {
    router.push(`/orders/${userId}`);
    onClose();
  };

  const navigateToPayments = () => {
    router.push(`/payment/${userId}`);
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  if (!isOpen) return null;

  // Get role display name
  const getRoleDisplayName = (role) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "servicer":
        return "Service Provider";
      case "customer":
        return "Customer";
      default:
        return "User";
    }
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!userProfile) return "User";
    return userProfile.first_name || userProfile.username || "User";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 ${theme === "dark" ? "bg-black/70" : "bg-cyan-900/50"
              } backdrop-blur-sm z-50`}
          />
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed top-20 right-4 ${theme === "dark" ? "bg-gray-800/90" : "bg-white/90"
              } backdrop-blur-lg rounded-xl shadow-2xl w-80 border ${theme === "dark" ? "border-gray-700/50" : "border-cyan-200/50"
              } overflow-hidden z-50`}
          >
            <div
              className={`bg-gradient-to-r ${theme === "dark"
                ? "from-cyan-700/90 to-cyan-600/90"
                : "from-cyan-700 to-cyan-600"
                } text-white p-4 flex justify-between items-center`}
            >
              <h2 className="text-lg font-bold">Profile</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${theme === "dark"
                    ? "from-cyan-600 to-cyan-500"
                    : "from-cyan-700 to-cyan-600"
                    } flex items-center justify-center text-white font-bold text-lg`}
                >
                  {userProfile?.first_name?.charAt(0) ||
                    userProfile?.username?.charAt(0) ||
                    "U"}
                </div>
                <div>
                  <h3
                    className={`font-semibold ${theme === "dark" ? "text-gray-100" : "text-cyan-900"
                      }`}
                  >
                    {getUserDisplayName()}
                  </h3>
                  <p
                    className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-cyan-600"
                      }`}
                  >
                    {getRoleDisplayName(userRole)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {/* Dashboard - Only show for non-customer users */}
                {!isCustomer && (
                  <button
                    onClick={navigateToDashboard}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${theme === "dark"
                      ? "hover:bg-gray-700/50"
                      : "hover:bg-cyan-50/50"
                      } transition-colors`}
                  >
                    <User className="w-4 h-4 text-cyan-500" />
                    <span
                      className={
                        theme === "dark" ? "text-gray-200" : "text-cyan-900"
                      }
                    >
                      Dashboard
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto text-cyan-400" />
                  </button>
                )}

                {/* Profile Settings - For all users */}
                <button
                  onClick={navigateToProfile}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${theme === "dark"
                    ? "hover:bg-gray-700/50"
                    : "hover:bg-cyan-50/50"
                    } transition-colors`}
                >
                  <Settings className="w-4 h-4 text-cyan-500" />
                  <span
                    className={
                      theme === "dark" ? "text-gray-200" : "text-cyan-900"
                    }
                  >
                    Profile Settings
                  </span>
                  <ArrowRight className="w-4 h-4 ml-auto text-cyan-400" />
                </button>

                {/* Support - For all users */}
                <button
                  onClick={navigateToSupport}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${theme === "dark"
                    ? "hover:bg-gray-700/50"
                    : "hover:bg-cyan-50/50"
                    } transition-colors`}
                >
                  <Headphones className="w-4 h-4 text-cyan-500" />
                  <span
                    className={
                      theme === "dark" ? "text-gray-200" : "text-cyan-900"
                    }
                  >
                    Support
                  </span>
                  <ArrowRight className="w-4 h-4 ml-auto text-cyan-400" />
                </button>

                {/* Order History - For customers */}
                {isCustomer && (
                  <button
                    onClick={navigateToOrders}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${theme === "dark"
                      ? "hover:bg-gray-700/50"
                      : "hover:bg-cyan-50/50"
                      } transition-colors`}
                  >
                    <History className="w-4 h-4 text-cyan-500" />
                    <span
                      className={
                        theme === "dark" ? "text-gray-200" : "text-cyan-900"
                      }
                    >
                      Order History
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto text-cyan-400" />
                  </button>
                )}

                {/* Payment Methods - For customers */}
                {isCustomer && (
                  <button
                    onClick={navigateToPayments}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${theme === "dark"
                      ? "hover:bg-gray-700/50"
                      : "hover:bg-cyan-50/50"
                      } transition-colors`}
                  >
                    <CreditCard className="w-4 h-4 text-cyan-500" />
                    <span
                      className={
                        theme === "dark" ? "text-gray-200" : "text-cyan-900"
                      }
                    >
                      Payment Methods
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto text-cyan-400" />
                  </button>
                )}

                {/* Terms & Conditions - For all users */}
                <button
                  onClick={() => {
                    router.push("/terms");
                    onClose();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${theme === "dark"
                    ? "hover:bg-gray-700/50"
                    : "hover:bg-cyan-50/50"
                    } transition-colors`}
                >
                  <FileText className="w-4 h-4 text-cyan-500" />
                  <span
                    className={
                      theme === "dark" ? "text-gray-200" : "text-cyan-900"
                    }
                  >
                    Terms & Conditions
                  </span>
                  <ArrowRight className="w-4 h-4 ml-auto text-cyan-400" />
                </button>

                {/* Logout - For all users */}
                <button
                  onClick={handleLogout}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${theme === "dark"
                    ? "hover:bg-gray-700/50"
                    : "hover:bg-cyan-50/50"
                    } transition-colors`}
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span
                    className={
                      theme === "dark" ? "text-gray-200" : "text-cyan-900"
                    }
                  >
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;