"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Droplet,
  Home,
  Info,
  Package,
  Wrench,
  FileText,
  Contact,
  Facebook,
  Youtube,
  Linkedin,
  Clock,
  Filter,
  Users,
  TestTube,
  Sparkles,
  Sun,
  Moon,
  ArrowRight,
  MapPin,
  Shield,
  Star,
  Search,
  Headphones,
  User,
  LogOut,
} from "lucide-react";
import { Target } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { usePathname, useRouter } from "next/navigation";
import ServiceModal from "../ServiceModal";
import { useAuth } from "@/app/contexts/AuthContext";

/* ------------------ DATA ------------------ */
const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  {
    name: "About Us",
    href: "/pages/about-us",
    icon: Info,
    dropdown: [
      { name: "Our Story", href: "/about/story", icon: FileText },
      { name: "Our Team", href: "/about/team", icon: Users },
      { name: "Mission & Vision", href: "/about/mission", icon: Target },
      { name: "Technology", href: "/about/technology", icon: Sparkles },
    ],
  },
  { name: "Products", href: "/products", icon: Package, isModal: true },
  { name: "Services", onClick: () => null, icon: Wrench }, // Will be updated dynamically
  { name: "Blog", href: "pages/blogs", icon: FileText },
  { name: "Contact", href: "/pages/contact", icon: Contact },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "Youtube" },
  { icon: Linkedin, href: "#", label: "Linkedin" },
];

// Bangladesh cities for the modal
const bangladeshCities = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Sylhet",
  "Barishal",
  "Rangpur",
  "Mymensingh",
  "Comilla",
  "Narayanganj",
  "Other City",
];

// Product types for water purifiers
const productTypes = [
  {
    name: "SafeTap Copper",
    icon: Droplet,
    description: "Infused with copper benefits",
  },
  { name: "SafeTap Alkaline", icon: Droplet, description: "Balanced pH water" },
  {
    name: "SafeTap RO+",
    icon: Droplet,
    description: "Essential minerals added",
  },
  {
    name: "SafeTap Under The Sink",
    icon: Droplet,
    description: "Vitamin enriched water",
  },
  { name: "SafeTap UV", icon: Droplet, description: "Advanced filtration" },
];

// Search suggestions for autocomplete
const searchSuggestions = [
  "Water Purifier Subscription",
  "Smart Water Purifier",
  "Alkaline Water Benefits",
  "Water Quality Testing",
  "Installation Service",
  "Filter Replacement",
  "Water Purifier Plans",
  "Mobile App Features",
];

