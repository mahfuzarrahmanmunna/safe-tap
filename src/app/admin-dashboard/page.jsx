"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useFirebaseAuth } from "@/app/contexts/FirebaseAuthContext";
import {
  Home,
  Users,
  FileText,
  Settings,
  BarChart3,
  PieChart,
  TrendingUp,
  Activity,
  Calendar,
  DollarSign,
  ShoppingCart,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  ChevronDown,
  MessageSquare,
  HeadphonesIcon,
  UserPlus,
  Shield,
  CreditCard,
  Zap,
  TrendingDown,
  FileDown,
  Filter,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Download,
  ExternalLink,
  Info,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "./layout";

const AdminDashboardPage = () => {
  const { user } = useFirebaseAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("week"); // day, week, month, year
  const [supportData, setSupportData] = useState(null);
  const [supportStats, setSupportStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
    cancelledRequests: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [supportRequests, setSupportRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch support data
  useEffect(() => {
    const fetchSupportData = async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch(
          "http://127.0.0.1:8000/api/auth/support/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setSupportData(data);
          setSupportStats({
            totalRequests: data.total_requests || 0,
            pendingRequests: data.pending_requests || 0,
            inProgressRequests: data.in_progress_requests || 0,
            completedRequests: data.completed_requests || 0,
            cancelledRequests: data.cancelled_requests || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching support data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchSupportRequests = async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch(
          "http://127.0.0.1:8000/api/support-requests/",
          {
            method: "GET",
            headers: {
              "ContentContent-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setSupportRequests(data.results || []);
        }
      } catch (error) {
        console.error("Error fetching support requests:", error);
      }
    };

    const fetchRecentActivities = async () => {
      try {
        // In a real implementation, you would fetch this from your API
        // For now, using mock data
        const mockActivities = [
          {
            id: 1,
            user: "John Doe",
            action: "Created a new service request",
            time: "2 minutes ago",
            type: "create",
            status: "success",
            avatar: "https://picsum.photos/seed/user1/150x150.jpg",
          },
          {
            id: 2,
            user: "Jane Smith",
            action: "Completed service request #1234",
            time: "15 minutes ago",
            type: "complete",
            status: "success",
            avatar: "https://picsum.photos/seed/user2/150x150.jpg",
          },
          {
            id: 3,
            user: "Bob Johnson",
            action: "Updated profile information",
            time: "1 hour ago",
            type: "update",
            status: "info",
            avatar: "https://picsum.photos/seed/user3/150x150.jpg",
          },
          {
            id: 4,
            user: "Alice Williams",
            action: "Deleted a service request",
            time: "2 hours ago",
            type: "delete",
            status: "warning",
            avatar: "https://picsum.photos/seed/user4/150x150.jpg",
          },
          {
            id: 5,
            user: "Charlie Brown",
            action: "Added a new technician",
            time: "3 hours ago",
            type: "create",
            status: "success",
            avatar: "https://picsum.photos/seed/user5/150x150.jpg",
          },
          {
            id: 6,
            user: "David Miller",
            action: "Responded to support ticket #5678",
            time: "4 hours ago",
            type: "respond",
            status: "success",
            avatar: "https://picsum.photos/seed/user6/150x150.jpg",
          },
          {
            id: 7,
            user: "Emma Wilson",
            action: "Closed support ticket #5678",
            time: "5 hours ago",
            type: "close",
            status: "success",
            avatar: "https://picsum.photos/seed/user7/150x150.jpg",
          },
          {
            id: 8,
            user: "Frank Garcia",
            action: "Escalated support ticket #5678",
            time: "6 hours ago",
            type: "escalate",
            status: "warning",
            avatar: "https://picsum.photos/seed/user8/150x150.jpg",
          },
          {
            id: 9,
            user: "Grace Lee",
            action: "Created a new support ticket",
            time: "8 hours ago",
            type: "create",
            status: "success",
            avatar: "https://picsum.photos/seed/user9/150x150.jpg",
          },
          {
            id: 10,
            user: "Henry Martinez",
            action: "Updated support ticket #5679",
            time: "10 hours ago",
            type: "update",
            status: "info",
            avatar: "https://picsum.photos/seed/user10/150x150.jpg",
          },
        ];
        setRecentActivities(mockActivities);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    fetchSupportData();
    fetchSupportRequests();
    fetchRecentActivities();
  }, [user]);

  // Mock data for charts
  const [revenueData, setRevenueData] = useState([
    { name: "Jan", revenue: 4000, orders: 240 },
    { name: "Feb", revenue: 3000, orders: 180 },
    { name: "Mar", revenue: 5000, requests: 290 },
    { name: "Apr", revenue: 2780, requests: 200 },
    { name: "May", revenue: 1890, requests: 180 },
    { name: "Jun", revenue: 2390, requests: 220 },
    { name: "Jul", revenue: 3490, requests: 280 },
  ]);

  const [supportRequestData, setSupportRequestData] = useState([
    { name: "Plumbing", value: 400, color: "#8884d8" },
    { name: "Electrical", value: 300, color: "#82ca9d" },
    { name: "HVAC", value: 300, color: "#ffc658" },
    { name: "Appliance", value: 200, color: "#ff7c7c" },
    { name: "Other", value: 150, color: "#8dd1e1" },
  ]);

  // Calculate statistics
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = revenueData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const completionRate =
    (supportStats.completedRequests / supportStats.totalRequests) * 100;

  const getActivityIcon = (type) => {
    switch (type) {
      case "create":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "complete":
        return <CheckCircle className="h-5 w-5 text-blue-400" />;
      case "update":
        return <Activity className="h-5 w-5 text-yellow-400" />;
      case "delete":
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case "respond":
        return <MessageSquare className="h-5 w-5 text-purple-400" />;
      case "close":
        return <X className="h-5 w-5 text-gray-400" />;
      case "escalate":
        return <TrendingUp className="h-5 w-5 text-orange-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Admin Dashboard</h1>
          <p className="text-gray-400">
            Welcome back, {user?.displayName || "Admin"}!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Support Requests
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total support tickets
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-end">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {supportStats.totalRequests}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Requests
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Pending Requests
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Awaiting technician assignment
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-end">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {supportStats.pendingRequests}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Pending
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Completed
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Successfully resolved
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-end">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {supportStats.completedRequests}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Completed
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Completion Rate
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Average resolution time
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-end">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {completionRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Completion Rate
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Support Requests by Type */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Support Requests by Type
            </h3>
            <div className="mt-2">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={supportRequestData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {supportRequestData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Support Requests Trend
            </h3>
            <div className="mt-2">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={revenueData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="requests"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activities and Support Requests Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activities
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">
                View All Activities
              </button>
            </div>
          </div>

          {/* Support Requests Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Support Requests
              </h3>
              <div className="flex space-x-2">
                <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">
                  <Filter className="w-4 h-4 mr-1" />
                  Filter
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Issue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {supportRequests.slice(0, 5).map((request) => (
                    <tr
                      key={request.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {request.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              {request.customer_name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {request.problem_description?.substring(0, 50)}
                          {request.problem_description?.length > 50 && "..."}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            request.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : request.status === "in_progress"
                                ? "bg-blue-100 text-blue-800"
                                : request.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status.charAt(0).toUpperCase() +
                            request.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              {request.assigned_to?.user?.username
                                ?.charAt(0)
                                .toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                          <Eye className="w-4 h-4 mr-1" />
                        </button>
                        <button className="text-green-600 hover:text-green-800 dark:text-green-400 ml-2">
                          <Edit className="w-4 h-4 mr-1" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 dark:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">
                View All Requests
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
