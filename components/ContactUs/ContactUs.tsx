"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactUs: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post("/api/users/contactus", form);
      toast.success("Message sent!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-EggShell min-h-screen">

      {/* ── Hero ── */}
      <div className="pt-32 sm:pt-40 pb-12 text-center px-6">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-KC_GREEN/40 font-medium mb-4">
          Say Hello
        </p>
        <h1
          className="font-bold text-KC_GREEN font-wildysans"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          Get In Touch
        </h1>
        <div className="mx-auto mt-5 h-px w-20 bg-KC_GREEN/15" />
        <p className="mt-6 text-base sm:text-lg text-KC_GREEN/45 max-w-md mx-auto leading-relaxed">
          Questions, feedback, or just want to say hi — we&apos;d love to hear from you.
        </p>
      </div>

      {/* ── Minimal Form ── */}
      <div className="mx-auto max-w-xl px-6 sm:px-8 pb-16">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Name — underline style */}
          <div>
            <label
              htmlFor="name"
              className="block text-[10px] uppercase tracking-[0.25em] text-KC_GREEN/40 font-medium mb-2"
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
              placeholder="Your name"
              className="w-full bg-transparent border-0 border-b border-KC_GREEN/15 pb-3
                text-base text-KC_GREEN placeholder:text-KC_GREEN/25
                focus:outline-none focus:border-KC_GREEN transition-colors duration-200"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-[10px] uppercase tracking-[0.25em] text-KC_GREEN/40 font-medium mb-2"
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
              placeholder="you@example.com"
              className="w-full bg-transparent border-0 border-b border-KC_GREEN/15 pb-3
                text-base text-KC_GREEN placeholder:text-KC_GREEN/25
                focus:outline-none focus:border-KC_GREEN transition-colors duration-200"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-[10px] uppercase tracking-[0.25em] text-KC_GREEN/40 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Tell us what's on your mind..."
              className="w-full bg-transparent border-0 border-b border-KC_GREEN/15 pb-3
                text-base text-KC_GREEN placeholder:text-KC_GREEN/25 resize-none
                focus:outline-none focus:border-KC_GREEN transition-colors duration-200"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-3 rounded-full bg-KC_GREEN px-8 py-3.5 text-sm
                font-semibold uppercase tracking-wide text-EggShell
                transition hover:bg-KC_Forest hover:scale-[1.02] active:scale-[0.98]
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {sending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending
                </>
              ) : (
                <>
                  Send Message
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ── Quick contact strip ── */}
      <div className="border-t border-KC_GREEN/10 py-12">
        <div className="mx-auto max-w-screen-md px-6">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-KC_GREEN/35 mb-5">
            Or reach us directly
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
            <a href="tel:044318050" className="text-sm text-KC_GREEN/70 hover:text-KC_PEACH transition-colors">
              04 431 8050
            </a>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-KC_GREEN/15" />
            <a href="https://wa.me/971543354066" target="_blank" rel="noopener noreferrer"
              className="text-sm text-KC_GREEN/70 hover:text-KC_PEACH transition-colors">
              WhatsApp
            </a>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-KC_GREEN/15" />
            <span className="text-sm text-KC_GREEN/70">
              kebabscrib@gmail.com
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactUs;
