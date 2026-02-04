"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  User,
  HelpCircle,
  Shield,
  CreditCard,
  LayoutDashboard,
  UserCheck,
  Users,
  Briefcase,
  DollarSign,
  FileText,
  BarChart3,
  ShoppingCart,
  MessageSquare,
  CheckSquare,
  AlertCircle,
  Info,
  PanelLeftOpen,
  PanelLeftClose,
  Sparkles,
  Lock,
  ChevronDown,
  ChevronRightIcon,
  Sun,
  Moon,
  Menu,
  Search,
  Command,
  ClockIcon,
  ExternalLink,
  Bell,
  Crown,
  Settings,
} from "lucide-react";
import { useFirebaseAuth } from "@/app/contexts/FirebaseAuthContext";
import { toast } from "react-hot-toast";
import { FaProductHunt } from "react-icons/fa";

export default function AdminLayout({ children }) {
  const { user, signOut } = useFirebaseAuth();
  console.log(user);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [screenSize, setScreenSize] = useState("lg");
  const [isHovering, setIsHovering] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [checkingRole, setCheckingRole] = useState(true);

  // New states for client account management
  const [showClientAccountModal, setShowClientAccountModal] = useState(false);
  const [clientEmail, setClientEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  // State for user permissions
  const [userPermissions, setUserPermissions] = useState({
    project: {
      create_project: false,
      edit_project: false,
      delete_project: false,
      view_all_projects: false,
      assign_project: false,
      monetize_project: false,
      view_revenue: false,
      manage_payments: false,
      set_pricing: false,
    },
    task: {
      create_task: false,
      edit_task: false,
      delete_task: false,
      submit_task: false,
      approve_task: false,
      assign_task: false,
    },
    team: {
      add_member: false,
      remove_member: false,
      edit_member_role: false,
      view_team_stats: false,
    },
    system: {
      view_analytics: false,
      export_data: false,
      manage_settings: false,
    },
  });

  const pathname = usePathname();

  // Refs for dropdowns to handle clicks outside
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const clientModalRef = useRef(null);
  const searchRef = useRef(null);

  // Check user role and redirect if not admin
  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setCheckingRole(false);
        return;
      }

      try {
        // Get the user's Firebase ID token
        const token = await user.getIdToken();

        // Check the user's role from your backend
        const response = await fetch("http://127.0.0.1:8000/api/auth/me/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await response.json();
        const role = userData.profile?.role || "customer";
        setUserRole(role);
        console.log("user data", userData);
        console.log("role", role);

        // if (response.ok) {
        //   const userData = await response.json();
        //   const role = userData.profile?.role || "customer";
        //   setUserRole(role);
        //   console.log("user data", userData);

        //   // If user is not admin, logout and redirect
        //   // if (role !== "admin") {
        //   //   console.log("User is not admin, logging out...");
        //   //   await signOut();
        //   //   toast.error(
        //   //     "You don't have admin privileges. You have been logged out.",
        //   //   );
        //   //   router.push("/login");
        //   // }
        // } else {
        //   // If we can't verify the role, assume no admin access
        //   console.log("Could not verify user role, logging out...");
        //   // await signOut();
        //   toast.error("Authentication failed. You have been logged out.");
        //   router.push("/login");
        // }
      } catch (error) {
        console.error("Error checking user role:", error);
        // If there's an error, logout and redirect
        await signOut();
        toast.error("Authentication error. You have been logged out.");
        router.push("/login");
      } finally {
        setCheckingRole(false);
      }
    };

    checkUserRole();
  }, [user, router, signOut]);

  // Admin menu items
  const adminMenuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: "/admin-dashboard",
      badge: null,
      color: "blue",
      gradient: "from-blue-600 to-blue-700",
    },
    {
      title: "Manage Technicians",
      icon: <UserCheck className="w-5 h-5" />,
      href: "/admin-dashboard/manage-technicians",
      badge: "12",
      color: "emerald",
      gradient: "from-emerald-600 to-emerald-700",
    },
    {
      title: "Manage Users",
      icon: <Users className="w-5 h-5" />,
      href: "/admin-dashboard/manage-users",
      badge: null,
      color: "purple",
      gradient: "from-purple-600 to-purple-700",
    },
    {
      title: "Services",
      icon: <Briefcase className="w-5 h-5" />,
      href: "/admin-dashboard/manage-services-and-support",
      badge: "4",
      color: "cyan",
      gradient: "from-cyan-600 to-cyan-700",
    },
    {
      title: "Manage Product Page",
      icon: <FaProductHunt className="w-5 h-5" />,
      href: "/admin-dashboard/manage-product-page",
      badge: null,
      color: 'blue',
      gradient: "from-blue-600 to-blue-500"
    },
    {
      title: "Pricing",
      icon: <DollarSign className="w-5 h-5" />,
      href: "/admin-dashboard/manage-pricing-card",
      badge: "12",
      color: "green",
      gradient: "from-green-600 to-green-700",
    },
    {
      title: "Blogs",
      icon: <FileText className="w-5 h-5" />,
      href: "/admin-dashboard/manage-and-post-blogs",
      badge: null,
      color: "teal",
      gradient: "from-teal-600 to-teal-700",
    },
    {
      title: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      href: "/admin-dashboard/manage-analytics",
      badge: null,
      color: "orange",
      gradient: "from-orange-600 to-orange-700",
    },
    {
      title: "Orders",
      icon: <ShoppingCart className="w-5 h-5" />,
      href: "/admin-dashboard/manage-orders",
      badge: "5",
      color: "pink",
      gradient: "from-pink-600 to-pink-700",
    },
    {
      title: "Messages",
      icon: <MessageSquare className="w-5 h-5" />,
      href: "/admin-dashboard/free-chat-support",
      badge: "3",
      color: "indigo",
      gradient: "from-indigo-600 to-indigo-700",
    },
    {
      title: "Settings",
      icon: <Settings className="w-5 h-5" />,
      href: "/admin-dashboard/manage-settings",
      badge: null,
      color: "gray",
      gradient: "from-gray-600 to-gray-700",
      submenu: [
        { title: "General", href: "/settings/general" },
        { title: "Security", href: "/settings/security" },
        { title: "API", href: "/settings/api" },
        { title: "Billing", href: "/settings/billing" },
      ],
    },
  ];

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: "New user registered",
      time: "5 min ago",
      read: false,
      type: "success",
      description: "A new user has joined your platform",
    },
    {
      id: 2,
      title: "System update available",
      time: "1 hour ago",
      read: false,
      type: "info",
      description: "Version 2.0.1 is now available",
    },
    {
      id: 3,
      title: "Payment received",
      time: "3 hours ago",
      read: true,
      type: "success",
      description: "Payment of $1,250 received",
    },
    {
      id: 4,
      title: "Server maintenance scheduled",
      time: "1 day ago",
      read: true,
      type: "warning",
      description: "Scheduled for tomorrow at 2 AM",
    },
  ];

  // Handle logout with confirmation
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
      // Even if there's an error, redirect to login
      router.push("/login");
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  // Show logout confirmation dialog
  const showLogoutConfirmation = () => {
    setShowLogoutConfirm(true);
    setProfileOpen(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";

    if (user.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }

    if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }

    return "U";
  };

  // Check if user has permission to access current route
  const hasPermission = (permission) => {
    // Check specific permission
    if (
      permission.startsWith("project.") &&
      userPermissions.project[permission.split(".")[1]]
    ) {
      return true;
    }

    if (
      permission.startsWith("task.") &&
      userPermissions.task[permission.split(".")[1]]
    ) {
      return true;
    }

    if (
      permission.startsWith("team.") &&
      userPermissions.team[permission.split(".")[1]]
    ) {
      return true;
    }

    if (
      permission.startsWith("system.") &&
      userPermissions.system[permission.split(".")[1]]
    ) {
      return true;
    }

    return false;
  };

  const toggleSubmenu = (title) => {
    if (activeSubmenu === title) {
      setActiveSubmenu("");
    } else {
      setActiveSubmenu(title);
    }
  };

  const isActive = (href) => {
    if (href === "/admin-dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckSquare className="w-5 h-5 text-emerald-400" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getColorClasses = (color, isActive = false) => {
    if (isActive) {
      switch (color) {
        case "blue":
          return "text-blue-300 dark:text-blue-300 bg-gradient-to-r from-blue-900/50 to-blue-800/50 dark:from-blue-900/50 dark:to-blue-800/50 border-blue-700/50 dark:border-blue-700/50 shadow-lg shadow-blue-900/20";
        case "purple":
          return "text-purple-300 dark:text-purple-300 bg-gradient-to-r from-purple-900/50 to-purple-800/50 dark:from-purple-900/50 dark:to-purple-800/50 border-purple-700/50 dark:border-purple-700/50 shadow-lg shadow-purple-900/20";
        case "cyan":
          return "text-cyan-300 dark:text-cyan-300 bg-gradient-to-r from-cyan-900/50 to-cyan-800/50 dark:from-cyan-900/50 dark:to-cyan-800/50 border-cyan-700/50 dark:border-cyan-700/50 shadow-lg shadow-cyan-900/20";
        case "green":
          return "text-green-300 dark:text-green-300 bg-gradient-to-r from-green-900/50 to-green-800/50 dark:from-green-900/50 dark:to-green-800/50 border-green-700/50 dark:border-green-700/50 shadow-lg shadow-green-900/20";
        case "teal":
          return "text-teal-300 dark:text-teal-300 bg-gradient-to-r from-teal-900/50 to-teal-800/50 dark:from-teal-900/50 dark:to-teal-800/50 border-teal-700/50 dark:border-teal-700/50 shadow-lg shadow-teal-900/20";
        case "orange":
          return "text-orange-300 dark:text-orange-300 bg-gradient-to-r from-orange-900/50 to-orange-800/50 dark:from-orange-900/50 dark:to-orange-800/50 border-orange-700/50 dark:border-orange-700/50 shadow-lg shadow-orange-900/20";
        case "indigo":
          return "text-indigo-300 dark:text-indigo-300 bg-gradient-to-r from-indigo-900/50 to-indigo-800/50 dark:from-indigo-900/50 dark:to-indigo-800/50 border-indigo-700/50 dark:border-indigo-700/50 shadow-lg shadow-indigo-900/20";
        case "emerald":
          return "text-emerald-300 dark:text-emerald-300 bg-gradient-to-r from-emerald-900/50 to-emerald-800/50 dark:from-emerald-900/50 dark:to-emerald-800/50 border-emerald-700/50 dark:border-emerald-700/50 shadow-lg shadow-emerald-900/20";
        case "amber":
          return "text-amber-300 dark:text-amber-300 bg-gradient-to-r from-amber-900/50 to-amber-800/50 dark:from-amber-900/50 dark:to-amber-800/50 border-amber-700/50 dark:border-amber-700/50 shadow-lg shadow-amber-900/20";
        case "pink":
          return "text-pink-300 dark:text-pink-300 bg-gradient-to-r from-pink-900/50 to-pink-800/50 dark:from-pink-900/50 dark:to-pink-800/50 border-pink-700/50 dark:border-pink-700/50 shadow-lg shadow-pink-900/20";
        default:
          return "text-gray-300 dark:text-gray-300 bg-gradient-to-r from-gray-900/50 to-gray-800/50 dark:from-gray-900/50 dark:to-gray-800/50 border-gray-700/50 dark:border-gray-700/50 shadow-lg shadow-gray-900/20";
      }
    } else {
      switch (color) {
        case "blue":
          return "text-gray-400 dark:text-gray-400 hover:text-blue-300 hover:bg-blue-900/20 dark:hover:bg-blue-900/20 hover:border-blue-800/30 dark:hover:border-blue-800/30";
        case "purple":
          return "text-gray-400 dark:text-gray-400 hover:text-purple-300 hover:bg-purple-900/20 dark:hover:bg-purple-900/20 hover:border-purple-800/30 dark:hover:border-purple-800/30";
        case "cyan":
          return "text-gray-400 dark:text-gray-400 hover:text-cyan-300 hover:bg-cyan-900/20 dark:hover:bg-cyan-900/20 hover:border-cyan-800/30 dark:hover:border-cyan-800/30";
        case "green":
          return "text-gray-400 dark:text-gray-400 hover:text-green-300 hover:bg-green-900/20 dark:hover:bg-green-900/20 hover:border-green-800/30 dark:hover:border-green-800/30";
        case "teal":
          return "text-gray-400 dark:text-gray-400 hover:text-teal-300 hover:bg-teal-900/20 dark:hover:bg-teal-900/20 hover:border-teal-800/30 dark:hover:border-teal-800/30";
        case "orange":
          return "text-gray-400 dark:text-gray-400 hover:text-orange-300 hover:bg-orange-900/20 dark:hover:bg-orange-900/20 hover:border-orange-800/30 dark:hover:border-orange-800/30";
        case "indigo":
          return "text-gray-400 dark:text-gray-400 hover:text-indigo-300 hover:bg-indigo-900/20 dark:hover:bg-indigo-900/20 hover:border-indigo-800/30 dark:hover:border-indigo-800/30";
        case "emerald":
          return "text-gray-400 dark:text-gray-400 hover:text-emerald-300 hover:bg-emerald-900/20 dark:hover:bg-emerald-900/20 hover:border-emerald-800/30 dark:hover:border-emerald-800/30";
        case "amber":
          return "text-gray-400 dark:text-gray-400 hover:text-amber-300 hover:bg-amber-900/20 dark:hover:bg-amber-900/20 hover:border-amber-800/30 dark:hover:border-amber-800/30";
        case "pink":
          return "text-gray-400 dark:text-gray-400 hover:text-pink-300 hover:bg-pink-900/20 dark:hover:bg-pink-900/20 hover:border-pink-800/30 dark:hover:border-pink-800/30";
        default:
          return "text-gray-400 dark:text-gray-400 hover:text-gray-300 hover:bg-gray-900/20 dark:hover:bg-gray-900/20 hover:border-gray-800/30 dark:hover:border-gray-800/30";
      }
    }
  };

  const getPageTitle = () => {
    if (pathname === "/admin-dashboard") return "Admin Dashboard";
    if (pathname === "/admin-dashboard/manage-workers")
      return "Workers Management";
    if (pathname.startsWith("/admin-dashboard/manage-workers/"))
      return "Worker Details";
    if (pathname === "/admin-dashboard/manage-services-and-support")
      return "Services Management";
    if (pathname.startsWith("/admin-dashboard/manage-services-and-support/"))
      return "Service Details";
    if (pathname === "/admin-dashboard/manage-pricing-card")
      return "Pricing Plans";
    if (pathname === "/admin-dashboard/manage-and-post-blogs")
      return "Blog Management";
    if (pathname === "/admin-dashboard/manage-analytics") return "Analytics";
    if (pathname === "/admin-dashboard/manage-orders")
      return "Order Management";
    if (pathname === "/admin-dashboard/manage-messages") return "Messages";
    if (pathname === "/admin-dashboard/manage-settings") return "Settings";

    return "Admin Dashboard";
  };

  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs = [{ name: "Dashboard", href: "/admin-dashboard" }];

    if (paths.length > 1) {
      const pageName = paths[paths.length - 1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      breadcrumbs.push({ name: pageName, href: pathname });
    }

    return breadcrumbs;
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    // Filter menu items based on search query
    const filteredItems = adminMenuItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          (item.submenu &&
            item.submenu.some((sub) =>
              sub.title.toLowerCase().includes(query.toLowerCase()),
            )),
      )
      .map((item) => ({
        title: item.title,
        description: `Navigate to ${item.title}`,
        icon: item.icon,
        action: () => {
          router.push(item.href);
          setSearchFocused(false);
          setSearchQuery("");
          // Add to search history
          if (!searchHistory.includes(query)) {
            setSearchHistory([query, ...searchHistory.slice(0, 4)]);
          }
        },
      }));

    // Add submenu items if they match
    adminMenuItems.forEach((item) => {
      if (item.submenu) {
        item.submenu.forEach((subitem) => {
          if (subitem.title.toLowerCase().includes(query.toLowerCase())) {
            filteredItems.push({
              title: subitem.title,
              description: `Navigate to ${subitem.title}`,
              icon: <ChevronRightIcon className="w-4 h-4" />,
              action: () => {
                router.push(subitem.href);
                setSearchFocused(false);
                setSearchQuery("");
                // Add to search history
                if (!searchHistory.includes(query)) {
                  setSearchHistory([query, ...searchHistory.slice(0, 4)]);
                }
              },
            });
          }
        });
      }
    });

    setSearchResults(filteredItems);
  };

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  // Show loading spinner while checking user role
  if (checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  // if (userRole && userRole !== "admin") {
  //   return (
  //     <div className="min-h-screen bg-gray-900 flex items-center justify-center">
  //       <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
  //         <div className="text-center">
  //           <svg
  //             className="mx-auto h-12 w-12 text-red-500"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
  //             />
  //           </svg>
  //           <h3 className="mt-4 text-lg font-medium text-gray-100">
  //             Access Denied
  //           </h3>
  //           <p className="mt-2 text-sm text-gray-400">
  //             You do not have permission to access this page. Admin access
  //             required.
  //           </p>
  //           <div className="mt-6">
  //             <button
  //               onClick={() => router.push("/dashboard")}
  //               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //             >
  //               Go to Dashboard
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // Special handling for chat support page - render without dashboard layout
  if (pathname === "/dashboard/free-chat-support") {
    return <>{children}</>;
  }

  return (
    <div
      className={`flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ${darkMode ? "dark" : ""}`}
    >
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && screenSize !== "xl" && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Toggle Button */}
      {sidebarOpen && (
        <div
          className={`fixed top-4 z-50 transition-all duration-500 ease-in-out ${sidebarCollapsed ? "left-16" : "left-72"}`}
        >
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`group relative flex items-center justify-center w-11 h-11 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl ${
              sidebarCollapsed
                ? "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700"
                : "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800"
            } text-white border border-gray-700 backdrop-blur-sm`}
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <div
              className={`transition-transform duration-300 ${sidebarCollapsed ? "rotate-0" : "rotate-180"}`}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </div>
            <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition-all duration-300"></span>
          </button>
        </div>
      )}

      {/* Enhanced Sidebar */}
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${sidebarCollapsed ? "w-16" : "w-72"} fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black border-r border-gray-700 backdrop-blur-xl transition-all duration-500 ease-in-out z-50 flex flex-col shadow-2xl`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
          <div
            className={`flex items-center ${sidebarCollapsed ? "justify-center" : ""} transition-all duration-300`}
          >
            <div className="relative group">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 shadow-blue-600/50 group-hover:shadow-blue-600/70`}
              >
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="relative z-10">AD</span>
                <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              </div>
            </div>
            {!sidebarCollapsed && (
              <div className="ml-3 transition-opacity duration-300">
                <span className="text-xl font-bold text-white block">
                  Admin Panel
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  Control Center
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1.5">
            {adminMenuItems.map((item, index) => {
              // Check if user has permission to access this menu item
              const hasRequiredPermission = item.permission
                ? hasPermission(item.permission)
                : true;

              return (
                <li key={item.title}>
                  <div>
                    {item.onClick ? (
                      <button
                        onClick={item.onClick}
                        className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-300 border ${!hasRequiredPermission ? "opacity-50 cursor-not-allowed" : getColorClasses(item.color, false)} relative overflow-hidden w-full text-left`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>

                        <div className="flex items-center relative z-10">
                          <span
                            className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
                          >
                            {item.icon}
                          </span>
                          {!sidebarCollapsed && (
                            <span className="ml-3 text-sm font-semibold transition-opacity duration-300">
                              {item.title}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 relative z-10">
                          {item.badge && !sidebarCollapsed && (
                            <span
                              className={`px-2.5 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-${item.color}-600/30`}
                            >
                              {item.badge}
                            </span>
                          )}
                          {!hasRequiredPermission && (
                            <Lock className="w-4 h-4 text-amber-500" />
                          )}
                        </div>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-300 border ${
                          !hasRequiredPermission
                            ? "opacity-50 cursor-not-allowed"
                            : isActive(item.href)
                              ? `${getColorClasses(item.color, true)} border-2`
                              : `${getColorClasses(item.color, false)} border-transparent`
                        } relative overflow-hidden`}
                        onClick={() =>
                          item.submenu && toggleSubmenu(item.title)
                        }
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>

                        <div className="flex items-center relative z-10">
                          <span
                            className={`flex-shrink-0 transition-transform duration-300 ${isActive(item.href) ? "scale-110" : "group-hover:scale-110"}`}
                          >
                            {item.icon}
                          </span>
                          {!sidebarCollapsed && (
                            <span className="ml-3 text-sm font-semibold transition-opacity duration-300">
                              {item.title}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 relative z-10">
                          {item.badge && !sidebarCollapsed && (
                            <span
                              className={`px-2.5 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-${item.color}-600/30`}
                            >
                              {item.badge}
                            </span>
                          )}
                          {item.submenu && !sidebarCollapsed && (
                            <ChevronDown
                              className={`w-4 h-4 transition-all duration-300 ${
                                activeSubmenu === item.title
                                  ? "rotate-180 text-blue-400"
                                  : "text-gray-400 group-hover:text-gray-300"
                              }`}
                            />
                          )}
                        </div>
                      </Link>
                    )}

                    {/* Enhanced Submenu */}
                    {item.submenu &&
                      activeSubmenu === item.title &&
                      !sidebarCollapsed && (
                        <ul className="mt-2 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-300">
                          {item.submenu.map((subitem, subIndex) => {
                            // Check if user has permission to access this submenu item
                            const hasSubPermission = subitem.permission
                              ? hasPermission(subitem.permission)
                              : true;

                            return (
                              <li key={subitem.title}>
                                <Link
                                  href={subitem.href}
                                  className={`group flex items-center p-2.5 rounded-lg transition-all duration-200 ${
                                    !hasSubPermission
                                      ? "opacity-50 cursor-not-allowed"
                                      : pathname === subitem.href
                                        ? `${getColorClasses(item.color, true)} shadow-md`
                                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                                  }`}
                                  style={{
                                    animationDelay: `${subIndex * 30}ms`,
                                  }}
                                >
                                  <ChevronRightIcon className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  <span className="text-sm font-medium">
                                    {subitem.title}
                                  </span>
                                  {!hasSubPermission && (
                                    <Lock className="w-3 h-3 text-amber-500 ml-2" />
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Dark Mode Toggle */}
        <div className="p-4 border-t border-gray-700 mt-auto bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="group w-full flex items-center justify-center p-3.5 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm transition-all duration-300 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 hover:shadow-lg"
          >
            <div className="relative">
              {darkMode ? (
                <Sun className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" />
              ) : (
                <Moon className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
              )}
            </div>
            {!sidebarCollapsed && (
              <span className="ml-3 text-sm font-semibold transition-opacity duration-300">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-500 ${sidebarOpen ? (sidebarCollapsed ? "ml-16" : "ml-72") : "ml-0"}`}
      >
        {/* Enhanced Header */}
        <header className="sticky top-0 z-30 bg-gray-800/80 backdrop-blur-xl border-b border-gray-700 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-xl hover:bg-gray-700 lg:hidden transition-all duration-200 border border-gray-700"
              >
                <Menu className="w-5 h-5 text-gray-300" />
              </button>

              {/* Breadcrumbs */}
              <div className="hidden md:flex items-center space-x-2 text-sm">
                {getBreadcrumbs().map((crumb, index) => (
                  <div key={crumb.href} className="flex items-center">
                    {index > 0 && (
                      <ChevronRightIcon className="w-4 h-4 text-gray-500 mx-2" />
                    )}
                    <Link
                      href={crumb.href}
                      className={`font-medium transition-colors ${
                        index === getBreadcrumbs().length - 1
                          ? "text-gray-100"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      {crumb.name}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Enhanced Search Bar */}
              <div
                className="flex items-center flex-1 max-w-lg mx-4"
                ref={searchRef}
              >
                <div className="relative w-full group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    id="global-search"
                    type="text"
                    placeholder="Search or type a URL..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchResults.length > 0) {
                        searchResults[0].action();
                      }
                    }}
                    className="w-full pl-12 pr-10 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-1 text-xs font-sans font-semibold text-gray-400 bg-gray-700 rounded border border-gray-600">
                      <Command className="w-3 h-3 mr-1" />K
                    </kbd>
                  </div>

                  {/* Enhanced Search Results Dropdown */}
                  {searchFocused && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 z-50 overflow-hidden backdrop-blur-xl max-h-96 overflow-y-auto">
                      {/* Search History */}
                      {searchQuery === "" && searchHistory.length > 0 && (
                        <div className="p-4 border-b border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                              Recent Searches
                            </h3>
                            <button
                              onClick={clearSearchHistory}
                              className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                            >
                              Clear
                            </button>
                          </div>
                          <ul className="space-y-1">
                            {searchHistory.map((query, index) => (
                              <li key={index}>
                                <button
                                  onClick={() => {
                                    setSearchQuery(query);
                                    handleSearch(query);
                                  }}
                                  className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700 transition-colors text-left"
                                >
                                  <ClockIcon className="w-4 h-4 text-gray-400 mr-2" />
                                  <span className="text-sm text-gray-300">
                                    {query}
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Search Results */}
                      {searchQuery !== "" && searchResults.length > 0 && (
                        <ul className="py-2">
                          {searchResults.map((result, index) => (
                            <li key={index}>
                              <button
                                onClick={result.action}
                                className="flex items-center w-full p-3 hover:bg-gray-700 transition-colors text-left group"
                              >
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center mr-3 text-gray-300 group-hover:text-blue-400 group-hover:bg-blue-900/20 transition-colors">
                                  {result.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-100 truncate">
                                    {result.title}
                                  </p>
                                  <p className="text-xs text-gray-400 truncate">
                                    {result.description}
                                  </p>
                                </div>
                                {result.type === "url" && (
                                  <ExternalLink className="w-4 h-4 text-gray-400 ml-2" />
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* No Results */}
                      {searchQuery !== "" && searchResults.length === 0 && (
                        <div className="p-6 text-center">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Search className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-400">
                            No results found for `{searchQuery}`
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Try searching for a different term or enter a URL
                          </p>
                        </div>
                      )}

                      {/* Search Tips */}
                      {searchQuery === "" && (
                        <div className="p-4 border-t border-gray-700">
                          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Search Tips
                          </h3>
                          <ul className="space-y-1 text-xs text-gray-400">
                            <li className="flex items-start">
                              <span className="text-blue-400 mr-2">•</span>
                              Type a URL to navigate directly to a website
                            </li>
                            <li className="flex items-start">
                              <span className="text-blue-400 mr-2">•</span>
                              Search for pages, settings, or features
                            </li>
                            <li className="flex items-start">
                              <span className="text-blue-400 mr-2">•</span>
                              Use{" "}
                              <kbd className="px-1 py-0.5 text-xs bg-gray-700 rounded border border-gray-600">
                                Ctrl+K
                              </kbd>{" "}
                              to quickly open search
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-2">
                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2.5 rounded-xl hover:bg-gray-700 transition-all duration-200 border border-transparent hover:border-gray-600 group"
                  >
                    <Bell className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
                    {unreadNotifications > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-gray-800 animate-pulse"></span>
                    )}
                  </button>

                  {/* Enhanced Notifications Dropdown */}
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-96 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 z-50 overflow-hidden backdrop-blur-xl">
                      <div className="p-5 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg text-gray-100">
                            Notifications
                          </h3>
                          {unreadNotifications > 0 && (
                            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-500 text-white">
                              {unreadNotifications} new
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto custom-scrollbar">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer ${
                              !notification.read ? "bg-blue-900/10" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex-shrink-0">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-gray-100">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {notification.description}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0 mt-2"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-gray-700 bg-gray-900/50">
                        <button className="w-full text-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced Profile with Working Logout */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-gray-700 transition-all duration-200 border border-transparent hover:border-gray-600 group"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-xl group-hover:shadow-opacity-50 transition-all duration-300 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 shadow-blue-600/30 group-hover:shadow-blue-600/50">
                      {getUserInitials()}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-300 hidden sm:block transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Enhanced Profile Dropdown with Working Logout */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 z-50 overflow-hidden backdrop-blur-xl">
                      <div className="p-5 border-b border-gray-700 bg-gradient-to-r from-blue-900/20 to-gray-900">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
                            {getUserInitials()}
                          </div>
                          <div>
                            <p className="font-bold text-gray-100">
                              {user?.displayName || "Admin User"}
                            </p>
                            <p className="text-xs text-gray-400">
                              {user?.email || "admin@example.com"}
                            </p>
                            <div className="flex items-center mt-1">
                              <Crown className="w-3 h-3 text-yellow-400 mr-1" />
                              <span className="text-xs font-medium text-blue-400 capitalize">
                                {userRole}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/profile"
                          className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors group"
                        >
                          <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-400 transition-colors" />
                          <span className="text-sm font-medium text-gray-300">
                            Profile
                          </span>
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors group"
                        >
                          <Settings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-400 transition-colors" />
                          <span className="text-sm font-medium text-gray-300">
                            Settings
                          </span>
                        </Link>
                        <Link
                          href="/help"
                          className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors group"
                        >
                          <HelpCircle className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-400 transition-colors" />
                          <span className="text-sm font-medium text-gray-300">
                            Help & Support
                          </span>
                        </Link>
                        <div className="my-1 h-px bg-gray-700"></div>
                        <button
                          onClick={showLogoutConfirmation}
                          className="flex items-center w-full p-3 rounded-xl hover:bg-red-900/20 transition-colors group"
                        >
                          <LogOut className="w-4 h-4 mr-3 text-red-400" />
                          <span className="text-sm font-medium text-red-400">
                            Logout
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-100 mb-2 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                {getPageTitle()}
              </h1>
              <p className="text-gray-400 text-sm">
                Manage and monitor your dashboard activities
              </p>
            </div>
            {children}
          </div>
        </main>
      </div>

      {/* Logout Confirmation Dialog with Enhanced Design */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 max-w-sm w-full mx-4 logout-confirm-dialog transform transition-all">
            <div className="flex items-center justify-center w-16 h-16 bg-red-900/20 rounded-full mx-auto mb-4">
              <LogOut className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-100 mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-400 text-center mb-6">
              Are you sure you want to logout? Any unsaved changes will be lost.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-3 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center justify-center"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.7);
        }
      `}</style>
    </div>
  );
}
