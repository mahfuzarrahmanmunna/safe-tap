// API utility functions for interacting with the Django backend

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

// Authentication functions
export const login = async (email, password) => {
  return apiRequest("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
  }
};

// User management functions
export const getUsers = async () => {
  return apiRequest("/admin/users/");
};

export const updateUser = async (userId, userData) => {
  return apiRequest(`/admin/users/${userId}/`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });
};

export const regenerateUserQR = async (userId) => {
  return apiRequest(`/admin/users/${userId}/regenerate-qr/`, {
    method: "POST",
  });
};

// Export the apiRequest function for other API calls
export { apiRequest };
