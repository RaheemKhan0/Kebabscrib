import type { Metadata } from "next";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Delivery | Kebab's Crib — Dubai Marina",
  description: "Order Kebab's Crib for delivery across Dubai via Talabat, Careem, Deliveroo, Noon or Keeta — or call/WhatsApp us directly in Dubai Marina.",
};

const HERO_IMG = "https://res.cloudinary.com/dpqto9jrm/image/upload/v1745680051/Mix_Kebab_jgizht.jpg";

const PARTNERS = [
  { name: "talabat", href: "https://www.talabat.com/uae/restaurant/612274/kebabs-crib?aid=1272", bg: "#FF5A00", fg: "#ffffff" },
  { name: "Careem", href: "https://url.careem.com/uMo8iNUqyKMLA", bg: "#4BB543", fg: "#ffffff" },
  { name: "Deliveroo", href: "https://deliveroo.ae/menu/dubai/marina/kebabs-crib?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share", bg: "#00CCBC", fg: "#ffffff" },
  { name: "noon food", href: "https://food.noon.com/uae-en/outlet/KBBSCR2LUQ/", bg: "#FEEE00", fg: "#3D2B00" },
  { name: "Keeta", href: "https://url-eu.mykeeta.com/JzHpPofz", bg: "#FFC72C", fg: "#3D2B00" },
];

const HERO_STYLE = {
  backgroundImage: `url('${HERO_IMG}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const TEXT_SHADOW = { textShadow: "0 2px 12px rgba(0,0,0,0.65)" };

export default function DeliveryPage() {
  return (
    <main className="bg-textured-eggshell min-h-screen pt-24 md:pt-32">
      {/* Hero — full width, no dark overlay */}
      <div className="relative h-[420px] sm:h-[500px] flex items-center px-8 sm:px-16 lg:px-24" style={HERO_STYLE}>
        <div className="max-w-lg" style={TEXT_SHADOW}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white font-semibold mb-3 font-parkinsans">Order from anywhere</p>
          <h1 className="text-white font-wildysans text-5xl sm:text-6xl mb-4">Delivery</h1>
          <p className="text-white text-base sm:text-lg mb-6 font-parkinsans leading-relaxed">Can&apos;t make it to us? We&apos;ll come to you — order for delivery straight from us or through your favourite platform.</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/971543354066" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-KC_GREEN px-6 py-3.5 text-sm font-semibold text-white font-parkinsans transition hover:brightness-110"><FaWhatsapp className="text-lg" /> WhatsApp order</a>
            <a href="tel:044318050" className="inline-flex items-center gap-2 rounded-xl border border-white/70 px-6 py-3.5 text-sm text-white font-parkinsans transition hover:bg-white/15"><FaPhone className="text-sm" /> Call 04 431 8050</a>
          </div>
          <p className="mt-4 text-xs text-white/90 font-parkinsans max-w-md leading-relaxed">Delivery charges may apply on direct orders — but secret discounts are sometimes awarded on direct delivery.</p>
        </div>
      </div>

      {/* Partners — brand-colored tiles */}
      <div className="px-8 sm:px-16 lg:px-24 py-12 sm:py-16">
        <div className="flex flex-wrap justify-between items-baseline gap-3 mb-6">
          <p className="text-xs uppercase tracking-[0.15em] text-KC_GREEN/60 font-medium font-parkinsans">Or order through a partner</p>
          <div className="flex gap-2">
            <span className="text-[11px] px-3 py-1 rounded-full border border-KC_GREEN/25 text-KC_GREEN/70 font-parkinsans">Dine-in</span>
            <span className="text-[11px] px-3 py-1 rounded-full border border-KC_GREEN/25 text-KC_GREEN/70 font-parkinsans">Takeaway</span>
            <span className="text-[11px] px-3 py-1 rounded-full bg-KC_GREEN text-white font-semibold font-parkinsans">Delivery</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {PARTNERS.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: p.bg, color: p.fg }} className="flex items-center justify-center py-9 px-3 rounded-2xl font-parkinsans font-bold text-lg sm:text-xl tracking-tight shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              {p.name}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
