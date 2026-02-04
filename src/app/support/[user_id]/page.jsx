// app/support/[user_id]/[unique_id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/app/contexts/FirebaseAuthContext";
import { useUserProfile } from "@/app/hooks/useUserProfile";
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
  ToggleLeft,
  ToggleRight,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function ServiceRequestPage() {
  const { user, } = useFirebaseAuth();
  const params = useParams();
  const router = useRouter();
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [serviceRequestsEnabled, setServiceRequestsEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);

  // Use the custom hook to get user profile
  const { userProfile, loading, setLoading, error, refetch } = useUserProfile();

  // Form state
  const [formData, setFormData] = useState({
    problem_description: "",
  });

  // File upload state
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  // Check if user is admin
  const isAdmin = userProfile?.profile?.role === 'admin';

  // Get the user's Firebase token
  useEffect(() => {
    if (user) {
      user.getIdToken().then(token => {
        setAuthToken(token);
      }).catch(error => {
        console.error("Error getting ID token:", error);
        setProfileError("Failed to get authentication token");
      });
    }
  }, [user]);

  // Check if the user is authorized to view this page
  useEffect(() => {
    // If Firebase auth is still loading, do nothing
    if (loading) return;

    // If user is not logged in, redirect to login
    if (!user) {
      toast.error("Please log in to access this page");
      router.push("/login");
      return;
    }

    // If profile is still loading, do nothing
    if (loading) return;

    // If there's an error fetching the profile, show error and stop loading
    if (error) {
      console.error("Profile error from hook:", error);
      setProfileError(error);
      setLoadingRequests(false);
      return;
    }

    // If profile is loaded but null, try to fetch it manually
    // if (!userProfile) {
    //   console.warn("User profile is null, attempting manual fetch");
    //   fetchUserProfileManually();
    //   return;
    // }

    // Profile is loaded successfully
    console.log("User profile loaded:", userProfile);

    if (user) {
      setIsAuthorized(true);
    }

    // Check if the user is viewing their own profile or is an admin
    // if (user.uid === params.user_id || isAdmin) {
    //   setIsAuthorized(true);
    //   if (userProfile?.id) {
    //     fetchServiceRequests(userProfile.id);
    //   } else {
    //     setLoadingRequests(false);
    //   }
    // } else {
    //   toast.error("You are not authorized to view this page");
    //   router.push("/dashboard");
    // }
  }, [user, loading, error, userProfile, params.user_id, router, isAdmin]);

  // Manual profile fetch as fallback
  // const fetchUserProfileManually = async () => {
  //   try {
  //     const token = await user.getIdToken();
  //     const response = await fetch(`http://127.0.0.1:8000/api/auth/me/`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Manual profile fetch successful:", data);
  //       // Update the profile state
  //       setUserProfile(data);
  //       setAuthToken(token);

  //       // Check authorization again
  //       const adminRole = data.profile?.role === 'admin';
  //       if (user.uid === params.user_id || adminRole) {
  //         setIsAuthorized(true);
  //         if (data?.id) {
  //           fetchServiceRequests(data.id);
  //         } else {
  //           setLoadingRequests(false);
  //         }
  //       } else {
  //         toast.error("You are not authorized to view this page");
  //         router.push("/dashboard");
  //       }
  //     } else {
  //       const errorData = await response.json().catch(() => ({}));
  //       const errorMessage = errorData.error || "Failed to fetch user profile";
  //       console.error("Manual profile fetch failed:", errorMessage);
  //       setProfileError(errorMessage);
  //       setLoadingRequests(false);
  //     }
  //   } catch (error) {
  //     console.error("Error in manual profile fetch:", error);
  //     setProfileError("Failed to fetch user profile");
  //     setLoadingRequests(false);
  //   }
  // };

  // Fetch service requests settings if admin
  useEffect(() => {
    if (isAdmin && authToken) {
      fetchServiceRequestsSettings();
    }
  }, [isAdmin, authToken]);

  const fetchServiceRequestsSettings = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/settings/service-requests/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
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
      const response = await fetch(`http://127.0.0.1:8000/api/settings/service-requests/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
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

  const fetchServiceRequests = async (userId) => {
    try {
      setLoadingRequests(true);

      // First try with the user-specific endpoint using Firebase token
      let response = await fetch(
        `http://127.0.0.1:8000/api/service-requests/user/${userId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      // If the user-specific endpoint fails with 401, try the general endpoint
      if (!response.ok && response.status === 401) {
        console.log("User-specific endpoint failed, trying general endpoint");
        response = await fetch(
          `http://127.0.0.1:8000/api/service-requests/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          },
        );

        if (response.ok) {
          const allData = await response.json();
          // Filter the requests to only show the current user's requests
          const userRequests = allData.filter(request =>
            request.user && (request.user.id === userId || request.user === userId)
          );
          setServiceRequests(userRequests);
        } else {
          toast.error("Failed to fetch service requests");
        }
      } else if (response.ok) {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];
    setImages(newImages);

    // Create previews for new images
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    const newVideos = [...videos, ...files];
    setVideos(newVideos);

    // Create previews for new videos
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoPreviews(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const removeVideo = (index) => {
    const newVideos = videos.filter((_, i) => i !== index);
    const newPreviews = videoPreviews.filter((_, i) => i !== index);
    setVideos(newVideos);
    setVideoPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for file uploads
      const formDataObj = new FormData();
      formDataObj.append("problem_description", formData.problem_description);

      // Add images
      images.forEach((image, index) => {
        formDataObj.append(`images`, image);
      });

      // Add videos
      videos.forEach((video, index) => {
        formDataObj.append(`videos`, video);
      });

      // Get fresh token
      const token = await user.getIdToken();
      const response = await fetch(
        "http://127.0.0.1:8000/api/service-requests/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataObj,
        },
      );

      if (response.ok) {
        toast.success("Service request submitted successfully");
        setShowForm(false);
        // Reset form
        setFormData({
          problem_description: "",
        });
        setImages([]);
        setVideos([]);
        setImagePreviews([]);
        setVideoPreviews([]);
        // Fetch updated service requests
        if (userProfile?.id) {
          fetchServiceRequests(userProfile.id);
        }
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

  // Show loading state while Firebase auth or profile is loading
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
  //       <div className="text-center">
  //         <Loader2 className="h-12 w-12 animate-spin text-cyan-500 mx-auto" />
  //         <p className="mt-4 text-gray-600 dark:text-gray-400">
  //           Loading service requests...
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  // Show error state if there's an error fetching the profile
  if (profileError || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Error Loading Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {profileError || error}
          </p>
          <div className="space-x-4">
            <button
              onClick={() => {
                setProfileError(null);
                window.location.reload();
              }}
              className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-blue-700"
            >
              Retry
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if service requests are disabled for customers and user is not admin
  if (!serviceRequestsEnabled && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Service Requests Temporarily Unavailable
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Service requests are currently disabled. Please check back later or contact support for assistance.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Show loading state while fetching service requests
  if (loading) {
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
                className="text-white hover:text-blue-100"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Water Purifier Service</h1>
                <p className="text-blue-100">
                  Request service for your damaged water purifier device
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Droplets className="w-8 h-8" />
              <span className="text-xl font-semibold">AquaPure Service</span>

              {/* Admin Settings Button */}
              {isAdmin && (
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="ml-4 p-2 rounded-full hover:bg-blue-700 transition-colors"
                  title="Service Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Settings Panel */}
      {isAdmin && showSettings && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Admin Settings
                </h3>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Service Requests for Customers:
                  </span>
                  <button
                    onClick={() => updateServiceRequestsSettings(!serviceRequestsEnabled)}
                    disabled={settingsLoading}
                    className="relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${serviceRequestsEnabled ? "translate-x-6 bg-cyan-600" : "translate-x-1"
                        }`}
                    />
                  </button>
                  <span className={`text-sm font-medium ${serviceRequestsEnabled
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                    }`}>
                    {serviceRequestsEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            {!serviceRequestsEnabled && (
              <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Notice:</strong> Service requests are currently disabled for customers.
                  Only administrators can access this page and submit service requests.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Request Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Service Requests
                </h2>
                {!isAdmin && (
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    {showForm ? "Cancel" : "New Request"}
                  </button>
                )}
              </div>

              {showForm && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="problem_description"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Describe Your Problem
                    </label>
                    <textarea
                      id="problem_description"
                      name="problem_description"
                      value={formData.problem_description}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Please describe the issue with your water purifier..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Upload Images (Optional)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Image className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index}`}
                              className="h-24 w-full object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Upload Videos (Optional)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Video className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            MP4, MOV, AVI up to 50MB
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          accept="video/*"
                          onChange={handleVideoChange}
                        />
                      </label>
                    </div>

                    {/* Video Previews */}
                    {videoPreviews.length > 0 && (
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {videoPreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <video
                              src={preview}
                              className="h-24 w-full object-cover rounded-md"
                              controls
                            />
                            <button
                              type="button"
                              onClick={() => removeVideo(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 flex items-center"
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
                {isAdmin ? "All Service Requests" : "Your Service Requests"}
              </h2>

              {serviceRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Droplets className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {isAdmin
                      ? "There are no service requests yet."
                      : "You have not made any service requests yet."
                    }
                  </p>
                  {!isAdmin && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                      Make Your First Request
                    </button>
                  )}
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
                              Service Request #{request.id}
                              {isAdmin && request.user && (
                                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                  ({request.user.first_name} {request.user.last_name})
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {request.problem_description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(
                                  request.created_at,
                                ).toLocaleDateString()}
                              </div>
                            </div>

                            {/* Display Images */}
                            {request.images && request.images.length > 0 && (
                              <div className="mt-3">
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Images:</p>
                                <div className="flex space-x-2">
                                  {request.images.map((image, index) => (
                                    <img
                                      key={index}
                                      src={image.image}
                                      alt={`Service request image ${index}`}
                                      className="h-16 w-16 object-cover rounded-md"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Display Videos */}
                            {request.videos && request.videos.length > 0 && (
                              <div className="mt-3">
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Videos:</p>
                                <div className="flex space-x-2">
                                  {request.videos.map((video, index) => (
                                    <video
                                      key={index}
                                      src={video.video}
                                      className="h-16 w-16 object-cover rounded-md"
                                      controls
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
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
                {isAdmin ? "Admin Profile" : "Your Profile"}
              </h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
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
                  {isAdmin && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 mt-1">
                      Administrator
                    </span>
                  )}
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

              {isAdmin && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">
                        Admin Control
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        As an administrator, you can enable or disable service requests for customers.
                      </p>
                      <button
                        onClick={() => setShowSettings(true)}
                        className="mt-2 text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                      >
                        Manage Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}