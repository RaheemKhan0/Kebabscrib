import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Contact", href: "/contactus" },
];

const DELIVERY_PLATFORMS = [
  { name: "Talabat",   href: "https://www.talabat.com/uae/restaurant/612274/kebabs-crib?aid=1272" },
  { name: "Careem",    href: "https://url.careem.com/uMo8iNUqyKMLA" },
  { name: "Deliveroo", href: "https://deliveroo.ae/menu/dubai/marina/kebabs-crib?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share" },
  { name: "Noon",      href: "https://food.noon.com/uae-en/outlet/KBBSCR2LUQ/" },
  { name: "Keeta",     href: "https://url-eu.mykeeta.com/JzHpPofz" },
];

const Footer = () => {
  return (
    <footer className="relative mt-0 overflow-hidden bg-KC_RED text-EggShell">
      <div className="relative mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-10">
        {/* ── Main section ── */}
        <div className="grid grid-cols-2 gap-10 py-14 md:py-16 md:grid-cols-12">

          {/* Navigate + Follow Us (left column on mobile) */}
          <div className="md:col-span-3">
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

            {/* Follow Us — under Navigate on mobile, separate column on desktop */}
            <div className="mt-8 md:hidden">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-EggShell/40 mb-5">
                Follow Us
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/kebabscrib"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full
                    bg-EggShell/10 text-EggShell/70 transition-all duration-200
                    hover:bg-KC_PEACH hover:text-KC_RED hover:scale-105"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full
                    bg-EggShell/10 text-EggShell/70 transition-all duration-200
                    hover:bg-KC_PEACH hover:text-KC_RED hover:scale-105"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Order Online (right column on mobile) */}
          <div className="md:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-EggShell/40 mb-5">
              Order Online
            </h3>
            <ul className="space-y-3">
              {DELIVERY_PLATFORMS.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-EggShell/70 transition-colors duration-200 hover:text-EggShell"
                  >
                    <span className="h-px w-0 bg-KC_PEACH transition-all duration-300 group-hover:w-4" />
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us — desktop only (separate column) */}
          <div className="hidden md:block md:col-span-3 md:col-start-10">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-EggShell/40 mb-5">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/kebabscrib"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full
                  bg-EggShell/10 text-EggShell/70 transition-all duration-200
                  hover:bg-KC_PEACH hover:text-KC_RED hover:scale-105"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full
                  bg-EggShell/10 text-EggShell/70 transition-all duration-200
                  hover:bg-KC_PEACH hover:text-KC_RED hover:scale-105"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
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
            Fast. Fresh. Fantastique
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
