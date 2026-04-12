import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Delivery | Kebab's Crib",
  description:
    "Order Kebab's Crib for delivery on Talabat, Careem, Deliveroo, Noon, and Keeta.",
};

const PLATFORMS = [
  {
    name: "Talabat",
    href: "https://www.talabat.com/uae/restaurant/612274/kebabs-crib?aid=1272",
    bg: "#FF5A00",
    text: "#ffffff",
    logo: "talabat",
    fontStyle: "font-bold italic",
  },
  {
    name: "Careem",
    href: "https://url.careem.com/uMo8iNUqyKMLA",
    bg: "#006244",
    text: "#4cd964",
    logo: ":careem",
    fontStyle: "font-semibold",
  },
  {
    name: "Deliveroo",
    href: "https://deliveroo.ae/menu/dubai/marina/kebabs-crib?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share",
    bg: "#00CCBC",
    text: "#ffffff",
    logo: "deliveroo",
    fontStyle: "font-bold",
  },
  {
    name: "Noon",
    href: "https://food.noon.com/uae-en/outlet/KBBSCR2LUQ/",
    bg: "#FEEE00",
    text: "#222222",
    logo: ")noon",
    fontStyle: "font-semibold",
  },
  {
    name: "Keeta",
    href: "https://url-eu.mykeeta.com/JzHpPofz",
    bg: "#FEEE00",
    text: "#222222",
    logo: "keeta",
    fontStyle: "font-bold",
  },
] as const;

const TAKEAWAY_VIDEO =
  "https://res.cloudinary.com/dpqto9jrm/video/upload/v1775543820/Takeaway_uknx2k.mp4";

export default function DeliveryPage() {
  return (
    <div className="bg-textured-eggshell min-h-screen">

      {/* ── Hero ── */}
      <div className="pt-32 sm:pt-44 pb-16 sm:pb-24 text-center px-6">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-KC_PEACH font-medium mb-4">
          Order From Anywhere
        </p>
        <h1
          className="font-bold text-EggShell font-wildysans mb-6"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          Delivery
        </h1>
        <p className="text-base sm:text-lg text-EggShell/45 max-w-md mx-auto leading-relaxed">
          Can&apos;t make it to us? We&apos;ll come to you.
        </p>
      </div>

      {/* ── Platforms — branded cards ── */}
      <div className="mx-auto max-w-screen-lg px-6 sm:px-10 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center rounded-2xl py-8 sm:py-10
                transition-all duration-300 hover:scale-[1.04] hover:shadow-xl active:scale-[0.97]"
              style={{ backgroundColor: platform.bg }}
            >
              <span
                className={`text-lg sm:text-xl lg:text-2xl tracking-tight ${platform.fontStyle}
                  transition-transform duration-300 group-hover:scale-110`}
                style={{ color: platform.text }}
              >
                {platform.logo}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Video + Copy ── */}
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-20">

          {/* Video */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden">
              <video
                src={TAKEAWAY_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Copy */}
          <div className="text-center lg:text-left">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-KC_PEACH font-medium mb-4">
              Fresh Off the Grill
            </p>
            <h2
              className="font-bold text-EggShell font-wildysans mb-6 leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Packed With Care, Delivered With Love
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-EggShell/50 mb-10 max-w-md mx-auto lg:mx-0">
              Every takeaway order is wrapped fresh, sealed tight, and sent out
              hot — so it tastes just as good at your door as it does at our
              counter.
            </p>

            {/* Direct order */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="tel:044318050"
                className="inline-flex items-center gap-2 rounded-full bg-KC_PEACH px-7 py-3 text-sm
                  font-semibold uppercase tracking-wide text-KC_GREEN
                  transition hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
              >
                Call 04 431 8050
              </a>
              <a
                href="https://wa.me/971543354066"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-EggShell/20 px-7 py-3 text-sm
                  font-medium uppercase tracking-wide text-EggShell
                  transition-all duration-300 hover:bg-EggShell hover:text-KC_GREEN hover:scale-[1.02] active:scale-[0.98]"
              >
                WhatsApp Order
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom strip — dine-in / takeaway / delivery ── */}
      <div className="border-t border-EggShell/8 py-12">
        <div className="flex items-center justify-center gap-8 sm:gap-12">
          {["Dine-in", "Takeaway", "Delivery"].map((tag, i) => (
            <span key={tag} className="flex items-center gap-2">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-EggShell/15 -ml-5 sm:-ml-7 mr-3 sm:mr-5" />}
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-EggShell/40 font-medium">
                {tag}
              </span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
