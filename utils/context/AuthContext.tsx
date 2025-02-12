"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

type AuthContextType = {
  user: any;
  loggedin: boolean;
  loading: boolean;
  checkAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [loggedin, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Define checkAuth Function
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/users/fetchuserdata", {
        withCredentials: true, // Ensures cookies are sent
      });

      if (data?.user) {
        setUser(data.user);
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        // If unauthorized, try refreshing the token
        const refreshed = await refreshtoken();
        if (refreshed) {
          // Re-attempt fetching user data after refreshing token
          try {
            const { data } = await axios.get("/api/users/fetchuserdata", {
              withCredentials: true,
            });

            if (data?.user) {
              setUser(data.user);
              setLoggedIn(true);
            } else {
              setUser(null);
              setLoggedIn(false);
            }
          } catch (error) {
            setUser(null);
            setLoggedIn(false);
          }
        } else {
          setUser(null);
          setLoggedIn(false);
        }
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Define refreshtoken Function
  const refreshtoken = async () => {
    try {
      const request = await axios.post("/api/users/refreshtoken", null, {
        withCredentials: true, // Ensures cookies are sent
      });
      console.log("Refresh Token Message: ", request.data?.message);
      return request.data?.message === "Token Refreshed"; // Ensures a boolean return
    } catch (error) {
      return false;
    }
  };

  // ✅ Run checkAuth on Mount
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loggedin, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to Access Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
