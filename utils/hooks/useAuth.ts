import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth() {
  const [user, setUser] = useState(null); // Fixed syntax
  const [loggedin, setLoggedIn] = useState(false); // Fixed syntax
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/api/users/fetchuserdata", {
          withCredentials: true, // Ensures cookies are sent
        });
        if (data) {
          setUser(data.user);
          setLoggedIn(true);
          setLoading(false);
        }
      } catch (error) {
        setUser(null);
        setLoggedIn(false);
      }
    };
    console.log("Checking Authentication");
    checkAuth();
  }, []);

  return { user, loggedin , loading};
}

