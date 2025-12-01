"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactUs: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/contactus", {name : form.name, email : form.email, message : form.message});
      toast.success("Message sent!");
      setForm({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message.");
    }
  };

  return (
    <section className="bg-EggShell py-16 px-4 flex flex-col items-center mt-16">
      <h2 className="text-3xl font-bold text-KC_GREEN mb-6 text-center">
        Contact Us
      </h2>
      <p className="text-center max-w-xl text-KC_GREEN mb-10">
        Have a question, feedback or a complaint? Reach out to us and we&apos;ll get
        back to you soon!
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl space-y-4"
      >
        <div>
          <label
            className="block text-sm font-semibold text-KC_GREEN mb-1"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-KC_GREEN"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            className="block text-sm font-semibold text-KC_GREEN mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-KC_GREEN"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            className="block text-sm font-semibold text-KC_GREEN mb-1"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-KC_GREEN"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-KC_Yellow text-KC_GREEN font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors duration-200"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactUs;
