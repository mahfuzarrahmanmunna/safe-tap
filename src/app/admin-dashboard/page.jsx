"use client";
import React from "react";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

const AdminDashboardPage = () => {
  const { user } = useFirebaseAuth();
  // console.log(user.email);
  return <div></div>;
};

export default AdminDashboardPage;
