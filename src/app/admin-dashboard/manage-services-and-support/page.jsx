"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/app/contexts/FirebaseAuthContext";
import { toast } from "react-hot-toast";
import {
    Home,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    User,
    Droplets,
    Wrench,
    FileText,
    ChevronRight,
    ArrowLeft,
    Loader2,
    Image,
    Video,
    X,
    Settings,
    Shield,
    Filter,
    Search,
    Plus,
    Edit,
    Trash2,
    Eye,
    UserCheck,
    Users,
    BarChart3,
    TrendingUp,
    Activity,
    Download,
    RefreshCw,
    CheckSquare,
    AlertTriangle,
    CalendarDays,
    MailOpen,
    MessageSquare,
    ChevronDown,
    Star,
} from "lucide-react";
import Link from "next/link";

export default function ManageServicesAndSupport() {
    const { user } = useFirebaseAuth();
    const router = useRouter();
    const [serviceRequests, setServiceRequests] = useState([]); // Ensure it's always an array
    const [technicians, setTechnicians] = useState([]); // Ensure it's always an array
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showRequestDetails, setShowRequestDetails] = useState(false);
    const [showAssignTechnician, setShowAssignTechnician] = useState(false);
    const [showStatusUpdate, setShowStatusUpdate] = useState(false);
    const [selectedTechnician, setSelectedTechnician] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [serviceRequestsEnabled, setServiceRequestsEnabled] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [settingsLoading, setSettingsLoading] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [supportData, setSupportData] = useState(null);

    // Get the user's Firebase token
    useEffect(() => {
        if (user) {
            user.getIdToken().then(token => {
                setAuthToken(token);
            }).catch(error => {
                console.error("Error getting ID token:", error);
            });
        }
    }, [user]);

    // Fetch service requests and technicians
    useEffect(() => {
        if (authToken) {
            fetchServiceRequests();
            fetchTechnicians();
            fetchServiceRequestsSettings();
        }
    }, [authToken]);

    const fetchWithAuth = async (url, options = {}) => {
        try {
            const token = await user.getIdToken(true); // Force refresh token

            const response = await fetch(url, {
                ...options,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    ...options.headers,
                },
            });

            if (response.status === 401) {
                // Token might be expired, try to refresh user session
                await user.reload();
                const newToken = await user.getIdToken(true);

                // Retry the request with new token
                const retryResponse = await fetch(url, {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${newToken}`,
                        ...options.headers,
                    },
                });

                return retryResponse;
            }

            return response;
        } catch (error) {
            console.error("Auth fetch error:", error);
            throw error;
        }
    };

    const fetchServiceRequests = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/auth/support/`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Service requests data:", data); // Log the actual data structure

                // Store the support data
                setSupportData(data);

                // Since this endpoint returns support configuration, not service requests
                // We need to fetch the actual service requests from a different endpoint
                // Let's try to get them from the assignments endpoint
                const assignmentsResponse = await fetchWithAuth(`http://127.0.0.1:8000/api/auth/assignments/`, {
                    method: "GET",
                });

                if (assignmentsResponse.ok) {
                    const assignmentsData = await assignmentsResponse.json();
                    console.log("Assignments data:", assignmentsData);

                    // Handle different response structures
                    let requestsArray = [];

                    if (Array.isArray(assignmentsData)) {
                        // Direct array response
                        requestsArray = assignmentsData;
                    } else if (assignmentsData && assignmentsData.results && Array.isArray(assignmentsData.results)) {
                        // Paginated response with results property
                        requestsArray = assignmentsData.results;
                    } else if (assignmentsData && Array.isArray(Object.values(assignmentsData))) {
                        // Object with array values
                        const values = Object.values(assignmentsData);
                        if (values.length > 0 && Array.isArray(values[0])) {
                            requestsArray = values[0];
                        }
                    }

                    setServiceRequests(requestsArray);
                } else {
                    console.error("Failed to fetch assignments");
                    setServiceRequests([]); // Fallback to empty array
                }
            } else {
                const errorData = await response.json().catch(() => ({}));
                toast.error(errorData.error || "Failed to fetch service requests");
                setServiceRequests([]); // Fallback to empty array
            }
        } catch (error) {
            console.error("Error fetching service requests:", error);
            toast.error("Failed to fetch service requests");
            setServiceRequests([]); // Fallback to empty array
        } finally {
            setLoading(false);
        }
    };

    const fetchTechnicians = async () => {
        try {
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/technicians/`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Technicians data:", data); // Log the actual data structure

                // Handle different response structures
                let techniciansArray = [];

                if (Array.isArray(data)) {
                    // Direct array response
                    techniciansArray = data;
                } else if (data && data.results && Array.isArray(data.results)) {
                    // Paginated response with results property
                    techniciansArray = data.results;
                } else if (data && Array.isArray(Object.values(data))) {
                    // Object with array values
                    const values = Object.values(data);
                    if (values.length > 0 && Array.isArray(values[0])) {
                        techniciansArray = values[0];
                    }
                } else {
                    console.error("Technicians data is not an array:", data);
                    setTechnicians([]); // Fallback to empty array
                    return;
                }

                setTechnicians(techniciansArray);
            } else {
                const errorData = await response.json().catch(() => ({}));
                toast.error(errorData.error || "Failed to fetch technicians");
                setTechnicians([]); // Fallback to empty array
            }
        } catch (error) {
            console.error("Error fetching technicians:", error);
            toast.error("Failed to fetch technicians");
            setTechnicians([]); // Fallback to empty array
        }
    };

    const fetchServiceRequestsSettings = async () => {
        try {
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/settings/service-requests/`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                setServiceRequestsEnabled(data.enabled);
            } else {
                console.error("Failed to fetch service requests settings");
            }
        } catch (error) {
            console.error("Error fetching service requests settings:", error);
        }
    };

    const updateServiceRequestsSettings = async (enabled) => {
        try {
            setSettingsLoading(true);
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/settings/service-requests/`, {
                method: "PATCH",
                body: JSON.stringify({ enabled }),
            });

            if (response.ok) {
                setServiceRequestsEnabled(enabled);
                toast.success(`Service requests ${enabled ? "enabled" : "disabled"} for customers`);
            } else {
                toast.error("Failed to update service requests settings");
            }
        } catch (error) {
            console.error("Error updating service requests settings:", error);
            toast.error("Failed to update service requests settings");
        } finally {
            setSettingsLoading(false);
        }
    };

    const updateRequestStatus = async (requestId, status) => {
        try {
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/service-requests/${requestId}/`, {
                method: "PATCH",
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                toast.success("Status updated successfully");
                fetchServiceRequests();
                setShowStatusUpdate(false);
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const assignTechnician = async (requestId, technicianId) => {
        try {
            const response = await fetchWithAuth(`http://127.0.0.1:8000/api/service-requests/${requestId}/assign/`, {
                method: "PATCH",
                body: JSON.stringify({ technician_id: technicianId }),
            });

            if (response.ok) {
                toast.success("Technician assigned successfully");
                fetchServiceRequests();
                setShowAssignTechnician(false);
            } else {
                toast.error("Failed to assign technician");
            }
        } catch (error) {
            console.error("Error assigning technician:", error);
            toast.error("Failed to assign technician");
        }
    };

    const deleteRequest = async (requestId) => {
        if (confirm("Are you sure you want to delete this service request?")) {
            try {
                const response = await fetchWithAuth(`http://127.0.0.1:8000/api/service-requests/${requestId}/`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    toast.success("Service request deleted successfully");
                    fetchServiceRequests();
                } else {
                    toast.error("Failed to delete service request");
                }
            } catch (error) {
                console.error("Error deleting request:", error);
                toast.error("Failed to delete service request");
            }
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case "assigned":
                return <User className="w-5 h-5 text-cyan-500" />;
            case "in_progress":
                return <Wrench className="w-5 h-5 text-indigo-500" />;
            case "completed":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "cancelled":
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <AlertCircle className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
            case "assigned":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
            case "in_progress":
                return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400";
            case "completed":
                return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
            case "cancelled":
                return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
        }
    };

    const getFilteredRequests = () => {
        // Ensure serviceRequests is an array before filtering
        if (!Array.isArray(serviceRequests)) {
            console.error("serviceRequests is not an array:", serviceRequests);
            return [];
        }

        if (filterStatus === "all") return serviceRequests;
        return serviceRequests.filter(request =>
            request && request.status === filterStatus
        );
    };

    const getStatusCount = (status) => {
        // Ensure serviceRequests is an array before counting
        if (!Array.isArray(serviceRequests)) {
            return 0;
        }
        return serviceRequests.filter(request =>
            request && request.status === status
        ).length;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/admin-dashboard"
                            className="text-white hover:text-cyan-100"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">Manage Services</h1>
                            <p className="text-cyan-100">
                                Monitor and manage all service requests
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Droplets className="w-8 h-8" />
                        <span className="text-xl font-semibold">Service Management</span>
                    </div>
                </div>
            </div>

            {/* Support Information Card */}
            {supportData && (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Support Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Support Link</h3>
                            <a
                                href={supportData.support_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-600 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300"
                            >
                                {supportData.support_link}
                            </a>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">QR Code</h3>
                            <div className="flex items-center space-x-4">
                                {supportData.qr_code && (
                                    <img
                                        src={`data:image/png;base64,${supportData.qr_code}`}
                                        alt="Support QR Code"
                                        className="h-20 w-20 object-contain"
                                    />
                                )}
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Scan this QR code for support
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Total Requests
                            </p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                {serviceRequests?.length || 0}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Pending
                            </p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                {getStatusCount("pending")}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                            <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                In Progress
                            </p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                {getStatusCount("in_progress")}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center">
                            <Wrench className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                Completed
                            </p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                {getStatusCount("completed")}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                    >
                        <Settings className="w-4 h-4" />
                        Settings
                    </button>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search service requests..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full sm:w-64"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${showFilters
                            ? "bg-cyan-100 text-cyan-700 border-cyan-300"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                            }`}
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filters</span>
                    </button>
                    <button
                        onClick={() => fetchServiceRequests()}
                        className="p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Filter Options */}
            {showFilters && (
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                        <button
                            onClick={() => setFilterStatus("all")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "all"
                                ? "bg-cyan-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            All Requests
                        </button>
                        <button
                            onClick={() => setFilterStatus("pending")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "pending"
                                ? "bg-yellow-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilterStatus("assigned")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "assigned"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Assigned
                        </button>
                        <button
                            onClick={() => setFilterStatus("in_progress")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "in_progress"
                                ? "bg-indigo-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            In Progress
                        </button>
                        <button
                            onClick={() => setFilterStatus("completed")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "completed"
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => setFilterStatus("cancelled")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "cancelled"
                                ? "bg-red-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            Cancelled
                        </button>
                    </div>
                </div>
            )}

            {/* Service Requests Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Service Requests
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-900/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Request ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Service Area
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Created At
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {getFilteredRequests().length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center">
                                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                            <p className="text-gray-500">No service requests found</p>
                                        </td>
                                    </tr>
                                ) : (
                                    getFilteredRequests().map((request) => (
                                        <tr
                                            key={request.id}
                                            className="hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-slate-900 dark:text-white">
                                                    #{request.id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-slate-900 dark:text-white">
                                                    {request.customer?.name || "N/A"}
                                                </div>
                                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                                    {request.customer?.email || "N/A"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-slate-900 dark:text-white max-w-xs truncate">
                                                    {request.problem_description}
                                                </div>
                                                {/* Display Images */}
                                                {request.images && request.images.length > 0 && (
                                                    <div className="flex space-x-1 mt-1">
                                                        {request.images.slice(0, 3).map((image, index) => (
                                                            <img
                                                                key={index}
                                                                src={image.image}
                                                                alt={`Service request image ${index}`}
                                                                className="h-8 w-8 object-cover rounded"
                                                            />
                                                        ))}
                                                        {request.images.length > 3 && (
                                                            <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center text-xs">
                                                                +{request.images.length - 3}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-slate-900 dark:text-white">
                                                    {request.service_area || "Not specified"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                        request.status,
                                                    )}`}
                                                >
                                                    {request.status?.replace("_", " ").toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-slate-900 dark:text-white">
                                                    {new Date(request.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedRequest(request);
                                                            setShowRequestDetails(true);
                                                        }}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedRequest(request);
                                                            setShowAssignTechnician(true);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                        title="Assign Technician"
                                                    >
                                                        <UserCheck className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedRequest(request);
                                                            setShowStatusUpdate(true);
                                                        }}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        title="Update Status"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteRequest(request.id)}
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        title="Delete Request"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Analytics and Technicians Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Service Analytics */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Service Analytics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Response Time</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">24 hours avg</p>
                                </div>
                                <Clock className="w-8 h-8 text-cyan-600" />
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Completion Rate</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">87%</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Customer Satisfaction</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">4.8/5</p>
                                </div>
                                <Star className="w-8 h-8 text-yellow-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technicians */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Technicians</h2>
                    <div className="space-y-3">
                        {technicians.slice(0, 3).map((technician) => (
                            <div key={technician.id} className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-bold">
                                    {technician.first_name?.charAt(0) || "T"}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        {technician.first_name} {technician.last_name}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {technician.specialization}
                                    </p>
                                    <div className="flex items-center mt-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                        <span className="text-xs text-green-600">Available</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={() => router.push("/admin-dashboard/manage-technicians")}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                        >
                            <Users className="w-5 h-5" />
                            <span>Manage Technicians</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Request Details Modal */}
            {showRequestDetails && selectedRequest && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Service Request Details</h2>
                            <button
                                onClick={() => setShowRequestDetails(false)}
                                className="text-white hover:text-cyan-100"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Request ID</h3>
                                    <p className="text-slate-900 dark:text-white">{selectedRequest.id}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Customer</h3>
                                    <p className="text-slate-900 dark:text-white">{selectedRequest.customer?.name || "N/A"}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{selectedRequest.customer?.email || "N/A"}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{selectedRequest.customer?.phone || "N/A"}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</h3>
                                    <p className="text-slate-900 dark:text-white">{selectedRequest.problem_description}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Service Area</h3>
                                    <p className="text-slate-900 dark:text-white">{selectedRequest.service_area || "N/A"}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Created At</h3>
                                    <p className="text-slate-900 dark:text-white">
                                        {new Date(selectedRequest.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</h3>
                                    <div className="flex items-center mt-1">
                                        {getStatusIcon(selectedRequest.status)}
                                        <span className="ml-2">{selectedRequest.status?.replace("_", " ")}</span>
                                    </div>
                                </div>
                                {selectedRequest.technician && (
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-4">Assigned Technician</h3>
                                        <p className="text-slate-900 dark:text-white">{selectedRequest.technician.name}</p>
                                    </div>
                                )}
                                {selectedRequest.notes && (
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-4">Notes</h3>
                                        <p className="text-slate-900 dark:text-white">{selectedRequest.notes}</p>
                                    </div>
                                )}

                                {/* Display Images */}
                                {selectedRequest.images && selectedRequest.images.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-4">Images</h3>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            {selectedRequest.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image.image}
                                                    alt={`Service request image ${index}`}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Display Videos */}
                                {selectedRequest.videos && selectedRequest.videos.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-4">Videos</h3>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            {selectedRequest.videos.map((video, index) => (
                                                <video
                                                    key={index}
                                                    src={video.video}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                    controls
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Technician Modal */}
            {showAssignTechnician && selectedRequest && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Assign Technician</h2>
                            <button
                                onClick={() => setShowAssignTechnician(false)}
                                className="text-white hover:text-cyan-100"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                                    Request #{selectedRequest.id}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {selectedRequest.problem_description}
                                </p>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="technician"
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                                >
                                    Select Technician
                                </label>
                                <select
                                    id="technician"
                                    value={selectedTechnician}
                                    onChange={(e) => setSelectedTechnician(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                >
                                    <option value="">Select a technician</option>
                                    {technicians.map((technician) => (
                                        <option key={technician.id} value={technician.id}>
                                            {technician.first_name} {technician.last_name} - {technician.specialization}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2 mt-6">
                                <button
                                    onClick={() => setShowAssignTechnician(false)}
                                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        assignTechnician(selectedRequest.id, selectedTechnician);
                                    }}
                                    disabled={!selectedTechnician}
                                    className={`px-4 py-2 rounded-md text-white ${selectedTechnician
                                        ? "bg-cyan-600 hover:bg-cyan-700"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                >
                                    Assign
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Status Update Modal */}
            {showStatusUpdate && selectedRequest && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Update Status</h2>
                            <button
                                onClick={() => setShowStatusUpdate(false)}
                                className="text-white hover:text-cyan-100"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="mb-4">
                                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                                    Request #{selectedRequest.id}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {selectedRequest.problem_description}
                                </p>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                                >
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="assigned">Assigned</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2 mt-6">
                                <button
                                    onClick={() => setShowStatusUpdate(false)}
                                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        updateRequestStatus(selectedRequest.id, selectedStatus);
                                    }}
                                    disabled={!selectedStatus}
                                    className={`px-4 py-2 rounded-md text-white ${selectedStatus
                                        ? "bg-cyan-600 hover:bg-cyan-700"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Service Settings</h2>
                            <button
                                onClick={() => setShowSettings(false)}
                                className="text-white hover:text-cyan-100"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                                    Service Requests for Customers
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-4">
                                    Enable or disable the ability for customers to submit service requests
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-700 dark:text-slate-300">Status:</span>
                                <button
                                    onClick={() => updateServiceRequestsSettings(!serviceRequestsEnabled)}
                                    disabled={settingsLoading}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${serviceRequestsEnabled
                                        ? "bg-cyan-600"
                                        : "bg-gray-200"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${serviceRequestsEnabled ? "translate-x-6" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                                <span
                                    className={`ml-3 text-sm font-medium ${serviceRequestsEnabled
                                        ? "text-green-600"
                                        : "text-red-600"
                                        }`}
                                >
                                    {serviceRequestsEnabled ? "Enabled" : "Disabled"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
