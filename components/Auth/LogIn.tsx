"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const LogIn: React.FC = () => {
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "remember") {
      setRemember(checked);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn(
      "credentials",
      {
        email,
        password,
        redirect: false,
      },
      {},
    );
    if (!res) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    if (res.ok) {
      toast.success("Login Successfull");
    } else if (res.error === "Email is not registered") {
      toast.error("Email not registered");
    } else if (res.error == "Password is incorrect") {
      toast.error("Password is incorrect");
    } else {
      toast.error("There was an unexpected Error");
    }
  };
  useEffect(() => {
    if (status === "authenticated" && session.user.role == "user") {
      router.push("/profile");
    }
    if (status === "authenticated" && session.user.role == "admin") {
      router.push("/admin/dashboard");
    }
  }, [status]);

  return (
    <section className="bg-EggShell min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-KC_GREEN p-8">
        <h1 className="text-2xl font-bold text-center text-KC_GREEN mb-6">
          Log in to your account
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-KC_GREEN"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 border border-KC_GREEN rounded-md focus:outline-none focus:ring-2 focus:ring-KC_GREEN"
              placeholder="name@company.com"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-KC_GREEN"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-KC_GREEN rounded-md focus:outline-none focus:ring-2 focus:ring-KC_GREEN"
              required
            />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={remember}
                onChange={handleChange}
                className="w-4 h-4 text-KC_GREEN border border-KC_GREEN rounded"
              />
              <span className="ml-2 text-sm text-KC_GREEN">Remember me</span>
            </label>

            <a
              href="/forgot-password"
              className="text-sm font-medium text-KC_GREEN hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-KC_GREEN text-white font-semibold py-2.5 rounded-md hover:bg-KC_GREEN/90 transition"
          >
            Sign in
          </button>

          {/* Sign up Link */}
          <p className="text-center text-sm text-KC_GREEN">
            Don’t have an account yet?{" "}
            <a href="/signup" className="font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
