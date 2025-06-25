"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/users/forgot_password", { email });

      if (res.status === 200) {
        toast.success("An email has been sent to reset your password.");
        setTimeout(() => {
          router.push("/"); // Redirect to home after delay
        }, 1500);
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        toast.error("User not found");
      } else if (err.response.status == 429) {
          toast.error(err.response?.data?.error);
      } else {
        toast.error(
          err?.response?.data?.error || "Something went wrong. Try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-KebabGreen">
          Forgot Your Password?
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm mb-6">
          Enter your registered email and we’ll send you a reset link.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-KebabGreen"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-KebabGreen hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgottenPassword;
