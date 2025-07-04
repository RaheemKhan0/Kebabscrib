"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ClipboardDocumentIcon } from "@heroicons/react/20/solid";

interface ButtonParams {
  href: string;
  Icon: React.ElementType;
  label: string;
}

export function SideBarButton(props: ButtonParams) {
  const path = usePathname()
  return (
    <Link
      href={props.href}
      className={`flex p-2 font-parkinsans text-lg rounded-lg items-center gap-2 justify-center transition-colors duration-150 ease-in-out ${path === props.href ? "bg-green-950" : "hover:bg-green-800 "}`}
    >
      <props.Icon className = "h-5 w-5" />
      <span className="w-2/3">{props.label}</span>
    </Link>
  );
}
