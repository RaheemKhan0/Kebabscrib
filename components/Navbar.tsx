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

const NAV_BG = "#CD9B51";

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
    `relative py-1 text-xl md:text-2xl font-bold font-parkinsans tracking-wide transition-colors duration-200 group ${
      overHero
        ? pathname === path
          ? "text-white"
          : "text-white/80 hover:text-white"
        : pathname === path
        ? "text-[#006244]"
        : "text-[#006244]/70 hover:text-[#006244]"
    }`;

  const underlineClass = (path: string) =>
    `absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
      overHero ? "bg-white" : "bg-[#006244]"
    } ${pathname === path ? "w-full" : "w-0 group-hover:w-full"}`;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${showScrolledStyle ? "backdrop-blur-sm shadow-sm" : "bg-transparent"}`} style={showScrolledStyle ? { backgroundColor: NAV_BG } : undefined}>
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="flex items-center h-24 md:h-32">
            <div className="hidden md:flex items-center gap-8 flex-1">
              {NAV_LEFT.map((item) => (
                <Link key={item.name} href={item.path} className={linkClass(item.path)}>
                  {item.name}
                  <span className={underlineClass(item.path)} />
                </Link>
              ))}
            </div>

            <button className={`md:hidden p-2 -ml-2 mr-auto transition-colors duration-300 ${overHero ? "text-white" : "text-[#006244]"}`} onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex justify-center flex-shrink-0 md:flex-1">
              <Link href="/">
                <Image src="/assets/Kebabs Crib Logo Website.png" alt="Kebab's Crib" width={240} height={240} priority className="h-24 md:h-32 w-auto transition-all duration-300" />
                </Link>
            </div>

            <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
              {NAV_RIGHT.map((item) => (
                <Link key={item.name} href={item.path} className={linkClass(item.path)}>
                  {item.name}
                  <span className={underlineClass(item.path)} />
                </Link>
              ))}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={`transition-colors duration-200 ${overHero ? "text-white/70 hover:text-white" : "text-[#006244]/70 hover:text-[#006244]"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>

            <div className="md:hidden w-10 ml-auto" />
          </div>
        </div>
      </nav>

      <Transition show={mobileOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setMobileOpen(false)}>
          <TransitionChild as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>
          <div className="fixed inset-0 flex justify-end">
            <TransitionChild as={Fragment} enter="transform transition ease-out duration-300" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in duration-200" leaveFrom="translate-x-0" leaveTo="translate-x-full">
              <DialogPanel className="w-72 h-full shadow-xl flex flex-col p-8" style={{ backgroundColor: NAV_BG }}>
                <button onClick={() => setMobileOpen(false)} className="self-end text-[#006244]/70 hover:text-[#006244] transition-colors mb-8" aria-label="Close menu">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <Link href="/" onClick={() => setMobileOpen(false)} className="mb-10">
                  <Image src="/assets/Kebabs Crib Logo Website.png" alt="Kebab's Crib" width={140} height={140} className="h-20 w-auto" />
                </Link>

                <ul className="flex flex-col gap-6 flex-1">
                  {[...NAV_LEFT, ...NAV_RIGHT].map((item) => (
                    <li key={item.name}>
                      <Link href={item.path} onClick={() => setMobileOpen(false)} className={`text-lg font-medium transition-colors duration-200 ${pathname === item.path ? "text-[#006244]" : "text-[#006244]/60 hover:text-[#006244]"}`}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#006244]/60 hover:text-[#006244] transition-colors text-sm mt-8">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                  </svg>
                  @kebabscrib
                </a>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Navbar;
