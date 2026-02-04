// components/ProfilePicture.jsx
'use client'
import { useState } from "react";
import { User } from "lucide-react";

const ProfilePicture = ({ theme, userProfile, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${
        theme === "dark"
          ? "from-cyan-600 to-cyan-500"
          : "from-cyan-700 to-cyan-600"
      } text-white font-bold shadow-md hover:shadow-lg transition-all duration-300`}
    >
      {userProfile?.first_name?.charAt(0) ||
        userProfile?.username?.charAt(0) ||
        "U"}
    </button>
  );
};

export default ProfilePicture;