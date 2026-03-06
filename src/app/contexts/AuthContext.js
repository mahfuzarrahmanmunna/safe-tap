// contexts/AuthContext.js
"use client";
import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // API base URL
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  // Set up axios interceptors for token refresh
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
              const response = await axios.post(
                `${API_BASE_URL}/api/auth/token/refresh/`,
                {
                  refresh: refreshToken,
                },
              );

              const { access } = response.data;
              localStorage.setItem("accessToken", access);

              // Retry the original request with the new token
              originalRequest.headers.Authorization = `Bearer ${access}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, log out
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setIsAuthenticated(false);
            setUser(null);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          // Verify token by fetching user data
          const response = await axios.get(`${API_BASE_URL}/api/auth/me/`);

          if (response.data) {
            setUser(response.data);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Authentication check failed:", error);
          // Token is invalid, clear it
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, pin) => {
    try {
      // Make API call to login
      const response = await axios.post(`${API_BASE_URL}/api/auth/login/`, {
        email,
        pin,
      });

      // Store tokens
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      // Set user data
      setUser(response.data.user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      let errorMessage = "Login failed. Please try again.";

      if (error.response && error.response.data) {
        if (error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        }
      }

      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Optional: Call logout endpoint if available
      // await axios.post(`${API_BASE_URL}/api/auth/logout/`);

      // Clear tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Reset state
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
