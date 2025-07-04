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
    <section className="bg-EggShell min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-KC_GREEN rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-KC_GREEN mb-4">
          Forgot Your Password?
        </h1>
        <p className="text-center text-KC_GREEN/80 text-sm mb-6">
          Enter your registered email and we’ll send you a reset link.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-KC_GREEN mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 rounded-md border border-KC_GREEN bg-white text-KC_GREEN focus:outline-none focus:ring-2 focus:ring-KC_GREEN"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-KC_GREEN text-white font-semibold py-2.5 rounded-md hover:bg-KC_GREEN/90 transition duration-200"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgottenPassword;
