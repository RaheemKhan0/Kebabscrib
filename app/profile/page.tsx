"use client";
import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthContext, useAuth } from "../../utils/context/AuthContext";

const Page = () => {
  const router = useRouter();
  const [loadingState, setLoadingState] = useState(false); // Rename to avoid conflict
  const auth = useContext(AuthContext);

  if (!auth) {
    return <p>Loading...</p>; // Handle case where context is not available
  }

  const { user, loggedin, loading, checkAuth } = useAuth(); // Rename loading

  const logout = async () => {
    setLoadingState(true);
    try {
      await axios.get("/api/users/logout", { withCredentials: true });

      // Wait for authentication state to update
      await checkAuth();

      toast.success("Logout Successful");

      // Redirect to home page
      router.push("/");
    } catch (error: any) {
      console.error("Logout error:", error.response?.data || error.message);
      toast.error("Failed to log out. Please try again.");
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <>
      <h1 className="text-KebabGold text-5xl text-center">Profile</h1>
      <button
        onClick={logout}
        disabled={loadingState} // Use the renamed loading state
        className={`p-4 bg-KebabGreen text-lg text-KebabGold font-bold rounded flex items-center ${
          loadingState ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loadingState ? "Logging out..." : "Logout"}
      </button>
    </>
  );
};

export default Page;
