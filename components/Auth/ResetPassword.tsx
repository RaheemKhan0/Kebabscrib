"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@components/Common/LoadingScreen";
import axios from "axios";
import NotFound from "@components/Common/PageNotFound";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const t = searchParams.get("token");
    console.log("reset token : ", t);

    setToken(t);
    const verifytoken = async () => {
      try {
        const res = await axios.post("/api/users/verify-reset-token", {
          token: t,
        });
        if (res.data.valid) {
          setVerified(true);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error : ", error);
        setLoading(false);
        setVerified(false);
      }
    };
    verifytoken();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) return setError("Reset token is missing.");
    if (password !== confirm) return setError("Passwords do not match.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");

    try {
      setLoading(true);
      const res = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.text();
      if (!res.ok) throw new Error(data || "Something went wrong.");

      toast.success("Password reset successful.");
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <LoadingScreen />;
  }
  if (!verified) {
    return <NotFound />;
  }
  return (
    <section className="bg-EggShell min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl shadow-xl border border-KCPeach/30 bg-white p-6">
        {/* Title — keep KC_Green */}
        <h1 className="text-2xl font-bold mb-4 text-center text-KC_GREEN font-parkinsans">
          Reset Your Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-KC_GREEN mb-1">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-KC_GREEN bg-gray-50 text-gray-900 focus:ring-2 focus:ring-KC_GREEN focus:border-KC_GREEN"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-KC_GREEN mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-KC_GREEN bg-gray-50 text-gray-900 focus:ring-2 focus:ring-KC_GREEN focus:border-KC_GREEN"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-KC_GREEN text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-white hover:text-KC_GREEN transition duration-300"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
