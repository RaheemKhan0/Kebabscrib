"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SideBarButton } from "./Buttons/SideBarButton";
import {
  ShoppingCartIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ClipboardDocumentIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-KC_GREEN p-2 rounded-md"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-KC_PEACH" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-KC_PEACH" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-KC_GREEN text-KC_PEACH z-40 transform transition-transform duration-300 ease-in-out
  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:fixed mr-10`}
      >
        <Link href="/admin/dashboard" className="block py-6 px-4">
          <Image
            src="/assets/KC_Logo_admin.png"
            alt="Kebab's Crib Logo"
            width={144}
            height={120}
            priority
            className="h-30 w-36 mx-auto"
          />
        </Link>

        <nav className="p-6 space-y-4 mt-5">
          <SideBarButton
            label="Dashboard"
            href="/admin/dashboard"
            Icon={ClipboardDocumentIcon}
          />
          <SideBarButton
            label="Orders"
            href="/admin/orders"
            Icon={ShoppingCartIcon}
          />
          <SideBarButton
            label="Products"
            href="/admin/products"
            Icon={UserGroupIcon}
          />
          <SideBarButton
            label="Settings"
            href="/admin/settings"
            Icon={Cog6ToothIcon}
          />
        </nav>
      </aside>

      {/* Optional overlay when open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;
