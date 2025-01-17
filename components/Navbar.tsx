"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

const Navbar: React.FC = () => {
  const [Menu, SetMenu] = useState(false);

  return (
    <nav className="bg-KebabGreen border-b-2 border-b-KebabGold">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-KebabGold">
            Kebabs Crib
          </span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => SetMenu(true)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-KebabGold rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
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

        {/* Desktop Menu */}
        <div className="hidden md:block md:w-auto">
          <ul className="flex flex-row font-medium p-4 md:p-0 mt-4 md:mt-0 space-x-8">
            <li>
              <a
                href="/"
                className="block py-2 px-3 hover:text-white duration-300 text-KebabGold"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/MenuItems"
                className="block py-2 px-3 hover:text-white duration-300 text-KebabGold"
              >
                Menu
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 hover:text-white duration-300 text-KebabGold"
              >
                Catering
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 hover:text-white duration-300 text-KebabGold"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/Signup"
                className="block py-2 px-3 hover:text-white duration-300 text-KebabGold"
              >
                Register
              </a>
            </li>

            <li>
              <a
                href="/LogIn"
                className="block py-2 px-3 hover:text-white duration-300 text-KebabGold"
              >
                Log In
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Menu (Dialog without Panel/Title) */}
        <Dialog
          open={Menu}
          onClose={() => SetMenu(false)}
          className="relative z-50"
        >
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            aria-hidden="true"
          />

          {/* Mobile Menu Content */}
          <div className="fixed inset-0 flex items-center justify-center">
            <div
              className={`w-screen h-screen max-w-md bg-KebabGreen shadow-lg p-6
                transform transition-transform duration-300 ease-in-out 
                ${Menu ? "translate-x-0" : "translate-x-full"}`}
            >
              <ul className="mt-[20%] space-y-4">
                {["Home", "Menu", "Catering", "ContactUs"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="block text-lg text-KebabGold hover:text-KebabGold duration-300 border-b-{5px} border-b-KebabGold"
                      onClick={() => SetMenu(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Close Button */}
              <button
                onClick={() => SetMenu(false)}
                className="absolute top-4 left-4 text-KebabGold"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </nav>
  );
};

export default Navbar;
