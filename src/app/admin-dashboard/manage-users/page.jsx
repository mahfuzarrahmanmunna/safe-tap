"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/app/contexts/FirebaseAuthContext";
import axios from "axios";

export default function ManageUsers() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterVerification, setFilterVerification] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [successMessage, setSuccessMessage] = useState("");
  const [userRole, setUserRole] = useState(null);
  const { user, signOut } = useFirebaseAuth();

<<<<<<< HEAD
=======
  // Add state for geographical data
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredThanas, setFilteredThanas] = useState([]);
  const [geoDataLoaded, setGeoDataLoaded] = useState(false);

>>>>>>> a7ec3f6 (added many of things.)
  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      router.push("/login");
      return;
    }

    // Check if user has admin role
    const checkUserRole = async () => {
      try {
        // Get the current user's Firebase ID token
        const token = await user.getIdToken();

        const response = await fetch("http://127.0.0.1:8000/api/auth/me/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUserRole(userData.profile?.role || "customer");

          // Only fetch users if the user is an admin
          if (userData) {
            fetchUsers();
<<<<<<< HEAD
=======
            fetchGeographicalData();
>>>>>>> a7ec3f6 (added many of things.)
          } else {
            setError(
              "You don't have permission to access this page. Admin access required.",
            );
            setLoading(false);
          }
        } else {
          throw new Error("Failed to verify user permissions");
        }
      } catch (err) {
        console.error("Error checking user role:", err);
        setError("Failed to verify permissions. Please log in again.");
        setLoading(false);
      }
    };

    checkUserRole();
  }, [user, router]);

