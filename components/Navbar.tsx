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
const NAV_BG = "#F3E63C"; // yellow bar (shown on scroll / non-home pages)
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
