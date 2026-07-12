"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LEFT = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
];
const NAV_RIGHT = [
  { name: "Delivery", path: "/delivery" },
  { name: "Contact", path: "/contactus" },
];
const INSTAGRAM_URL = "https://www.instagram.com/kebabscrib";

// NAV COLORS — change these two to your exact brand hex codes anytime.
const NAV_BG = "#F3E63C"; // yellow bar (shown on scroll)
const NAV_GREEN = "#0F6E40"; // green text + underline

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHomepage = pathname === "/";
  const overHero = isHomepage && !scrolled;
  const showScrolledStyle = !isHomepage || scrolled;

  const linkClass = (path: string) =>
    `relative py-1 text-lg md:text-xl font-bold font-parkinsans tracking-wide transition-colors duration-200 group ${
      overHero
        ? pathname === path
          ? "text-white"
          : "text-white/80 hover:text-white"
        : pathname === path
        ? "text-[#0F6E40]"
        : "text-[#0F6E40]/70 hover:text-[#0F6E40]"
    }`;

  const underlineClass = (path: string) =>
    `absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
      overHero ? "bg-white" : "bg-[#0F6E40]"
    } ${pathname === path ? "w-full" : "w-0 group-hover:w-full"}`;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${showScrolledStyle ? "backdrop-blur-sm shadow-sm" : "bg-transparent"}`} style={showScrolledStyle ? { backgroundColor: NAV_BG } : undefined}>
        <div className="mx-auto max-w-screen-xl px-6">
          {/* BAR HEIGHT — tall band. Tweak h-16 / md:h-24 to taste. */}
          <div className="flex items-center h-16 md:h-24">
            {/* LEFT LINKS — desktop only */}
            <div className="hidden md:flex items-center gap-8 flex-1">
              {NAV_LEFT.map((item) => (
                <Link key={item.name} href={item.path} className={linkClass(item.path)}>
                  {item.name}
                  <span className={underlineClass(item.path)} />
                </Link>
              ))}
            </div>

            {/* MOBILE: hamburger — left side */}
            <button className={`md:hidden p-2 -ml-2 mr-auto transition-colors duration-300 ${overHero ? "text-white" : "text-[#0F6E40]"}`} onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* CENTER LOGO — round badge, bigger + sharp. Tweak h-14 / md:h-20. */}
            <div className="flex justify-center flex-shrink-0 md:flex-1">
              <Link href="/">
                <Image src="/assets/Logo.PNG" alt="Kebab's Crib" width={200} height={200} priority className="h-14 md:h-20 w-auto transition-all duration-300" />
              </Link>
            </div>

            {/* RIGHT LINKS + INSTAGRAM — desktop only */}
            <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
              {NAV_RIGHT.map((item) => (
                <Link key={item.name} href={item.path} className={linkClass(item.path)}>
                  {item.name}
                  <span className={underlineClass(item.path)} />
                </Link>
              ))}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={`transition-colors duration-200 ${overHero ? "text-white/70 hover:text-white" : "text-[#0F6E40]/70 hover:text-[#0F6E40]"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
