"use client";
import { SideBarButton } from "./Buttons/SideBarButton";
import {
  ShoppingCartIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/20/solid";

const SideBar = () => {
  return (
    <aside className="w-64 bg-KC_GREEN text-KC_PEACH min-h-screen">
      <a href="/admin/dashboard" className="mx-auto">
        <img
          src="/assets/KC_Logo_admin.png"
          alt="Kebab's Crib Logo"
          className="h-30 w-36 mx-auto"
        />
      </a>

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
  );
};

export default SideBar;
