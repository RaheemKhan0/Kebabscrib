"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import LoadingScreen from "./Common/LoadingScreen";
import {
  UserIcon,
  ChevronDownIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const [menu, SetMenu] = useState(false);
  const [usermenu, setUserMenu] = useState(false);
  const session = useSession();

  const router = useRouter();
  const logout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
      toast.success("Logout Successful!");
    } catch (error) {
      toast.error("Failed to Logout");
      console.error(error);
    }
  };

  return (
    <nav className="bg-KebabGreen border-b-2 border-b-KebabGold">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-KebabGold">
            Kebabs Crib
          </span>
        </a> */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/assets/kebabscrib_logo_single.png"
            alt="Kebab's Crib Logo"
            className="h-10 w-auto"
          />
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
                href="/menu"
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
                href="/signup"
                className={`block py-2 px-3 hover:text-white duration-300 text-KebabGold ${session.data?.user ? "hidden" : ""}`}
              >
                Register
              </a>
            </li>

            <li>
              <a
                href="/login"
                className={`block py-2 px-3 hover:text-white duration-300 text-KebabGold ${session.data?.user ? "hidden" : ""}`}
              >
                Log In
              </a>
            </li>
            <li>
              {/* User Menu only shows when the user is Logged In */}
              <Menu
                as="div"
                className={`relative inline-block z-50 text-left ${session.data?.user ? "" : "hidden"}`}
              >
                <div>
                  <MenuButton className="inline-flex items-center justify-center gap-x-1.5 rounded-full bg-KebabGreen p-2 ring-2 ring-KebabGold shadow-lg hover:ring-KebabGold/80 hover:bg-KebabGreen/90 transition duration-300">
                    <UserIcon className="h-6 w-6 text-KebabGold" />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {/* Navigate to Account Settings */}
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => router.push("/profile")}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          Account Settings
                        </button>
                      )}
                    </MenuItem>

                    {/* Navigate to Support Page */}
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => router.push("/support")}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          Support
                        </button>
                      )}
                    </MenuItem>

                    {/* License Page */}
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => router.push("/license")}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          License
                        </button>
                      )}
                    </MenuItem>

                    {/* Logout Button */}
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            active ? "bg-red-100 text-red-700" : "text-red-600"
                          }`}
                        >
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>{" "}
            </li>
            <li>
              <a
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                href="/cart"
              >
                <ShoppingCartIcon className="h-6 w-6 text-KebabGold" />
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Menu (Dialog without Panel/Title) */}
        <Dialog
          open={menu}
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
                ${menu ? "translate-x-0" : "translate-x-full"}`}
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
