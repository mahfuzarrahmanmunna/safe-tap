"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, facebookProvider } from "../config/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";

const FirebaseContext = createContext();

export const useFirebaseAuth = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error(
      "useFirebaseAuth must be used within an FirebaseAuthProvider",
    );
  }
  return context;
};

export const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      return { success: true, user: result.user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const signInWithFacebook = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, facebookProvider);
      return { success: true, user: result.user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Fixed function with different name to avoid conflict
  const signInWithEmailAndPassword = async (email, password) => {
    try {
      setError(null);
      // Use the renamed Firebase function
      const result = await firebaseSignInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return { success: true, user: result.user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
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
    signInWithEmailAndPassword, // This is now our custom function
    signOut,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
