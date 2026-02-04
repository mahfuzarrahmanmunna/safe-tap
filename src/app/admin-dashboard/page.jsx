"use client";
import React from "react";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

const AdminDashboardPage = () => {
  const { user } = useFirebaseAuth();
  // console.log(user.email);
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user ? user.email : "Guest"}!</p>
    </div>
  );
};

export default AdminDashboardPage;
