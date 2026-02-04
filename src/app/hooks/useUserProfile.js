import { useState, useEffect } from 'react';
import { useFirebaseAuth } from '@/app/contexts/FirebaseAuthContext';
import { toast } from 'react-hot-toast';

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useFirebaseAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Check Firebase status on server
        const statusResponse = await fetch("http://127.0.0.1:8000/api/auth/firebase/status/");
        const statusData = await statusResponse.json();
        console.log("Firebase status:", statusData);

        if (!statusData.firebase_available) {
          // Use message/diagnostic fields (backwards-compatible)
          const msg = statusData.message || statusData.diagnostic || 'Firebase auth not available';
          console.warn("Firebase is not available on server:", msg);
          toast.error(`Firebase auth not available: ${msg}`);

          // Fallback: try fetching user via cookies/session (no Authorization header)
          const fallbackResp = await fetch("http://127.0.0.1:8000/api/auth/me/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
          });

          if (fallbackResp.ok) {
            const data = await fallbackResp.json();
            setUserProfile(data);
            setLoading(false);
            return;
          } else {
            // Show server message where available; otherwise show generic message
            const fbErr = await fallbackResp.json().catch(() => ({}));
            setError(msg);
            toast.error(fbErr.error || msg);
            setLoading(false);
            return;
          }
        }

        // If Firebase available: proceed using Firebase token
        const token = await user.getIdToken(true);
        const response = await fetch("http://127.0.0.1:8000/api/auth/me/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        } else if (response.status === 401) {
          // Try refresh flow
          try {
            await user.getIdToken(true);
            const retryResponse = await fetch("http://127.0.0.1:8000/api/auth/me/", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await user.getIdToken()}`,
              },
              credentials: "include",
            });
            if (retryResponse.ok) {
              const data = await retryResponse.json();
              setUserProfile(data);
            } else {
              const errorData = await retryResponse.json().catch(() => ({}));
              setError(errorData.error || "Authentication failed");
              toast.error(errorData.error || "Authentication failed");
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            setError("Authentication failed");
            toast.error("Authentication failed. Please log in again.");
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          setError(errorData.error || "Failed to fetch user profile");
          toast.error(errorData.error || "Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile");
        toast.error("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  // ... refetch remains the same (use same fallback logic if you want)
  const refetch = async () => {
    if (!user) return null;

    try {
      setLoading(true);
      setError(null);

      // Check firebase status, otherwise fallback to cookie-based call
      const statusResponse = await fetch("http://127.0.0.1:8000/api/auth/firebase/status/");
      const statusData = await statusResponse.json();

      if (!statusData.firebase_available) {
        const fallbackResp = await fetch("http://127.0.0.1:8000/api/auth/me/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        });
        if (fallbackResp.ok) {
          const data = await fallbackResp.json();
          setUserProfile(data);
          return data;
        } else {
          const err = await fallbackResp.json().catch(() => ({}));
          setError(err.error || statusData.message || "Failed to fetch user profile");
          toast.error(err.error || statusData.message || "Failed to fetch user profile");
          return null;
        }
      }

      // If firebase available, use Firebase token
      const token = await user.getIdToken(true);
      const response = await fetch("http://127.0.0.1:8000/api/auth/me/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
        return data;
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || "Failed to fetch user profile");
        toast.error(errorData.error || "Failed to fetch user profile");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to fetch user profile");
      toast.error("Failed to fetch user profile");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { userProfile, loading, error, refetch };
};