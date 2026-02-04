"use client";

import { useState, useEffect } from "react";
import { useFirebaseAuth } from "@/app/contexts/FirebaseAuthContext";
import { toast } from "react-hot-toast";
import {
  Users,
  UserCheck,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Briefcase,
  DollarSign,
  TrendingUp,
  UserX,
  UserPlus,
  ChevronDown,
  X,
  Save,
} from "lucide-react";

// Define the component first
function ManageTechnicians() {
  const { user } = useFirebaseAuth();
  const [technicians, setTechnicians] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDivision, setFilterDivision] = useState("all");
  const [stats, setStats] = useState({});

  // Form states
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    category: "",
    assigned_to: "",
    client_name: "",
    client_phone: "",
    client_email: "",
    client_address: "",
    division: "",
    district: "",
    thana: "",
    full_address: "",
    scheduled_date: "",
    estimated_duration: "",
    priority: "medium",
    estimated_cost: "",
    admin_notes: "",
  });
  console.log(user);
  // Fetch data
  useEffect(() => {
    if (user) {
      fetchTechnicians();
      fetchAssignments();
      fetchCategories();
    }
  }, [user]);

  // Helper function for authenticated API calls
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

  const fetchTechnicians = async () => {
    try {
      const response = await fetchWithAuth(
        "http://127.0.0.1:8000/api/auth/users/firebase/",
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Technicians data:", data);

        // Filter for technicians only (role: provider or servicer)
        const techniciansOnly = data.results.filter(
          (user) =>
            user.profile &&
            (user.profile.role === "provider" ||
              user.profile.role === "servicer"),
        );

        setTechnicians(techniciansOnly);

        // Calculate stats
        const stats = {
          total_technicians: techniciansOnly.length,
          available_now: techniciansOnly.filter((t) => t.profile.is_available)
            .length,
          assigned_assignments: 0, // Will be updated after fetching assignments
          in_progress_assignments: 0, // Will be updated after fetching assignments
          completed_assignments: 0, // Will be updated after fetching assignments
        };

        setStats(stats);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to fetch technicians");
      }
    } catch (error) {
      console.error("Fetch technicians error:", error);
      toast.error("Failed to fetch technicians");
    } finally {
      // setLoading(false);
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await fetchWithAuth(
        "http://127.0.0.1:8000/api/auth/assignments/",
      );

      if (response.ok) {
        const data = await response.json();
        setAssignments(data);

        // Update stats with assignment counts
        const assignedCount = data.filter(
          (a) => a.status === "assigned",
        ).length;
        const inProgressCount = data.filter(
          (a) => a.status === "in_progress",
        ).length;
        const completedCount = data.filter(
          (a) => a.status === "completed",
        ).length;

        setStats((prevStats) => ({
          ...prevStats,
          assigned_assignments: assignedCount,
          in_progress_assignments: inProgressCount,
          completed_assignments: completedCount,
        }));
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to fetch assignments");
      }
    } catch (error) {
      console.error("Fetch assignments error:", error);
      toast.error("Failed to fetch assignments");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetchWithAuth(
        "http://127.0.0.1:8000/api/auth/work-categories/",
      );

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("Fetch categories error:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleAssignWork = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth(
        "http://127.0.0.1:8000/api/auth/assignments/",
        {
          method: "POST",
          body: JSON.stringify(assignmentForm),
        },
      );

      if (response.ok) {
        toast.success("Work assigned successfully!");
        setShowAssignModal(false);
        resetForm();
        fetchAssignments();
        fetchTechnicians();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to assign work");
      }
    } catch (error) {
      console.error("Assign work error:", error);
      toast.error("Failed to assign work");
    }
  };

  const updateAssignmentStatus = async (
    assignmentId,
    newStatus,
    notes = "",
  ) => {
    try {
      const response = await fetchWithAuth(
        `http://127.0.0.1:8000/api/auth/assignments/${assignmentId}/`,
        {
          method: "PUT",
          body: JSON.stringify({ status: newStatus, status_notes: notes }),
        },
      );

      if (response.ok) {
        toast.success(`Status updated to ${newStatus}`);
        fetchAssignments();
        fetchTechnicians();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Update status error:", error);
      toast.error("Failed to update status");
    }
  };

  const resetForm = () => {
    setAssignmentForm({
      title: "",
      description: "",
      category: "",
      assigned_to: "",
      client_name: "",
      client_phone: "",
      client_email: "",
      client_address: "",
      division: "",
      district: "",
      thana: "",
      full_address: "",
      scheduled_date: "",
      estimated_duration: "",
      priority: "medium",
      estimated_cost: "",
      admin_notes: "",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400";
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      case "medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const filteredTechnicians = technicians?.filter((tech) => {
    const matchesSearch =
      tech.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.profile?.phone?.includes(searchTerm);
    const matchesDivision =
      filterDivision === "all" ||
      tech.profile?.service_area_division === filterDivision;
    return matchesSearch && matchesDivision;
  });

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesStatus =
      filterStatus === "all" || assignment.status === filterStatus;
    return matchesStatus;
  });

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-64">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Technicians
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {stats.total_technicians || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Available Now
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {stats.available_now || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Active Assignments
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {(stats.assigned_assignments || 0) +
                  (stats.in_progress_assignments || 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Completed Today
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {stats.completed_assignments || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-3">
          <button
            onClick={() => setShowAssignModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Assign New Work
          </button>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search technicians..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Technicians Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Service Providers
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Technician
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Service Area
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Workload
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredTechnicians.map((tech) => (
                <tr
                  key={tech.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {tech.first_name} {tech.last_name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        @{tech.username}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 dark:text-white">
                      {tech.profile?.phone || "N/A"}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {tech.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 dark:text-white">
                      {tech.profile?.service_area_division || "N/A"}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {tech.profile?.service_area_district}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        tech.profile?.is_available
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                      }`}
                    >
                      {tech.profile?.is_available ? "Available" : "Busy"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 dark:text-white">
                      {
                        assignments.filter(
                          (a) =>
                            a.assigned_to === tech.id &&
                            (a.status === "assigned" ||
                              a.status === "in_progress"),
                        ).length
                      }{" "}
                      active
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {
                        assignments.filter(
                          (a) =>
                            a.assigned_to === tech.id &&
                            a.status === "completed",
                        ).length
                      }{" "}
                      completed
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span className="ml-1 text-sm text-slate-900 dark:text-white">
                        {tech.profile?.service_rating?.toFixed(1) || "0.0"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedTechnician(tech);
                          setAssignmentForm({
                            ...assignmentForm,
                            assigned_to: tech.id,
                          });
                          setShowAssignModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Assign Work"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTechnician(tech);
                          setShowViewModal(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Assignments */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Recent Assignments
          </h2>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {filteredAssignments.slice(0, 10).map((assignment) => (
            <div
              key={assignment.id}
              className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {assignment.title}
                    </h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assignment.status)}`}
                    >
                      {assignment.status.replace("_", " ")}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(assignment.priority)}`}
                    >
                      {assignment.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {assignment.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <UserCheck className="w-3 h-3" />
                      {assignment.assigned_to_name || "Unassigned"}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {assignment.client_name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(assignment.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {assignment.status === "pending" && (
                    <button
                      onClick={() =>
                        updateAssignmentStatus(assignment.id, "assigned")
                      }
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Assign
                    </button>
                  )}
                  {assignment.status === "assigned" && (
                    <button
                      onClick={() =>
                        updateAssignmentStatus(assignment.id, "in_progress")
                      }
                      className="px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      Start
                    </button>
                  )}
                  {assignment.status === "in_progress" && (
                    <button
                      onClick={() =>
                        updateAssignmentStatus(assignment.id, "completed")
                      }
                      className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedAssignment(assignment);
                      setShowViewModal(true);
                    }}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assign Work Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Assign New Work
                </h2>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleAssignWork} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Work Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={assignmentForm.title}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={assignmentForm.category}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Assign To *
                  </label>
                  <select
                    required
                    value={assignmentForm.assigned_to}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        assigned_to: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Technician</option>
                    {technicians
                      .filter((tech) => tech.profile?.is_available)
                      .map((tech) => (
                        <option key={tech.id} value={tech.id}>
                          {tech.first_name} {tech.last_name} -{" "}
                          {tech.profile?.service_area_division}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={assignmentForm.priority}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        priority: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={assignmentForm.description}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={assignmentForm.client_name}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        client_name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Client Phone
                  </label>
                  <input
                    type="tel"
                    value={assignmentForm.client_phone}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        client_phone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Scheduled Date
                  </label>
                  <input
                    type="datetime-local"
                    value={assignmentForm.scheduled_date}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        scheduled_date: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2 hours, 1 day"
                    value={assignmentForm.estimated_duration}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        estimated_duration: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Division
                  </label>
                  <input
                    type="text"
                    value={assignmentForm.division}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        division: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    value={assignmentForm.district}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        district: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Full Address
                  </label>
                  <textarea
                    rows={2}
                    value={assignmentForm.full_address}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        full_address: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Estimated Cost
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={assignmentForm.estimated_cost}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        estimated_cost: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Admin Notes
                  </label>
                  <textarea
                    rows={2}
                    value={assignmentForm.admin_notes}
                    onChange={(e) =>
                      setAssignmentForm({
                        ...assignmentForm,
                        admin_notes: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAssignModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Assign Work
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewModal && (selectedTechnician || selectedAssignment) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {selectedTechnician
                    ? "Technician Details"
                    : "Assignment Details"}
                </h2>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedTechnician(null);
                    setSelectedAssignment(null);
                  }}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedTechnician && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {selectedTechnician.first_name?.[0]}
                      {selectedTechnician.last_name?.[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {selectedTechnician.first_name}{" "}
                        {selectedTechnician.last_name}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400">
                        @{selectedTechnician.username}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedTechnician.profile?.is_available
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          }`}
                        >
                          {selectedTechnician.profile?.is_available
                            ? "Available"
                            : "Busy"}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-amber-500 fill-current" />
                          <span className="ml-1 text-sm text-slate-600 dark:text-slate-400">
                            {selectedTechnician.profile?.service_rating?.toFixed(
                              1,
                            ) || "0.0"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {selectedTechnician.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Phone
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {selectedTechnician.profile?.phone || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Service Area
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {selectedTechnician.profile?.service_area_division},{" "}
                        {selectedTechnician.profile?.service_area_district}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Work Statistics
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {
                          assignments.filter(
                            (a) =>
                              a.assigned_to === selectedTechnician.id &&
                              (a.status === "assigned" ||
                                a.status === "in_progress"),
                          ).length
                        }{" "}
                        active,{" "}
                        {
                          assignments.filter(
                            (a) =>
                              a.assigned_to === selectedTechnician.id &&
                              a.status === "completed",
                          ).length
                        }{" "}
                        completed
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedAssignment && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {selectedAssignment.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedAssignment.status)}`}
                      >
                        {selectedAssignment.status.replace("_", " ")}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedAssignment.priority)}`}
                      >
                        {selectedAssignment.priority}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Description
                    </p>
                    <p className="text-slate-900 dark:text-white">
                      {selectedAssignment.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Client
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {selectedAssignment.client_name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {selectedAssignment.client_phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Assigned To
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {selectedAssignment.assigned_to_name || "Unassigned"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Location
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {selectedAssignment.division},{" "}
                        {selectedAssignment.district}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Schedule
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {selectedAssignment.scheduled_date
                          ? new Date(
                              selectedAssignment.scheduled_date,
                            ).toLocaleString()
                          : "Not scheduled"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Cost
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        ${selectedAssignment.estimated_cost || "Not estimated"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Created
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {new Date(
                          selectedAssignment.created_at,
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {selectedAssignment.admin_notes && (
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Admin Notes
                      </p>
                      <p className="text-slate-900 dark:text-white">
                        {selectedAssignment.admin_notes}
                      </p>
                    </div>
                  )}

                  {selectedAssignment.history &&
                    selectedAssignment.history.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          History
                        </p>
                        <div className="space-y-2">
                          {selectedAssignment.history.map((item) => (
                            <div
                              key={item.id}
                              className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                  {item.old_status} → {item.new_status}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {new Date(item.timestamp).toLocaleString()}
                                </span>
                              </div>
                              {item.notes && (
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                  {item.notes}
                                </p>
                              )}
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                by {item.changed_by_name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export the component as default
export default ManageTechnicians;