// Product Modal Component
const ProductModal = ({ isOpen, onClose, theme }) => {
  const router = useRouter();
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const handleCityClick = (city) => {
    const slug = city.toLowerCase().replace(/\s+/g, "-");
    router.push(`/products/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 ${
              theme === "dark" ? "bg-black/70" : "bg-cyan-900/50"
            } backdrop-blur-sm z-50 flex items-center justify-center p-4`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`${
                theme === "dark" ? "bg-gray-800/90" : "bg-white/90"
              } backdrop-blur-lg rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto border ${
                theme === "dark" ? "border-cyan-700/30" : "border-cyan-200/50"
              }`}
            >
              <div
                className={`bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-cyan-700/90 to-cyan-600/90"
                    : "from-cyan-700 to-cyan-600"
                } text-white p-6 flex justify-between items-center backdrop-blur-lg`}
              >
                <h2 className="text-2xl font-bold">
                  Choose Your Water Purifier
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 grid md:grid-cols-2 gap-8">
                {/* Products Column */}
                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-gray-100" : "text-cyan-900"
                    } mb-4 flex items-center`}
                  >
                    <Package className="w-5 h-5 mr-2 text-cyan-500" />
                    Our Smart Purifiers
                  </h3>
                  <div className="space-y-2">
                    {productTypes.map((product, index) => (
                      <motion.div
                        key={product.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`p-3 rounded-lg ${
                          theme === "dark"
                            ? "hover:bg-gray-700/50"
                            : "hover:bg-cyan-50/50"
                        } cursor-pointer transition-all duration-200 border-l-2 border-transparent hover:border-cyan-500 group backdrop-blur-sm`}
                      >
                        <div className="flex items-center space-x-3">
                          <product.icon className="w-5 h-5 text-cyan-500 group-hover:text-cyan-600" />
                          <div className="flex-1">
                            <span
                              className={`font-medium ${
                                theme === "dark"
                                  ? "text-gray-100 group-hover:text-white"
                                  : "text-cyan-700 group-hover:text-cyan-900"
                              } block`}
                            >
                              {product.name}
                            </span>
                            <span
                              className={`text-xs ${
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              {product.description}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Cities Column */}
                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-gray-100" : "text-cyan-900"
                    } mb-4 flex items-center`}
                  >
                    <MapPin className="w-5 h-5 mr-2 text-cyan-500" />
                    Select Your City
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {bangladeshCities.map((city, index) => (
                      <motion.div
                        key={city}
                        onClick={() => handleCityClick(city)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`p-3 rounded-lg ${
                          theme === "dark"
                            ? "hover:bg-gray-700/50 border-gray-600/50"
                            : "hover:bg-cyan-50/50 border-cyan-200/50"
                        } cursor-pointer transition-all duration-200 border ${
                          theme === "dark"
                            ? "border-gray-600/50"
                            : "border-cyan-200/50"
                        } hover:border-cyan-500 text-center backdrop-blur-sm`}
                      >
                        <span
                          className={`font-medium ${
                            theme === "dark"
                              ? "text-gray-100 hover:text-white"
                              : "text-cyan-700 hover:text-cyan-900"
                          }`}
                        >
                          {city}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`${
                  theme === "dark" ? "bg-gray-700/50" : "bg-cyan-50/50"
                } p-4 flex justify-between items-center backdrop-blur-sm border-t ${
                  theme === "dark" ? "border-gray-600/50" : "border-cyan-200/50"
                }`}
              >
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-200" : "text-cyan-700"
                  }`}
                >
                  Get pure, healthy water at your fingertips
                </p>
                <button
                  onClick={onClose}
                  className={`px-4 py-2 ${
                    theme === "dark"
                      ? "bg-cyan-600/80 hover:bg-cyan-500/80"
                      : "bg-gradient-to-r from-cyan-700 to-cyan-600 hover:from-cyan-600 hover:to-cyan-500"
                  } text-white font-medium rounded-lg transition-all duration-300 backdrop-blur-sm`}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Theme Toggle Component - Enhanced for mobile
