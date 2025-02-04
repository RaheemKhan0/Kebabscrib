"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loggedin, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    checkAuth();
  }, []);

  // ✅ Fixed Refresh Token Request
  const refreshtoken = async () => {
    try {
      const request = await axios.post("/api/users/refreshtoken", null, {
        withCredentials: true, // Ensures cookies are sent
      });
      console.log("Refresh Token Message: ", request.data?.message);
      return request.data?.message; // Ensures a boolean return
    } catch (error) {
      return false;
    }
  };

  return { user, loggedin, loading };
}
