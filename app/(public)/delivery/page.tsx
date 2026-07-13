import type { Metadata } from "next";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Delivery | Kebab's Crib — Dubai Marina",
  description: "Order Kebab's Crib in Dubai Marina — WhatsApp us direct, or via Talabat, Deliveroo, Careem, Noon Food & Keeta for pickup & delivery.",
};

const HERO_IMG = "https://res.cloudinary.com/dpqto9jrm/image/upload/v1745680051/Mix_Kebab_jgizht.jpg";
const HERO_STYLE = { backgroundImage: `url('${HERO_IMG}')`, backgroundSize: "cover", backgroundPosition: "center" };
const TEXT_SHADOW = { textShadow: "0 2px 12px rgba(0,0,0,0.65)" };

const ORDER = [
  { label: "WhatsApp", sub: "Order Direct", href: "https://wa.me/971543354066" },
  { label: "Talabat", sub: "Pickup & Delivery", href: "https://www.talabat.com/uae/restaurant/612274/kebabs-crib?aid=1272" },
  { label: "Deliveroo", sub: "Pickup & Delivery", href: "https://deliveroo.ae/menu/dubai/marina/kebabs-crib?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share" },
  { label: "Careem", sub: "Pickup & Delivery", href: "https://url.careem.com/uMo8iNUqyKMLA" },
  { label: "Noon Food", sub: "Pickup & Delivery", href: "https://food.noon.com/uae-en/outlet/KBBSCR2LUQ/" },
  { label: "Keeta", sub: "Pickup & Delivery", href: "https://url-eu.mykeeta.com/JzHpPofz" },
];

export default function DeliveryPage() {
  return (
    <main className="bg-textured-eggshell min-h-screen pt-24 md:pt-32">
      {/* Hero — kept as-is, Delivery now bold */}
      <div className="relative h-[420px] sm:h-[500px] flex items-center px-8 sm:px-16 lg:px-24" style={HERO_STYLE}>
        <div className="max-w-lg" style={TEXT_SHADOW}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white font-semibold mb-3 font-parkinsans">Order from anywhere</p>
          <h1 className="text-white font-wildysans font-bold text-5xl sm:text-6xl mb-4">Delivery</h1>
          <p className="text-white text-base sm:text-lg mb-6 font-parkinsans leading-relaxed">Can&apos;t make it to us? We&apos;ll come to you — order for delivery straight from us or through your favourite platform.</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/971543354066" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-KC_GREEN px-6 py-3.5 text-sm font-semibold text-white font-parkinsans transition hover:brightness-110"><FaWhatsapp className="text-lg" /> WhatsApp order</a>
            <a href="tel:044318050" className="inline-flex items-center gap-2 rounded-xl border border-white/70 px-6 py-3.5 text-sm text-white font-parkinsans transition hover:bg-white/15"><FaPhone className="text-sm" /> Call 04 431 8050</a>
          </div>
          <p className="mt-4 text-xs text-white/90 font-parkinsans max-w-md leading-relaxed">Delivery charges may apply on direct orders — but secret discounts are sometimes awarded on direct delivery.</p>
        </div>
      </div>

      {/* Bottom — editorial order list, no underline */}
      <div className="mx-auto max-w-3xl px-6 sm:px-10 py-14 sm:py-20">
        <div className="font-parkinsans text-KC_GREEN">
          <p className="text-lg sm:text-xl uppercase tracking-wide leading-snug">Shop 1, Marina View Tower A<br />Dubai Marina, Dubai</p>
          <p className="mt-4 text-sm sm:text-base uppercase tracking-wide text-KC_GREEN/70">Sun–Thu 11:30 AM–4:30 AM · Fri–Sat 11:30 AM–4:45 AM</p>
        </div>

        <div className="mt-8 h-px w-full bg-KC_GREEN/15" />

        <ul className="mt-4 flex flex-col divide-y divide-KC_GREEN/10">
          {ORDER.map((o) => (
            <li key={o.label}>
              <a href={o.href} target="_blank" rel="noopener noreferrer" className="group flex flex-wrap items-baseline gap-x-3 py-5 font-parkinsans uppercase">
                <span className="text-2xl sm:text-4xl font-bold text-KC_GREEN tracking-tight group-hover:text-KC_PEACH transition-colors">{o.label}</span>
                <span className="text-base sm:text-2xl text-KC_GREEN/45 group-hover:text-KC_GREEN/70 transition-colors">— {o.sub}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 h-px w-full bg-KC_GREEN/15" />
        <p className="mt-6 text-sm uppercase tracking-[0.15em] text-KC_GREEN/50 font-parkinsans">Open for dine in, takeaway &amp; delivery</p>
      </div>
    </main>
  );
}
