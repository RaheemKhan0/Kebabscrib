"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import LoadingScreen from "./Common/LoadingScreen";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const [menu, SetMenu] = useState(false);
  const { data: session, status } = useSession();
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

  if (status == "loading") {
    return <LoadingScreen />;
  } else {
    return (
      <nav className="absolute top-0 left-0 w-full z-50 text-white">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-3">
              <img
                src="https://res.cloudinary.com/dpqto9jrm/image/upload/v1750239647/KC_Logo_Combination_stacked_green_epqs9c.png"
                alt="Kebab's Crib Logo"
                className="h-20 w-36"
              />
            </a>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex justify-center flex-1">
            <ul className="flex space-x-8 font-medium font-parkinsans text-md-lg  text-KebabGreen">
              <li>
                <a
                  href="/"
                  className="py-2 px-3 duration-300 hover:text-Light_Peach"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/menu"
                  className="py-2 px-3 duration-300 hover:text-Light_Peach"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="py-2 px-3 duration-300 hover:text-Light_Peach"
                >
                  Catering
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="py-2 px-3 duration-300 hover:text-Light_Peach"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Right: Auth Links and Cart */}
          <div className="hidden md:flex items-center gap-4 text-md-lg font-parkinsans">
            {status !== "authenticated" && (
              <>
                <a
                  href="/signup"
                  className="py-2 px-3 hover:text-Light_Peach duration-300 text-KebabGreen"
                >
                  Register
                </a>
                <a
                  href="/login"
                  className="py-2 px-3 hover:text-Light_Peach duration-300 text-KebabGreen"
                >
                  Log In
                </a>
              </>
            )}

            {status === "authenticated" && (
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex items-center justify-center gap-x-1.5 rounded-full bg-KebabGreen p-2 ring-2 ring-KC_PEACH shadow-lg hover:ring-KC_PEACH/80 hover:bg-KebabGreen/90 transition duration-300">
                    <UserIcon className="h-6 w-6 text-KC_PEACH" />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-none">
                  <div className="py-1">
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => router.push("/profile")}
                          className={`block px-4 py-2 text-sm w-full text-left ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                        >
                          Account Settings
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => router.push("/support")}
                          className={`block px-4 py-2 text-sm w-full text-left ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                        >
                          Support
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() => router.push("/license")}
                          className={`block px-4 py-2 text-sm w-full text-left ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                        >
                          License
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`block px-4 py-2 text-sm w-full text-left ${active ? "bg-red-100 text-red-700" : "text-red-600"}`}
                        >
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            )}

            <a href="/cart" className="px-4 py-2">
              <ShoppingCartIcon className="h-6 w-6 text-KC_GREEN hover:text-Light_Peach duration-300" />
            </a>
          </div>

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
        </div>

        {/* Mobile Dialog Menu */}
        <Dialog
          open={menu}
          onClose={() => SetMenu(false)}
          className="relative z-50"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex items-center justify-center">
            <div
              className={`w-screen h-screen max-w-md bg-KebabGreen shadow-lg p-6 transform transition-transform duration-300 ease-in-out ${menu ? "translate-x-0" : "translate-x-full"}`}
            >
              <ul className="mt-[20%] space-y-4">
                {["Home", "Menu", "Catering", "ContactUs"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="block text-lg text-KebabGold hover:text-KebabGold duration-300 border-b-[5px] border-b-KebabGold"
                      onClick={() => SetMenu(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
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
      </nav>
    );
  }
};

export default Navbar;
