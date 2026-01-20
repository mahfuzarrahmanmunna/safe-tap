// contexts/FirebaseAuthContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { auth, googleProvider, facebookProvider } from '../config/firebase';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';

const FirebaseContext = createContext();

export const useFirebaseAuth = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebaseAuth must be used within an FirebaseAuthProvider');
  }
  return context;
};

export const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      
      // Send token to backend for authentication
      const response = await axios.post(`${API_BASE_URL}/api/auth/firebase/login/`, {
        id_token: idToken
      });
      
      // Store tokens for API access
      if (response.data.access && response.data.refresh) {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      }
      
      return { success: true, user: response.data.user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const signInWithFacebook = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, facebookProvider);
      const idToken = await result.user.getIdToken();
      
      // Send token to backend for authentication
      const response = await axios.post(`${API_BASE_URL}/api/auth/firebase/login/`, {
        id_token: idToken
      });
      
      // Store tokens for API access
      if (response.data.access && response.data.refresh) {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      }
      
      return { success: true, user: response.data.user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const completeRegistration = async (additionalData) => {
    try {
      setError(null);
      if (!user) {
        throw new Error('No authenticated user');
      }
      
      const idToken = await user.getIdToken();
      
      // Send token and additional data to backend
      const response = await axios.post(`${API_BASE_URL}/api/auth/firebase/register/`, {
        id_token: idToken,
        ...additionalData
      });
      
      return { success: true, user: response.data.user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      delete axios.defaults.headers.common['Authorization'];
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithFacebook,
    completeRegistration,
    signOut
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};