// app/support/[user_id]/[unique_id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
} from "lucide-react";
import Link from "next/link";

export default function ServiceRequestPage() {
  const { user, loading } = useFirebaseAuth();
  const params = useParams();
  const router = useRouter();
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedThana, setSelectedThana] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    device_type: "",
    issue_description: "",
    address: "",
    contact_number: "",
    preferred_date: "",
    preferred_time: "",
    urgency: "medium",
  });

  // Check if the user is authorized to view this page
  useEffect(() => {
    // if (!loading) {
    //   if (!user) {
    //     toast.error("You must be logged in to access this page");
    //     router.push("/login");
    //     return;
    //   }

    //   // Check if the user ID in the URL matches the current user's ID
    //   if (user.uid !== params.user_id) {
    //     toast.error("You are not authorized to access this page");
    //     router.push("/dashboard");
    //     return;
    //   }

    //   // Fetch user profile and service requests
    //   fetchUserProfile();
    //   fetchServiceRequests();
    //   fetchDivisions();
    // }
    fetchUserProfile();
    fetchServiceRequests();
    fetchDivisions();
  }, [user, loading, params.user_id, router]);

  const fetchUserProfile = async () => {
    try {
      const token = await user.getIdToken();
      const response = await fetch(`http://127.0.0.1:8000/api/auth/me/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
        // Pre-fill form with user's phone number if available
        if (data.profile?.phone) {
          setFormData((prev) => ({
            ...prev,
            contact_number: data.profile.phone,
          }));
        }
      } else {
        toast.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile");
    }
  };

  const fetchServiceRequests = async () => {
    try {
      const token = await user.getIdToken();
      const response = await fetch(
        `http://127.0.0.1:8000/api/service-requests/user/${params.user_id}/`,
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
        setServiceRequests(data);
      } else {
        toast.error("Failed to fetch service requests");
      }
    } catch (error) {
      console.error("Error fetching service requests:", error);
      toast.error("Failed to fetch service requests");
    } finally {
      setLoadingRequests(false);
    }
  };

  const fetchDivisions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/divisions/");
      if (response.ok) {
        const data = await response.json();
        setDivisions(data);
      } else {
        toast.error("Failed to fetch divisions");
      }
    } catch (error) {
      console.error("Error fetching divisions:", error);
      toast.error("Failed to fetch divisions");
    }
  };

  const fetchDistricts = async (divisionId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/districts/?division_id=${divisionId}`,
      );
      if (response.ok) {
        const data = await response.json();
        setDistricts(data);
        setThanas([]); // Reset thanas when division changes
        setSelectedDistrict("");
        setSelectedThana("");
      } else {
        toast.error("Failed to fetch districts");
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      toast.error("Failed to fetch districts");
    }
  };

  const fetchThanas = async (districtId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/thanas/?district_id=${districtId}`,
      );
      if (response.ok) {
        const data = await response.json();
        setThanas(data);
        setSelectedThana(""); // Reset selected thana when district changes
      } else {
        toast.error("Failed to fetch thanas");
      }
    } catch (error) {
      console.error("Error fetching thanas:", error);
      toast.error("Failed to fetch thanas");
    }
  };

  const handleDivisionChange = (e) => {
    const divisionId = e.target.value;
    setSelectedDivision(divisionId);
    fetchDistricts(divisionId);
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    fetchThanas(districtId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = await user.getIdToken();
      const requestData = {
        ...formData,
        user_id: params.user_id,
        division: selectedDivision,
        district: selectedDistrict,
        thana: selectedThana,
      };

      const response = await fetch(
        "http://127.0.0.1:8000/api/service-requests/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        },
      );

      if (response.ok) {
        toast.success("Service request submitted successfully");
        setShowForm(false);
        // Reset form
        setFormData({
          device_type: "",
          issue_description: "",
          address: "",
          contact_number: userProfile?.profile?.phone || "",
          preferred_date: "",
          preferred_time: "",
          urgency: "medium",
        });
        setSelectedDivision("");
        setSelectedDistrict("");
        setSelectedThana("");
        // Fetch updated service requests
        fetchServiceRequests();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to submit service request");
      }
    } catch (error) {
      console.error("Error submitting service request:", error);
      toast.error("Failed to submit service request");
    } finally {
      setIsSubmitting(false);
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
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400";
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

  if (loading || loadingRequests) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-cyan-500 mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading service requests...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-cyan-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-white hover:text-cyan-100"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Water Purifier Service</h1>
                <p className="text-cyan-100">
                  Request service for your damaged water purifier device
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Droplets className="w-8 h-8" />
              <span className="text-xl font-semibold">AquaPure Service</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Request Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Service Requests
                </h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  {showForm ? "Cancel" : "New Request"}
                </button>
              </div>

              {showForm && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="device_type"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Device Type
                    </label>
                    <select
                      id="device_type"
                      name="device_type"
                      value={formData.device_type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Select Device Type</option>
                      <option value="ro_system">RO System</option>
                      <option value="uv_purifier">UV Purifier</option>
                      <option value="gravity_filter">Gravity Filter</option>
                      <option value="tap_filter">Tap Filter</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="issue_description"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Issue Description
                    </label>
                    <textarea
                      id="issue_description"
                      name="issue_description"
                      value={formData.issue_description}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Describe the issue with your water purifier..."
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="division"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Division
                      </label>
                      <select
                        id="division"
                        value={selectedDivision}
                        onChange={handleDivisionChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Select Division</option>
                        {divisions.map((division) => (
                          <option key={division.id} value={division.id}>
                            {division.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="district"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        District
                      </label>
                      <select
                        id="district"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        required
                        disabled={!selectedDivision}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50"
                      >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="thana"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Thana
                      </label>
                      <select
                        id="thana"
                        value={selectedThana}
                        onChange={(e) => setSelectedThana(e.target.value)}
                        required
                        disabled={!selectedDistrict}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50"
                      >
                        <option value="">Select Thana</option>
                        {thanas.map((thana) => (
                          <option key={thana.id} value={thana.id}>
                            {thana.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Detailed Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={2}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your detailed address..."
                    ></textarea>
                  </div>

                  <div>
                    <label
                      htmlFor="contact_number"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="contact_number"
                      name="contact_number"
                      value={formData.contact_number}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Your contact number"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="preferred_date"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="preferred_date"
                        name="preferred_date"
                        value={formData.preferred_date}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="preferred_time"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Preferred Time
                      </label>
                      <select
                        id="preferred_time"
                        name="preferred_time"
                        value={formData.preferred_time}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Select Time</option>
                        <option value="morning">Morning (9AM - 12PM)</option>
                        <option value="afternoon">
                          Afternoon (12PM - 4PM)
                        </option>
                        <option value="evening">Evening (4PM - 7PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="urgency"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Urgency Level
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Service Requests List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Your Service Requests
              </h2>

              {serviceRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Droplets className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    You have not made any service requests yet.
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    Make Your First Request
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {serviceRequests.map((request) => (
                    <div
                      key={request.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {getStatusIcon(request.status)}
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-800 dark:text-white">
                              {request.device_type
                                .replace("_", " ")
                                .toUpperCase()}{" "}
                              - Service Request
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {request.issue_description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(
                                  request.created_at,
                                ).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {request.thana}, {request.district}
                              </div>
                              <div className="flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                {request.contact_number}
                              </div>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            request.status,
                          )}`}
                        >
                          {request.status.replace("_", " ").toUpperCase()}
                        </span>
                      </div>

                      {request.technician && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Assigned Technician: {request.technician.name}
                            </span>
                          </div>
                          {request.technician.phone && (
                            <div className="flex items-center space-x-2 mt-1">
                              <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {request.technician.phone}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {request.notes && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-start space-x-2">
                            <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {request.notes}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* User Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Your Profile
              </h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {userProfile?.first_name?.charAt(0) ||
                    userProfile?.email?.charAt(0) ||
                    "U"}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    {userProfile?.first_name} {userProfile?.last_name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {userProfile?.email}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4 mr-2" />
                  {userProfile?.profile?.phone || "Not provided"}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  {userProfile?.profile?.service_area_thana ||
                    userProfile?.profile?.service_area_district ||
                    "Not provided"}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Service Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Droplets className="w-5 h-5 text-cyan-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      Water Purifier Service
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Our certified technicians provide quick and reliable
                      service for all types of water purifiers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Wrench className="w-5 h-5 text-cyan-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      Expert Technicians
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      All our technicians are certified and experienced in
                      handling water purifier issues.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-cyan-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      Quick Response
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      We respond to service requests within 24 hours and aim to
                      resolve issues on the first visit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
