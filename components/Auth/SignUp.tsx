"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignInForm: React.FC = () => {
  const router = useRouter(); // [Fix 1: Move useRouter to the top level]

  const [user_name, SetUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "remember") {
      setRemember(checked);
    } else if (name === "username") {
      SetUser_name(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", email);

    const formData = {
      username: user_name,
      email: email,
      password: password,
      remember: remember,
    };

    try {
      await axios.post("/api/users/signup", formData);
      toast.success("Registration Successful");
      // [Fix 2: Use router.push for redirection]
      router.push("/login"); // Redirect to homepage
    } catch (error: any) {
      if (
        error.response.status == 400 &&
        error.response?.data?.error == "User already exists"
      ) {
        console.log("Error Response: ", error.response?.data?.error);
        toast.error("This email has already been registered");
      } else if (
        error.response.status == 400 &&
        error.response?.data?.error == "All fields are required"
      ) {
        console.log("Please fill all Fields ");
        toast.error("Please fill all the fields");
      } else {
        console.log("Error: ", error.message);
        toast.error("Apologies, we are having some technical difficulties");
      }
    }
  };

  return (
    <section className="bg-EggShell min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-KC_GREEN p-8">
        <h1 className="text-2xl font-bold text-center text-KC_GREEN mb-6">
          Sign up
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-KC_GREEN"
            >
              Enter Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={user_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-KC_GREEN rounded-md focus:outline-none focus:ring-2 focus:ring-KC_GREEN"
              placeholder="Name"
              required
            />
          </div>

          {/* Email Field */}
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
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-KC_GREEN rounded-md focus:outline-none focus:ring-2 focus:ring-KC_GREEN"
              placeholder="name@company.com"
              required
            />
          </div>

          {/* Password Field */}
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
              value={password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-KC_GREEN rounded-md focus:outline-none focus:ring-2 focus:ring-KC_GREEN"
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={remember}
              onChange={handleChange}
              className="w-4 h-4 text-KC_GREEN border border-KC_GREEN rounded"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-KC_GREEN">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-KC_GREEN text-white font-semibold py-2.5 rounded-md hover:bg-KC_GREEN/90 transition"
          >
            Sign up
          </button>

          {/* Sign in Link */}
          <p className="text-center text-sm text-KC_GREEN">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignInForm;
