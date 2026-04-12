import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Delivery", href: "/delivery" },
  { label: "Directions", href: "/directions" },
  { label: "Contact", href: "/contactus" },
];

const SOCIALS = [
  {
    icon: <FaInstagram className="w-5 h-5" />,
    href: "https://www.instagram.com/kebabscrib",
    label: "Instagram",
  },
  // {
  //   icon: <FaFacebookF className="w-4 h-4" />,
  //   href: "https://facebook.com",
  //   label: "Facebook",
  // },
];

const Footer = () => {
  return (
    <footer className="relative mt-0 overflow-hidden bg-KC_GREEN text-EggShell">
      {/* Subtle texture overlay — mirrors the page's textured-eggshell but inverted */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 20%, rgba(255,255,255,0.04), transparent 45%),
            radial-gradient(circle at 85% 75%, rgba(244,207,75,0.06), transparent 40%),
            repeating-linear-gradient(
              135deg,
              rgba(255,255,255,0.02) 0,
              rgba(255,255,255,0.02) 1px,
              transparent 1px,
              transparent 8px
            )
          `,
        }}
      />

      <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-10">
        {/* ── Top section ── */}
        <div className="grid gap-10 py-14 md:py-16 md:grid-cols-12">

          {/* Brand + tagline */}
          <div className="md:col-span-4">
            <Image
              src="https://res.cloudinary.com/dpqto9jrm/image/upload/v1750239647/KC_Logo_Combination_stacked_green_epqs9c.png"
              alt="Kebab's Crib"
              width={140}
              height={56}
              className="h-14 w-auto brightness-0 invert opacity-90"
            />
            <p className="mt-5 text-sm leading-relaxed text-EggShell/60 max-w-xs">
              Juicy kebabs, melted cheese, bold flavors — crafted with love and
              fire since 2011. Authentic French-Lebanese street food, straight
              from our grill to your table.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full
                    bg-EggShell/10 text-EggShell/70 transition-all duration-200
                    hover:bg-KC_PEACH hover:text-KC_GREEN hover:scale-105"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-6">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-EggShell/40 mb-5">
              Navigate
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-EggShell/70 transition-colors duration-200 hover:text-EggShell"
                  >
                    <span className="h-px w-0 bg-KC_PEACH transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Location */}
          <div className="md:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-EggShell/40 mb-5">
              Visit &amp; Connect
            </h3>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3 text-sm text-EggShell/70">
                <IoLocationSharp className="w-4 h-4 mt-0.5 flex-shrink-0 text-KC_PEACH" />
                <p>
                  Shop 1, Marina View Tower A
                  <br />
                  Dubai Marina, Dubai
                </p>
              </div>

              {/* Landline */}
              <div className="flex items-center gap-3 text-sm text-EggShell/70">
                <IoMdCall className="w-4 h-4 flex-shrink-0 text-KC_PEACH" />
                <span>04 431 8050</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 text-sm text-EggShell/70">
                <MdOutlineEmail className="w-4 h-4 flex-shrink-0 text-KC_PEACH" />
                <span>kebabscrib@gmail.com</span>
              </div>
            </div>

            {/* Opening hours */}
            <div className="mt-6 rounded-xl bg-EggShell/5 border border-EggShell/10 p-4">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-KC_PEACH mb-2">
                Opening Hours
              </h4>
              <div className="space-y-1 text-sm text-EggShell/60">
                <div className="flex justify-between">
                  <span>Sun – Thu</span>
                  <span className="text-EggShell/80">11:30 AM – 4:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Fri – Sat</span>
                  <span className="text-EggShell/80">11:30 AM – 4:45 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-EggShell/10" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center gap-3 py-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-EggShell/40">
            &copy; {new Date().getFullYear()} Kebab&apos;s Crib. All rights reserved.
          </p>
          <p className="text-xs text-EggShell/30">
            Made with fire &amp; heart in Dubai
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
