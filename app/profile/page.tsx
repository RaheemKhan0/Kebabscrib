"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      await axios.get("/api/users/logout", {withCredentials : false}); 
      toast.success("Logout Successful")
      router.push("/");
    } catch (error : any) {
      console.error("Logout error:", error.response?.data || error.message);
      toast.error("Failed to log out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-KebabGold text-5xl text-center">Profile</h1>
      <button
        onClick={logout}
        disabled={loading}
        className={`p-4 bg-KebabGreen text-lg text-KebabGold font-bold rounded flex items-center ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </>
  );
};

export default Page;
