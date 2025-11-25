"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import LoadingScreen from "./Common/LoadingScreen";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { Fragment } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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

  useGSAP(() => {
    gsap.fromTo(
      ".navbar",
      {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      {
        y: 0,
        opacity: 1,
      },
    );
  }, []);

  if (status == "loading") {
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden">
      <LoadingScreen />
    </div>;
  } else {
    return (
      <nav className="navbar absolute top-0 left-0 w-full z-50 text-white">
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
                  href="/contactus"
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
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-KC_GREEN rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
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
                        <a
                          href={item.path}
                          className="relative group block text-lg text-KC_GREEN"
                          onClick={() => SetMenu(false)}
                        >
                          <span className="relative z-10">{item.name}</span>
                          <span
                            className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-KC_GREEN transition-all duration-300 group-hover:w-10 group-hover:left-0"
                            style={{ transform: "translateY(6px)" }}
                          />
                        </a>
                      </li>
                    ))}
                    {status === "authenticated" ? (
                      <Menu
                        as="div"
                        className="absolute inline-block text-left top-0.5 right-4"
                      >
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
                                  onClick={() => {
                                    SetMenu(false);
                                    router.push("/profile");
                                  }}
                                  className={`block px-4 py-2 text-sm w-full text-left ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                                >
                                  Account Settings
                                </button>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    SetMenu(false);
                                    router.push("/support");
                                  }}
                                  className={`block px-4 py-2 text-sm w-full text-left ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                                >
                                  Support
                                </button>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    SetMenu(false);
                                    router.push("/license");
                                  }}
                                  className={`block px-4 py-2 text-sm w-full text-left ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                                >
                                  License
                                </button>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    SetMenu(false);
                                    logout();
                                  }}
                                  className={`block px-4 py-2 text-sm w-full text-left ${active ? "bg-red-100 text-red-700" : "text-red-600"}`}
                                >
                                  Sign out
                                </button>
                              )}
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </Menu>
                    ) : (
                      <>
                        <li>
                          <a
                            href="/signup"
                            className="relative group block text-lg text-KC_GREEN"
                            onClick={() => SetMenu(false)}
                          >
                            <span className="relative z-10">Signup</span>
                            <span
                              className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-KC_GREEN transition-all duration-300 group-hover:w-10 group-hover:left-0"
                              style={{ transform: "translateY(6px)" }}
                            />
                          </a>
                        </li>
                        <li>
                          <a
                            href="/login"
                            className="relative group block text-lg text-KC_GREEN"
                            onClick={() => SetMenu(false)}
                          >
                            <span className="relative z-10">Login</span>
                            <span
                              className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-KC_GREEN transition-all duration-300 group-hover:w-10 group-hover:left-0"
                              style={{ transform: "translateY(6px)" }}
                            />
                          </a>
                        </li>
                      </>
                    )}
                    <li>
                      <a
                        href="/cart"
                        onClick={() => SetMenu(false)}
                        className="relative group block text-lg text-KC_GREEN"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <ShoppingCartIcon className="h-6 w-6 text-KC_GREEN " />
                        </span>
                        <span
                          className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-KC_GREEN transition-all duration-300 group-hover:w-10 group-hover:left-0"
                          style={{ transform: "translateY(6px)" }}
                        />
                      </a>
                    </li>
                  </ul>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>{" "}
      </nav>
    );
  }
};

export default Navbar;