const ThemeToggle = ({ theme, toggleTheme, size = "default" }) => {
  const isSmall = size === "small";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className={`relative ${
        isSmall ? "w-12 h-6" : "w-14 h-7"
      } rounded-full p-1 transition-colors duration-500 focus:outline-none cursor-pointer overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-700 to-gray-900"
          : "bg-gradient-to-r from-cyan-200 to-cyan-400"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          boxShadow:
            theme === "dark"
              ? "0 0 20px rgba(6, 182, 212, 0.5)"
              : "0 0 20px rgba(6, 182, 212, 0.5)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Toggle track with animated dots */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <AnimatePresence>
          {theme === "light" && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex space-x-1"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`${
                    isSmall ? "w-0.5 h-0.5" : "w-1 h-1"
                  } bg-cyan-600 rounded-full`}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: [0, -2, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    repeatType: "loop",
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {theme === "dark" && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex space-x-1"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`${
                    isSmall ? "w-0.5 h-0.5" : "w-1 h-1"
                  } bg-cyan-300 rounded-full`}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: [0, -2, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    repeatType: "loop",
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button with icon */}
      <motion.div
        className={`absolute top-1 ${theme === "dark" ? "right-1" : "left-1"} ${
          isSmall ? "w-4 h-4" : "w-5 h-5"
        } rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-none`}
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
          duration: 0.5,
        }}
      >
        <AnimatePresence mode="wait">
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Moon
                className={`${isSmall ? "w-3 h-3" : "w-4 h-4"} text-cyan-700`}
              />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Sun
                className={`${isSmall ? "w-3 h-3" : "w-4 h-4"} text-cyan-500`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Ripple effect on click */}
      <motion.span
        className="absolute inset-0 rounded-full bg-white opacity-0"
        initial={false}
        animate={{ scale: [0, 4], opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </motion.button>
  );
};

// Simple Theme Toggle for Mobile Menu (Text-based)
const MobileThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`w-full p-4 rounded-lg ${
        theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-cyan-50/50"
      } transition-colors font-semibold ${
        theme === "dark" ? "text-gray-200" : "text-cyan-700"
      } flex items-center justify-between backdrop-blur-sm`}
    >
      <div className="flex items-center space-x-2">
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-cyan-400" />
        ) : (
          <Moon className="w-5 h-5 text-cyan-600" />
        )}
        <span>Switch to {theme === "dark" ? "Light" : "Dark"} Mode</span>
      </div>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} size="small" />
    </button>
  );
};

// User Dropdown Component
const UserDropdown = ({ theme, userName, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  const navigateToDashboard = () => {
    router.push("/dashboard");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 ${
          theme === "dark"
            ? "text-gray-200 hover:text-white"
            : "text-cyan-700 hover:text-cyan-900"
        } transition-colors p-2 rounded-lg ${
          theme === "dark" ? "hover:bg-gray-800/50" : "hover:bg-cyan-50/50"
        } backdrop-blur-sm`}
      >
        <div
          className={`w-8 h-8 rounded-full bg-gradient-to-r ${
            theme === "dark"
              ? "from-cyan-600 to-cyan-500"
              : "from-cyan-700 to-cyan-600"
          } flex items-center justify-center text-white font-semibold`}
        >
          {userName ? userName.charAt(0).toUpperCase() : "U"}
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-0 mt-2 w-48 ${
              theme === "dark" ? "bg-gray-800/90" : "bg-white/90"
            } backdrop-blur-lg rounded-xl shadow-2xl border ${
              theme === "dark" ? "border-gray-700/50" : "border-cyan-200/50"
            } overflow-hidden z-50`}
          >
            <div
              className={`p-3 border-b ${
                theme === "dark" ? "border-gray-700/50" : "border-cyan-200/50"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-200" : "text-cyan-900"
                }`}
              >
                Welcome, {userName}
              </p>
            </div>
            <button
              onClick={navigateToDashboard}
              className={`w-full text-left px-4 py-3 flex items-center space-x-3 ${
                theme === "dark"
                  ? "hover:bg-gray-700/50"
                  : "hover:bg-cyan-50/50"
              } transition-colors`}
            >
              <User className="w-4 h-4 text-cyan-500" />
              <span
                className={theme === "dark" ? "text-gray-200" : "text-cyan-900"}
              >
                Dashboard
              </span>
            </button>
            <button
              onClick={handleLogout}
              className={`w-full text-left px-4 py-3 flex items-center space-x-3 ${
                theme === "dark"
                  ? "hover:bg-gray-700/50"
                  : "hover:bg-cyan-50/50"
              } transition-colors`}
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span
                className={theme === "dark" ? "text-gray-200" : "text-cyan-900"}
              >
                Logout
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth(); // Use the logout function from AuthContext
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [showQuickContact, setShowQuickContact] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const pathname = usePathname();
  const searchInputRef = useRef(null);
  const quickContactRef = useRef(null);
  const dropdownRefs = useRef({});
  const router = useRouter();

  const isCommercial = pathname === "/commercial";

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      // Check for token in localStorage
      const token = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");

      if (token && user) {
        try {
          const userData = JSON.parse(user);
          setIsLoggedIn(true);
          setUserName(userData.first_name || userData.username || "User");
        } catch (error) {
          console.error("Error parsing user data:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (in case user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Update navigationItems to include the correct onClick for Services
  const updatedNavigationItems = navigationItems.map((item) => {
    if (item.name === "Services") {
      return { ...item, onClick: () => setIsServiceModalOpen(true) };
    }
    return item;
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = searchSuggestions.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchQuery]);

  const handleDropdownToggle = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
    setActiveNavItem(itemName);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1,
      );
    } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
      e.preventDefault();
      setSearchQuery(filteredSuggestions[selectedSuggestionIndex]);
      setFilteredSuggestions([]);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleLogout = () => {
    // Use the logout function from AuthContext
    logout();

    // Update local state
    setIsLoggedIn(false);
    setUserName("");

    // Redirect to home page
    router.push("/");
  };

  return (
    <>
      {/* Top Contact Bar - Updated for Bangladesh Water Purification Service */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`hidden lg:block ${
          theme === "dark"
            ? "bg-gradient-to-r from-gray-800/90 to-gray-700/90"
            : "bg-gradient-to-r from-cyan-700/90 to-cyan-600/90"
        } text-white text-sm py-3 shadow-md transition-all duration-500 backdrop-blur-lg ${
          scrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <a
                href="tel:+880 1919 222 222"
                className="flex items-center space-x-2 text-cyan-100 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>+880 1919 222 222</span>
              </a>
              <a
                href="mailto:info@SafeTapbd.com"
                className="flex items-center space-x-2 text-cyan-100 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>info@SafeTapbd.com</span>
              </a>
              <div className="flex items-center space-x-2 text-cyan-100">
                <MapPin className="w-4 h-4" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-xs text-white font-medium">
                  ISO 9001 : 2015 Certified
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <Star className="w-4 h-4 text-white" />
                <span className="text-xs text-white font-medium">
                  50,000+ Happy Customers
                </span>
              </div>
              <div className="flex items-center space-x-3 border-l border-cyan-400 pl-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-cyan-100 hover:text-white transition-colors hover:scale-110 transform"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`transition-all duration-500 z-50 ${
          scrolled
            ? `fixed top-0 left-0 right-0 ${
                theme === "dark" ? "bg-gray-900/95" : "bg-white/95"
              } backdrop-blur-lg border-b ${
                theme === "dark" ? "border-gray-700/50" : "border-cyan-200/50"
              } py-2`
            : `relative ${
                theme === "dark" ? "bg-gray-900/90" : "bg-white/90"
              } backdrop-blur-sm border-b ${
                theme === "dark" ? "border-gray-800/50" : "border-cyan-100/50"
              }`
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center ${
              scrolled ? "h-16" : "h-20 lg:h-24"
            } transition-all duration-300`}
          >
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div
                className={`bg-gradient-to-br ${
                  theme === "dark"
                    ? "from-cyan-700 to-cyan-600"
                    : "from-cyan-700 to-cyan-600"
                } rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-xl ${
                  scrolled ? "w-10 h-10" : "w-12 h-12 lg:w-14 lg:h-14"
                } backdrop-blur-sm`}
              >
                <Droplet
                  className={`${
                    scrolled ? "w-5 h-5" : "w-7 h-7 lg:w-8 lg:h-8"
                  } text-white group-hover:scale-110 transition-transform`}
                  fill="currentColor"
                />
              </div>
              <div>
                <h1
                  className={`${
                    scrolled ? "text-lg" : "text-xl lg:text-2xl"
                  } font-bold bg-gradient-to-r ${
                    theme === "dark"
                      ? "from-cyan-400 to-cyan-300"
                      : "from-cyan-700 to-cyan-600"
                  } bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:from-cyan-600 group-hover:to-cyan-500`}
                >
                  SafeTap
                </h1>
                <p
                  className={`${
                    scrolled
                      ? "hidden"
                      : `text-xs ${
                          theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                        } font-medium hidden sm:block`
                  }`}
                >
                  Pure Water, Smart Subscription
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {updatedNavigationItems.map((item) => {
                if (item.isModal) {
                  return (
                    <button
                      key={item.name}
                      onClick={() => setShowProductModal(true)}
                      className={`flex items-center space-x-1 ${
                        scrolled ? "px-3 py-4" : "px-5 py-6"
                      } font-semibold ${
                        theme === "dark"
                          ? "text-gray-200 hover:text-white"
                          : "text-cyan-700 hover:text-cyan-900"
                      } transition-colors relative group`}
                    >
                      <span>{item.name}</span>
                      <span
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${
                          theme === "dark"
                            ? "from-cyan-400 to-cyan-500"
                            : "from-cyan-400 to-cyan-600"
                        } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                      />
                    </button>
                  );
                } else if (item.dropdown) {
                  const isOpen = openDropdown === item.name;

                  return (
                    <div
                      key={item.name}
                      ref={(el) => (dropdownRefs.current[item.name] = el)}
                      className="relative flex items-center"
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center ${
                          scrolled ? "px-3 py-4" : "px-5 py-6"
                        }
                        font-semibold ${
                          theme === "dark"
                            ? "text-gray-200 hover:text-white"
                            : "text-cyan-700 hover:text-cyan-900"
                        }
                        transition-colors relative group`}
                      >
                        <span>{item.name}</span>
                        <span
                          className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r
                          ${
                            theme === "dark"
                              ? "from-cyan-400 to-cyan-500"
                              : "from-cyan-400 to-cyan-600"
                          }
                          transform scale-x-0 group-hover:scale-x-100
                          transition-transform duration-300 origin-left`}
                        />
                      </Link>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDropdownToggle(item.name);
                        }}
                        className="ml-1 p-1"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300
                          ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute top-full left-0 mt-1 w-72
                            ${
                              theme === "dark"
                                ? "bg-gray-800/90 text-white"
                                : "bg-white/90"
                            }
                            backdrop-blur-lg rounded-xl shadow-2xl border
                            ${
                              theme === "dark"
                                ? "border-gray-700/50"
                                : "border-cyan-200/50"
                            }
                            overflow-hidden`}
                          >
                            <div
                              className={`bg-gradient-to-r
                              ${
                                theme === "dark"
                                  ? "from-cyan-700/90 to-cyan-600/90"
                                  : "from-cyan-700 to-cyan-600"
                              }
                              text-white px-5 py-3`}
                            >
                              <h3 className="font-bold text-lg">{item.name}</h3>
                            </div>

                            {item.dropdown.map((subItem, index) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => setOpenDropdown(null)}
                              >
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.1,
                                    delay: index * 0.05,
                                  }}
                                  className={`px-5 py-3
                                  ${
                                    theme === "dark"
                                      ? "hover:bg-gray-700/50"
                                      : "hover:bg-cyan-50/50"
                                  }
                                  transition-colors border-l-2 border-transparent
                                  hover:border-cyan-500 flex items-center space-x-3 group`}
                                >
                                  {subItem.icon && (
                                    <subItem.icon className="w-4 h-4 text-cyan-500" />
                                  )}
                                  <span className="font-medium">
                                    {subItem.name}
                                  </span>
                                  <ArrowRight className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 ml-auto" />
                                </motion.div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                } else if (item.onClick) {
                  // Handle Services button with onClick
                  return (
                    <button
                      key={item.name}
                      onClick={item.onClick}
                      className={`flex items-center space-x-1 ${
                        scrolled ? "px-3 py-4" : "px-5 py-6"
                      } font-semibold ${
                        theme === "dark"
                          ? "text-gray-200 hover:text-white"
                          : "text-cyan-700 hover:text-cyan-900"
                      } transition-colors relative group`}
                    >
                      <span>{item.name}</span>
                      <span
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${
                          theme === "dark"
                            ? "from-cyan-400 to-cyan-500"
                            : "from-cyan-400 to-cyan-600"
                        } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                      />
                    </button>
                  );
                }
                return (
                  <Link key={item.name} href={item.href}>
                    <div
                      className={`${
                        scrolled ? "px-3 py-4" : "px-5 py-6"
                      } font-semibold ${
                        theme === "dark"
                          ? "text-gray-200 hover:text-white"
                          : "text-cyan-700 hover:text-cyan-900"
                      } transition-colors relative group`}
                    >
                      {item.name}
                      <span
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${
                          theme === "dark"
                            ? "from-cyan-400 to-cyan-500"
                            : "from-cyan-400 to-cyan-600"
                        } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <motion.button
                onClick={() => setShowSearch(!showSearch)}
                className={`p-2 rounded-lg ${
                  theme === "dark"
                    ? "text-gray-300 hover:bg-gray-800/50"
                    : "text-cyan-600 hover:bg-cyan-50/50"
                } transition-colors ${
                  scrolled ? "p-2" : "p-3"
                } group backdrop-blur-sm`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5 group-hover:text-cyan-500 transition-colors" />
              </motion.button>

              {/* Attractive Theme Toggle Button */}
              <div className="flex items-center">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </div>

              <motion.button
                onClick={() => setShowQuickContact(!showQuickContact)}
                className={`p-2 rounded-lg ${
                  theme === "dark"
                    ? "text-gray-300 hover:bg-gray-800/50"
                    : "text-cyan-600 hover:bg-cyan-50/50"
                } transition-colors ${
                  scrolled ? "p-2" : "p-3"
                } group backdrop-blur-sm`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Headphones className="w-5 h-5 group-hover:text-cyan-500 transition-colors" />
              </motion.button>

              {/* User Dropdown or Login Button */}
              {isLoggedIn ? (
                <UserDropdown
                  theme={theme}
                  userName={userName}
                  onLogout={handleLogout}
                />
              ) : (
                <Link href="/login">
                  <motion.button
                    className={`${
                      scrolled ? "px-4 py-2 text-sm" : "px-6 py-3"
                    } cursor-pointer bg-gradient-to-r ${
                      theme === "dark"
                        ? "from-cyan-600 to-cyan-500"
                        : "from-cyan-700 to-cyan-600"
                    } text-white font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-cyan-500 transition-all duration-300 flex items-center space-x-2 group backdrop-blur-sm`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </motion.button>
                </Link>
              )}

              <Link href={isCommercial ? "/" : "/commercial"}>
                <motion.button
                  className={`${
                    scrolled ? "px-4 py-2 text-sm" : "px-6 py-3"
                  } cursor-pointer bg-gradient-to-r ${
                    theme === "dark"
                      ? "from-cyan-600 to-cyan-500"
                      : "from-cyan-700 to-cyan-600"
                  } text-white font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-cyan-500 transition-all duration-300 flex items-center space-x-2 group backdrop-blur-sm`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Droplet className="w-4 h-4" />
                  <span>{isCommercial ? "For Household" : "For Business"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center space-x-2">
              <div className="md:hidden">
                <ThemeToggle
                  theme={theme}
                  toggleTheme={toggleTheme}
                  size="small"
                />
              </div>

              <motion.button
                onClick={() => setMobileOpen(true)}
                className={`p-2 rounded-lg ${
                  theme === "dark"
                    ? "text-gray-300 hover:bg-gray-800/50"
                    : "text-cyan-600 hover:bg-cyan-50/50"
                } transition-colors backdrop-blur-sm`}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`hidden lg:block border-t ${
              theme === "dark" ? "border-gray-700/50" : "border-cyan-200/50"
            } overflow-hidden backdrop-blur-sm`}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
              <div className="relative max-w-2xl mx-auto">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for products, plans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-800/50 border-gray-600/50 focus:border-cyan-500 focus:ring-cyan-500/20"
                      : "border-cyan-300/50 focus:border-cyan-500 focus:ring-cyan-500/20"
                  } focus:outline-none focus:ring-2 backdrop-blur-sm`}
                  autoFocus
                />
                <Search
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    theme === "dark" ? "text-gray-400" : "text-cyan-400"
                  }`}
                />
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </div>

              {/* Search Suggestions */}
              {filteredSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-2 max-w-2xl mx-auto ${
                    theme === "dark" ? "bg-gray-800/90" : "bg-white/90"
                  } backdrop-blur-lg rounded-lg shadow-lg border ${
                    theme === "dark"
                      ? "border-gray-700/50"
                      : "border-cyan-200/50"
                  } overflow-hidden`}
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setFilteredSuggestions([]);
                      }}
                      className={`px-4 py-2 ${
                        theme === "dark"
                          ? "hover:bg-gray-700/50"
                          : "hover:bg-cyan-50/50"
                      } cursor-pointer flex items-center space-x-2 backdrop-blur-sm ${
                        index === selectedSuggestionIndex
                          ? theme === "dark"
                            ? "bg-gray-700/50"
                            : "bg-cyan-50/50"
                          : ""
                      }`}
                    >
                      <Search className="w-4 h-4 text-cyan-400" />
                      <span className={theme === "dark" ? "text-gray-200" : ""}>
                        {suggestion}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}

              {searchQuery && filteredSuggestions.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-center text-sm text-gray-500"
                >
                  Press{" "}
                  <kbd className="px-2 py-1 text-xs bg-gray-100 rounded">
                    Enter
                  </kbd>{" "}
                  to search for "{searchQuery}"
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Contact Form */}
      <AnimatePresence>
        {showQuickContact && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`hidden lg:block border-t ${
              theme === "dark"
                ? "border-gray-700/50 bg-gray-800/90"
                : "border-cyan-200/50 bg-white/90"
            } backdrop-blur-lg`}
            ref={quickContactRef}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-full ${
                      theme === "dark" ? "bg-gray-700/50" : "bg-cyan-100/50"
                    } backdrop-blur-sm`}
                  >
                    <Headphones
                      className={`w-6 h-6 ${
                        theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${
                        theme === "dark" ? "text-gray-100" : "text-cyan-900"
                      }`}
                    >
                      Need Help?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Our water experts are ready to assist you
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href="tel:+880 1919 222 222"
                    className={`flex items-center space-x-2 ${
                      theme === "dark"
                        ? "bg-cyan-600/80 hover:bg-cyan-500/80"
                        : "bg-cyan-700 hover:bg-cyan-600"
                    } text-white px-4 py-2 rounded-lg transition-colors backdrop-blur-sm`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                  <Link
                    href="/contact"
                    className={`flex items-center space-x-2 ${
                      theme === "dark"
                        ? "bg-gray-600/80 hover:bg-gray-500/80"
                        : "bg-cyan-600 hover:bg-cyan-500"
                    } text-white px-4 py-2 rounded-lg transition-colors backdrop-blur-sm`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className={`fixed inset-0 ${
                theme === "dark" ? "bg-black/70" : "bg-cyan-700/20"
              } backdrop-blur-sm z-40 lg:hidden`}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] ${
                theme === "dark" ? "bg-gray-800/95" : "bg-white/95"
              } backdrop-blur-lg shadow-2xl z-50 overflow-y-auto lg:hidden border-l ${
                theme === "dark" ? "border-gray-700/50" : "border-cyan-200/50"
              }`}
            >
              <div
                className={`sticky top-0 bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-cyan-700/90 to-cyan-600/90"
                    : "from-cyan-700 to-cyan-600"
                } text-white p-4 flex justify-between items-center backdrop-blur-sm`}
              >
                <div className="flex items-center space-x-2">
                  <Droplet className="w-6 h-6 text-white" fill="currentColor" />
                  <span className="font-bold text-lg">SafeTap BD</span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-1">
                <MobileThemeToggle theme={theme} toggleTheme={toggleTheme} />

                {/* User Section in Mobile Menu */}
                {isLoggedIn ? (
                  <div
                    className={`p-4 rounded-lg ${
                      theme === "dark" ? "bg-gray-700/50" : "bg-cyan-50/50"
                    } backdrop-blur-sm`}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                          theme === "dark"
                            ? "from-cyan-600 to-cyan-500"
                            : "from-cyan-700 to-cyan-600"
                        } flex items-center justify-center text-white font-semibold`}
                      >
                        {userName ? userName.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <p
                          className={`font-medium ${
                            theme === "dark" ? "text-gray-100" : "text-cyan-900"
                          }`}
                        >
                          Welcome, {userName}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={closeMobileMenu}
                      className={`w-full flex items-center space-x-2 p-3 rounded-lg ${
                        theme === "dark"
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
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className={`w-full flex items-center space-x-2 p-3 rounded-lg ${
                        theme === "dark"
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
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className={`w-full flex items-center justify-between p-4 rounded-lg ${
                      theme === "dark"
                        ? "hover:bg-gray-700/50"
                        : "hover:bg-cyan-50/50"
                    } transition-colors font-semibold ${
                      theme === "dark" ? "text-gray-200" : "text-cyan-700"
                    } backdrop-blur-sm`}
                  >
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-cyan-500" />
                      <span>Login</span>
                    </div>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}

                {updatedNavigationItems.map((item) => {
                  if (item.isModal) {
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          setShowProductModal(true);
                          closeMobileMenu();
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-lg ${
                          theme === "dark"
                            ? "hover:bg-gray-700/50"
                            : "hover:bg-cyan-50/50"
                        } transition-colors font-semibold ${
                          theme === "dark" ? "text-gray-200" : "text-cyan-700"
                        } backdrop-blur-sm`}
                      >
                        <div className="flex items-center space-x-2">
                          {item.icon && (
                            <item.icon className="w-5 h-5 text-cyan-500" />
                          )}
                          <span>{item.name}</span>
                        </div>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    );
                  } else if (item.dropdown) {
                    return (
                      <div key={item.name}>
                        <button
                          onClick={() => handleDropdownToggle(item.name)}
                          className={`w-full flex items-center justify-between p-4 rounded-lg ${
                            theme === "dark"
                              ? "hover:bg-gray-700/50"
                              : "hover:bg-cyan-50/50"
                          } transition-colors font-semibold ${
                            theme === "dark" ? "text-gray-200" : "text-cyan-700"
                          } backdrop-blur-sm`}
                        >
                          <div className="flex items-center space-x-2">
                            {item.icon && (
                              <item.icon className="w-5 h-5 text-cyan-500" />
                            )}
                            <span>{item.name}</span>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              openDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 space-y-1">
                                {item.dropdown.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={closeMobileMenu}
                                  >
                                    <div
                                      className={`p-3 rounded-lg ${
                                        theme === "dark"
                                          ? "hover:bg-gray-700/50"
                                          : "hover:bg-cyan-50/50"
                                      } ${
                                        theme === "dark"
                                          ? "text-gray-300"
                                          : "text-cyan-600"
                                      } hover:text-cyan-900 transition-colors flex items-center space-x-2 backdrop-blur-sm`}
                                    >
                                      {subItem.icon && (
                                        <subItem.icon className="w-4 h-4" />
                                      )}
                                      <span>{subItem.name}</span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  } else if (item.onClick) {
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          item.onClick();
                          closeMobileMenu();
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-lg ${
                          theme === "dark"
                            ? "hover:bg-gray-700/50"
                            : "hover:bg-cyan-50/50"
                        } transition-colors font-semibold ${
                          theme === "dark" ? "text-gray-200" : "text-cyan-700"
                        } backdrop-blur-sm`}
                      >
                        <div className="flex items-center space-x-2">
                          {item.icon && (
                            <item.icon className="w-5 h-5 text-cyan-500" />
                          )}
                          <span>{item.name}</span>
                        </div>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                    >
                      <div
                        className={`p-4 rounded-lg ${
                          theme === "dark"
                            ? "hover:bg-gray-700/50"
                            : "hover:bg-cyan-50/50"
                        } transition-colors font-semibold ${
                          theme === "dark" ? "text-gray-200" : "text-cyan-700"
                        } flex items-center space-x-2 backdrop-blur-sm`}
                      >
                        {item.icon && (
                          <item.icon className="w-5 h-5 text-cyan-500" />
                        )}
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  );
                })}

                <div
                  className={`pt-4 mt-4 space-y-3 border-t ${
                    theme === "dark"
                      ? "border-gray-700/50"
                      : "border-cyan-200/50"
                  }`}
                >
                  <Link
                    href={isCommercial ? "/" : "/commercial"}
                    onClick={closeMobileMenu}
                  >
                    <div
                      className={`block w-full text-center py-3 px-6 bg-gradient-to-r ${
                        theme === "dark"
                          ? "from-cyan-600 to-cyan-500"
                          : "from-cyan-700 to-cyan-600"
                      } text-white font-bold rounded-lg shadow-md hover:from-cyan-600 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm`}
                    >
                      <Droplet className="w-4 h-4" />
                      <span>
                        {isCommercial ? "For Household" : "For Business"}
                      </span>
                    </div>
                  </Link>

                  <div className="flex items-center justify-center space-x-4 py-2">
                    <a
                      href="tel:+880 1919 222 222"
                      className={`flex items-center space-x-1 ${
                        theme === "dark" ? "text-gray-300" : "text-cyan-600"
                      } hover:text-cyan-800 transition-colors`}
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">Call Us</span>
                    </a>
                    <a
                      href="mailto:info@SafeTapbd.com"
                      className={`flex items-center space-x-1 ${
                        theme === "dark" ? "text-gray-300" : "text-cyan-600"
                      } hover:text-cyan-800 transition-colors`}
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Email</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-center space-x-3 py-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className={`p-2 rounded-full ${
                          theme === "dark" ? "bg-gray-700/50" : "bg-cyan-50/50"
                        } ${
                          theme === "dark" ? "text-gray-300" : "text-cyan-600"
                        } hover:bg-cyan-100 transition-colors backdrop-blur-sm`}
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div
        className={`${scrolled ? "pt-20" : ""} transition-all duration-300`}
      />

      {/* Floating Action Button for Quick Contact */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowQuickContact(!showQuickContact)}
            className={`fixed bottom-6 right-6 bg-gradient-to-r ${
              theme === "dark"
                ? "from-cyan-600 to-cyan-500"
                : "from-cyan-700 to-cyan-600"
            } text-white p-4 rounded-full shadow-lg z-40 lg:hidden backdrop-blur-sm`}
          >
            <Headphones className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Product Modal */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        theme={theme}
      />

      {/* Service Modal */}
      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        theme={theme}
      />
    </>
  );
}
