import { Metadata } from "next";
import MenuShowcaseServer from "@components/Menu/MenuShowcaseServer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Menu | Kebab's Crib",
  description:
    "Browse our full menu — sandwiches, French tacos, sides, frites, and drinks.",
};

export default function MenuPage() {
  return (
    <div className="bg-textured-eggshell min-h-screen">
      {/* Hero */}
      <div className="pt-32 sm:pt-40 pb-6 px-6">
        <div className="max-w-screen-xl mx-auto flex justify-end">
          
            href="/menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-KC_GREEN/60 hover:text-KC_GREEN underline underline-offset-4"
          >
            View menu PDF →
          </a>
        </div>
        <div className="text-center">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-KC_GREEN/40 font-medium mb-4">
            Explore What We Serve
          </p>
          <h1
            className="font-bold text-KC_GREEN font-wildysans leading-tight"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            Our Menu
          </h1>
          <div className="mx-auto mt-5 h-px w-16 bg-KC_GREEN/15" />
        </div>
      </div>

      {/* Menu showcase — server-rendered */}
      <MenuShowcaseServer />
    </div>
  );
}