<<<<<<< HEAD
=======
  // Helper function to fetch all pages of a paginated API
  const fetchAllPages = async (url, token) => {
    let allResults = [];
    let nextUrl = url;

    while (nextUrl) {
      const response = await axios.get(nextUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      allResults = [...allResults, ...response.data.results];
      nextUrl = response.data.next;
    }

    return allResults;
  };

  // Fetch geographical data
  const fetchGeographicalData = async () => {
    try {
      // Get the current user's Firebase ID token
      const token = await user.getIdToken();

      // Fetch divisions
      const divisionsResponse = await axios.get(
        "http://127.0.0.1:8000/api/divisions/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setDivisions(divisionsResponse.data.results || []);

      // Fetch all districts (all pages)
      const allDistricts = await fetchAllPages(
        "http://127.0.0.1:8000/api/districts/",
        token
      );
      setDistricts(allDistricts);

      // Fetch all thanas (all pages)
      const allThanas = await fetchAllPages(
        "http://127.0.0.1:8000/api/thanas/",
        token
      );
      setThanas(allThanas);

      setGeoDataLoaded(true);
    } catch (err) {
      console.error("Error fetching geographical data:", err);
      setGeoDataLoaded(true); // Set to true even on error to prevent infinite loading
    }
  };

>>>>>>> a7ec3f6 (added many of things.)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get the current user's Firebase ID token
      const token = await user.getIdToken(true); // Force refresh the token

      console.log("Fetching users with token:", token.substring(0, 20) + "...");

      // Use the Firebase-specific endpoint
      const response = await axios.get(
        "http://127.0.0.1:8000/api/auth/users/firebase/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      console.log("Response status:", response.status);
      const data = response.data;
      console.log("Users data received:", data);
      setUsers(data.results || data || []);
    } catch (err) {
      console.error("Error fetching users:", err);

      // More specific error handling
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);

        if (err.response.status === 401) {
          setError("Authentication failed. Please log in again.");
          // Redirect to login page or trigger re-authentication
          // router.push("/login");
        } else if (err.response.status === 403) {
          setError(
            "You don't have permission to access this resource. Admin access required.",
          );
        } else {
          setError(
            err.response.data?.error ||
<<<<<<< HEAD
              err.response.data?.detail ||
              `Failed to fetch users (Status: ${err.response.status})`,
=======
            err.response.data?.detail ||
            `Failed to fetch users (Status: ${err.response.status})`,
>>>>>>> a7ec3f6 (added many of things.)
          );
        }
      } else if (err.request) {
        console.error("Error request:", err.request);
        setError(
          "Cannot connect to the server. Please make sure the backend server is running.",
        );
      } else {
        console.error("Error message:", err.message);
        setError(err.message || "Failed to fetch users. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditMode(true);
=======
  // Handle division change to filter districts
  const handleDivisionChange = (divisionId) => {
    if (!Array.isArray(districts)) return;

    const filtered = districts.filter(
      (district) => district.division === parseInt(divisionId),
    );
    setFilteredDistricts(filtered);
    setFilteredThanas([]); // Reset thanas when division changes

    // Update selected user with division name
    if (Array.isArray(divisions)) {
      const division = divisions.find((d) => d.id === parseInt(divisionId));
      setSelectedUser({
        ...selectedUser,
        profile: {
          ...selectedUser.profile,
          service_area_division: division ? division.name : "",
          service_area_district: "", // Reset district and thana
          service_area_thana: "",
        },
      });
    }
  };

  // Handle district change to filter thanas
  const handleDistrictChange = (districtId) => {
    if (!Array.isArray(thanas)) return;

    const filtered = thanas.filter(
      (thana) => thana.district === parseInt(districtId),
    );
    setFilteredThanas(filtered);

    // Update selected user with district name
    if (Array.isArray(districts)) {
      const district = districts.find((d) => d.id === parseInt(districtId));
      setSelectedUser({
        ...selectedUser,
        profile: {
          ...selectedUser.profile,
          service_area_district: district ? district.name : "",
          service_area_thana: "", // Reset thana
        },
      });
    }
  };

  // Handle thana change
  const handleThanaChange = (thanaId) => {
    if (!Array.isArray(thanas)) return;

    // Update selected user with thana name
    const thana = thanas.find((t) => t.id === parseInt(thanaId));
    setSelectedUser({
      ...selectedUser,
      profile: {
        ...selectedUser.profile,
        service_area_thana: thana ? thana.name : "",
      },
    });
  };

  // Initialize filtered districts and thanas when editing a user
  const handleEditUser = (user) => {
    // Check if geographical data is loaded
    if (!geoDataLoaded) {
      setError("Geographical data is still loading. Please try again in a moment.");
      return;
    }

    setSelectedUser(user);
    setEditMode(true);

    // Find and set filtered districts based on user's division
    if (user.profile.service_area_division && Array.isArray(divisions)) {
      const division = divisions.find(
        (d) => d.name === user.profile.service_area_division,
      );
      if (division) {
        const filtered = districts.filter(
          (district) => district.division === division.id,
        );
        setFilteredDistricts(filtered);

        // Find and set filtered thanas based on user's district
        if (user.profile.service_area_district) {
          const district = districts.find(
            (d) => d.name === user.profile.service_area_district,
          );
          if (district) {
            const filteredThanas = thanas.filter(
              (thana) => thana.district === district.id,
            );
            setFilteredThanas(filteredThanas);
          }
        }
      }
    }
>>>>>>> a7ec3f6 (added many of things.)
  };

  const handleSaveUser = async () => {
    try {
      let token =
        localStorage.getItem("accessToken") ||
        localStorage.getItem("authToken");

      if (!token && user) {
        try {
          token = await user.getIdToken();
          localStorage.setItem("accessToken", token);
        } catch (error) {
          console.error("Error getting ID token:", error);
        }
      }

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/api/admin/users/${selectedUser.id}/`,
        {
          first_name: selectedUser.first_name,
          last_name: selectedUser.last_name,
          email: selectedUser.email,
          phone: selectedUser.profile.phone,
          role: selectedUser.profile.role,
<<<<<<< HEAD
          is_staff: selectedUser.is_staff, // Add this line
=======
          is_staff: selectedUser.is_staff,
>>>>>>> a7ec3f6 (added many of things.)
          service_area_division: selectedUser.profile.service_area_division,
          service_area_district: selectedUser.profile.service_area_district,
          service_area_thana: selectedUser.profile.service_area_thana,
          address: selectedUser.profile.address,
          is_available: selectedUser.profile.is_available,
          service_rating: selectedUser.profile.service_rating,
          completed_jobs: selectedUser.profile.completed_jobs,
          is_email_verified: selectedUser.profile.is_email_verified,
          is_phone_verified: selectedUser.profile.is_phone_verified,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      const updatedUser = response.data;

      setUsers(
        users.map((user) =>
          user.id === updatedUser.user.id ? updatedUser.user : user,
        ),
      );

      setEditMode(false);
      setSuccessMessage("User updated successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to update user. Please try again.");
      console.error("Error updating user:", err);
    }
  };

  const handleRegenerateQR = async (userId) => {
    try {
      // Get the current user's Firebase ID token
      const token = await user.getIdToken();

      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/users/${userId}/regenerate-qr/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || errorData.detail || "Failed to regenerate QR code",
        );
      }

      const result = await response.json();

      setUsers(
        users.map((user) =>
          user.id === userId
            ? {
<<<<<<< HEAD
                ...user,
                profile: {
                  ...user.profile,
                  qr_code: result.qr_code,
                  support_link: result.support_link,
                },
              }
=======
              ...user,
              profile: {
                ...user.profile,
                qr_code: result.qr_code,
                support_link: result.support_link,
              },
            }
>>>>>>> a7ec3f6 (added many of things.)
            : user,
        ),
      );

      setSuccessMessage("QR code regenerated successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to regenerate QR code. Please try again.");
      console.error("Error regenerating QR code:", err);
    }
  };

  const handleDownloadQR = (user) => {
    if (!user.profile.qr_code) return;

    const link = document.createElement("a");
    link.href = `data:image/png;base64,${user.profile.qr_code}`;
    link.download = `${user.username}_qr_code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  };

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.profile.phone && user.profile.phone.includes(searchTerm));

    const matchesRole =
      filterRole === "all" || user.profile.role === filterRole;

    const matchesVerification =
      filterVerification === "all" ||
      (filterVerification === "email_verified" &&
        user.profile.is_email_verified) ||
      (filterVerification === "phone_verified" &&
        user.profile.is_phone_verified) ||
      (filterVerification === "both_verified" &&
        user.profile.is_email_verified &&
        user.profile.is_phone_verified) ||
      (filterVerification === "not_verified" &&
        !user.profile.is_email_verified &&
        !user.profile.is_phone_verified);

    return matchesSearch && matchesRole && matchesVerification;
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

<<<<<<< HEAD
  // If user is not admin, show permission denied message
  if (userRole && userRole !== "admin") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Access Denied
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              You do not have permission to access this page. Admin access
              required.
            </p>
            <div className="mt-6">
              <button
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {user &&
                      (user.displayName
                        ? user.displayName.charAt(0).toUpperCase()
                        : user.email.charAt(0).toUpperCase())}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {user ? user.displayName || user.email : "Admin"}
                </p>
                <button
                  onClick={handleLogout}
                  className="text-xs font-medium text-gray-500 hover:text-gray-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main content */}
=======
  return (
    <div className="min-h-screen bg-gray-100">
>>>>>>> a7ec3f6 (added many of things.)
      <main className="flex-1 relative overflow-y-auto focus:outline-none">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
              <button
                onClick={fetchUsers}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              >
                Refresh
              </button>
            </div>

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {successMessage}
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <div className="flex justify-between items-center">
                  <span>{error}</span>
                  <button
                    onClick={() => setError(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="bg-white shadow rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Search by name, email, phone"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Role
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={filterRole}
                    onChange={(e) => {
                      setFilterRole(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="all">All Roles</option>
                    <option value="customer">Customer</option>
                    <option value="provider">Provider</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Verification Status
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={filterVerification}
                    onChange={(e) => {
                      setFilterVerification(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="email_verified">Email Verified</option>
                    <option value="phone_verified">Phone Verified</option>
                    <option value="both_verified">Both Verified</option>
                    <option value="not_verified">Not Verified</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <div className="text-gray-700">
                    Showing {currentUsers.length} of {filteredUsers.length}{" "}
                    users
                  </div>
                </div>
              </div>
            </div>

            {/* Users Table */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div
                    className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full"
                    role="status"
                  ></div>
                  <p className="mt-2">Loading users...</p>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Verification
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service Area
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          QR Code
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-gray-600 font-medium">
                                      {user.first_name && user.last_name
                                        ? `${user.first_name[0]}${user.last_name[0]}`
                                        : user.username[0].toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {user.first_name && user.last_name
                                      ? `${user.first_name} ${user.last_name}`
                                      : user.username}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Joined{" "}
                                    {new Date(
                                      user.date_joined,
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {user.email}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.profile.phone || "Not provided"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
<<<<<<< HEAD
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.profile.role === "admin"
=======
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.profile.role === "admin"
>>>>>>> a7ec3f6 (added many of things.)
                                    ? "bg-purple-100 text-purple-800"
                                    : user.profile.role === "provider"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-green-100 text-green-800"
<<<<<<< HEAD
                                }`}
=======
                                  }`}
>>>>>>> a7ec3f6 (added many of things.)
                              >
                                {user.profile.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                <div className="flex items-center">
                                  <span
<<<<<<< HEAD
                                    className={`inline-block w-2 h-2 rounded-full mr-1 ${
                                      user.profile.is_email_verified
                                        ? "bg-green-400"
                                        : "bg-red-400"
                                    }`}
=======
                                    className={`inline-block w-2 h-2 rounded-full mr-1 ${user.profile.is_email_verified
                                        ? "bg-green-400"
                                        : "bg-red-400"
                                      }`}
>>>>>>> a7ec3f6 (added many of things.)
                                  ></span>
                                  Email
                                </div>
                                <div className="flex items-center mt-1">
                                  <span
<<<<<<< HEAD
                                    className={`inline-block w-2 h-2 rounded-full mr-1 ${
                                      user.profile.is_phone_verified
                                        ? "bg-green-400"
                                        : "bg-red-400"
                                    }`}
=======
                                    className={`inline-block w-2 h-2 rounded-full mr-1 ${user.profile.is_phone_verified
                                        ? "bg-green-400"
                                        : "bg-red-400"
                                      }`}
>>>>>>> a7ec3f6 (added many of things.)
                                  ></span>
                                  Phone
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.profile.service_area_division ||
                                "Not specified"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.profile.qr_code ? (
                                <div className="flex items-center">
                                  <img
                                    src={`data:image/png;base64,${user.profile.qr_code}`}
                                    alt="QR Code"
                                    className="h-10 w-10 mr-2"
                                  />
                                  <span>Available</span>
                                </div>
                              ) : (
                                <span>Not generated</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleEditUser(user)}
                                className="text-indigo-600 hover:text-indigo-900 mr-3"
<<<<<<< HEAD
=======
                                disabled={!geoDataLoaded}
>>>>>>> a7ec3f6 (added many of things.)
                              >
                                Edit
                              </button>
                              {user.profile.qr_code && (
                                <button
                                  onClick={() => handleDownloadQR(user)}
                                  className="text-green-600 hover:text-green-900 mr-3"
                                >
                                  Download QR
                                </button>
                              )}
                              <button
                                onClick={() => handleRegenerateQR(user.id)}
                                className="text-yellow-600 hover:text-yellow-900"
                              >
                                Regenerate QR
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            No users found matching your criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() =>
                          paginate(currentPage > 1 ? currentPage - 1 : 1)
                        }
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() =>
                          paginate(
                            currentPage < totalPages
                              ? currentPage + 1
                              : totalPages,
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing page{" "}
                          <span className="font-medium">{currentPage}</span> of{" "}
                          <span className="font-medium">{totalPages}</span>
                        </p>
                      </div>
                      <div>
                        <nav
                          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                          aria-label="Pagination"
                        >
                          <button
                            onClick={() =>
                              paginate(currentPage > 1 ? currentPage - 1 : 1)
                            }
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>

                          {/* Page numbers */}
                          {[...Array(totalPages)].map((_, i) => (
                            <button
                              key={i}
                              onClick={() => paginate(i + 1)}
<<<<<<< HEAD
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === i + 1
                                  ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                              }`}
=======
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === i + 1
                                  ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                }`}
>>>>>>> a7ec3f6 (added many of things.)
                            >
                              {i + 1}
                            </button>
                          ))}

                          <button
                            onClick={() =>
                              paginate(
                                currentPage < totalPages
                                  ? currentPage + 1
                                  : totalPages,
                              )
                            }
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit User Modal */}
      {editMode && selectedUser && (
        <div className="fixed inset-0 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Edit User: {selectedUser.username}
                </h3>
                <button
                  onClick={() => setEditMode(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedUser.first_name}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          first_name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedUser.last_name}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          last_name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedUser.email}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedUser.profile.phone || ""}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          profile: {
                            ...selectedUser.profile,
                            phone: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Role
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedUser.profile.role}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          profile: {
                            ...selectedUser.profile,
                            role: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="customer">Customer</option>
                      <option value="provider">Provider</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Service Area Division
                    </label>
<<<<<<< HEAD
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedUser.profile.service_area_division || ""}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          profile: {
                            ...selectedUser.profile,
                            service_area_division: e.target.value,
                          },
                        })
                      }
                    />
=======
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={
                        divisions.find(
                          (d) =>
                            d.name ===
                            selectedUser.profile.service_area_division,
                        )?.id || ""
                      }
                      onChange={(e) => handleDivisionChange(e.target.value)}
                    >
                      <option value="">Select Division</option>
                      {divisions.map((division) => (
                        <option key={division.id} value={division.id}>
                          {division.name}
                        </option>
                      ))}
                    </select>
>>>>>>> a7ec3f6 (added many of things.)
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Service Area District
                    </label>
<<<<<<< HEAD
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedUser.profile.service_area_district || ""}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          profile: {
                            ...selectedUser.profile,
                            service_area_district: e.target.value,
                          },
                        })
                      }
                    />
=======
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={
                        districts.find(
                          (d) =>
                            d.name ===
                            selectedUser.profile.service_area_district,
                        )?.id || ""
                      }
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      disabled={!selectedUser.profile.service_area_division}
                    >
                      <option value="">Select District</option>
                      {filteredDistricts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
>>>>>>> a7ec3f6 (added many of things.)
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Service Area Thana
                    </label>
<<<<<<< HEAD
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedUser.profile.service_area_thana || ""}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          profile: {
                            ...selectedUser.profile,
                            service_area_thana: e.target.value,
                          },
                        })
                      }
                    />
=======
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={
                        thanas.find(
                          (t) =>
                            t.name === selectedUser.profile.service_area_thana,
                        )?.id || ""
                      }
                      onChange={(e) => handleThanaChange(e.target.value)}
                      disabled={!selectedUser.profile.service_area_district}
                    >
                      <option value="">Select Thana</option>
                      {filteredThanas.map((thana) => (
                        <option key={thana.id} value={thana.id}>
                          {thana.name}
                        </option>
                      ))}
                    </select>
>>>>>>> a7ec3f6 (added many of things.)
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Address
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="3"
                      value={selectedUser.profile.address || ""}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          profile: {
                            ...selectedUser.profile,
                            address: e.target.value,
                          },
                        })
                      }
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Available
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={
                        selectedUser.profile.is_available ? "true" : "false"
                      }
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          profile: {
                            ...selectedUser.profile,
                            is_available: e.target.value === "true",
                          },
                        })
                      }
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Service Rating
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedUser.profile.service_rating || 0}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          profile: {
                            ...selectedUser.profile,
                            service_rating: parseFloat(e.target.value),
                          },
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Completed Jobs
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedUser.profile.completed_jobs || 0}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          profile: {
                            ...selectedUser.profile,
                            completed_jobs: parseInt(e.target.value),
                          },
                        })
                      }
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        id="email_verified"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={selectedUser.profile.is_email_verified}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            profile: {
                              ...selectedUser.profile,
                              is_email_verified: e.target.checked,
                            },
                          })
                        }
                      />
                      <label
                        htmlFor="email_verified"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Email Verified
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        id="phone_verified"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={selectedUser.profile.is_phone_verified}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            profile: {
                              ...selectedUser.profile,
                              is_phone_verified: e.target.checked,
                            },
                          })
                        }
                      />
                      <label
                        htmlFor="phone_verified"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Phone Verified
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setEditMode(false)}
<<<<<<< HEAD
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded mr-2"
=======
                  className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-800 font-medium py-2 px-4 rounded mr-2"
>>>>>>> a7ec3f6 (added many of things.)
                >
                  Cancel
                </button>
                <button
<<<<<<< HEAD
                  onClick={handleSaveUser}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
=======
                  type="button"
                  onClick={handleSaveUser}
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium py-2 px-4 rounded"
>>>>>>> a7ec3f6 (added many of things.)
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> a7ec3f6 (added many of things.)
