"use client";
import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [menu, SetMenu] = useState(false);

  return (
    <nav className="navbar absolute top-0 left-0 w-full z-50 text-white">
      <div className="relative flex items-center px-4 py-3">
        {/* Left: Logo */}
        <div className="flex-shrink-0 absolute left-4 top-3">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="https://res.cloudinary.com/dpqto9jrm/image/upload/v1750239647/KC_Logo_Combination_stacked_green_epqs9c.png"
              alt="Kebab's Crib Logo"
              width={144}
              height={80}
              priority
              className="h-20 w-36"
            />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex flex-1 justify-center mt-7">
          <ul className="flex space-x-8 font-medium font-parkinsans text-md-lg text-KebabGreen">
            <li>
              <Link
                href="/"
                className="py-2 px-3 duration-300 hover:text-Light_Peach"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="py-2 px-3 duration-300 hover:text-Light_Peach"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/contactus"
                className="py-2 px-3 duration-300 hover:text-Light_Peach"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto">
          <button
            onClick={() => SetMenu(true)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-KC_GREEN rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Dialog Menu */}
      <Transition show={menu} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => SetMenu(false)}
        >
          {/* Backdrop */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </TransitionChild>

          {/* Panel */}
          <div className="fixed inset-0 flex justify-end">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="w-full max-w-xs bg-EggShell p-6 h-full shadow-xl relative">
                <button
                  onClick={() => SetMenu(false)}
                  className="absolute top-4 left-4 text-KC_GREEN"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>

                <ul className="mt-20 space-y-4">
                  {[
                    { name: "Home", path: "/" },
                    { name: "Menu", path: "/menu" },
                    { name: "Contact Us", path: "/contactus" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.path}
                        className="relative group block text-lg text-KC_GREEN"
                        onClick={() => SetMenu(false)}
                      >
                        <span className="relative z-10">{item.name}</span>
                        <span
                          className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-KC_GREEN transition-all duration-300 group-hover:w-10 group-hover:left-0"
                          style={{ transform: "translateY(6px)" }}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>{" "}
    </nav>
  );
};

export default Navbar;
