import type { Metadata } from "next";
import { FaMotorcycle, FaWhatsapp, FaPhone } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Delivery | Kebab's Crib — Dubai Marina",
  description: "Order Kebab's Crib for delivery across Dubai via Talabat, Careem, Deliveroo, Noon or Keeta — or call/WhatsApp us directly in Dubai Marina.",
};

const HERO_IMG = "https://res.cloudinary.com/dpqto9jrm/image/upload/v1745680051/Mix_Kebab_jgizht.jpg";

const PARTNERS = [
  { name: "talabat", href: "https://www.talabat.com/uae/restaurant/612274/kebabs-crib?aid=1272" },
  { name: "careem", href: "https://url.careem.com/uMo8iNUqyKMLA" },
  { name: "deliveroo", href: "https://deliveroo.ae/menu/dubai/marina/kebabs-crib?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share" },
  { name: "noon food", href: "https://food.noon.com/uae-en/outlet/KBBSCR2LUQ/" },
  { name: "keeta", href: "https://url-eu.mykeeta.com/JzHpPofz" },
];

const HERO_STYLE = {
  backgroundImage: `linear-gradient(90deg, rgba(0,38,26,0.92) 0%, rgba(0,52,35,0.6) 45%, rgba(0,52,35,0.15) 80%), url('${HERO_IMG}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export default function DeliveryPage() {
  return (
    <main className="bg-KC_GREEN min-h-screen pt-24 md:pt-32">
      {/* Hero — full width */}
      <div className="relative h-[420px] sm:h-[500px] flex items-center px-8 sm:px-16 lg:px-24" style={HERO_STYLE}>
        <div className="max-w-lg">
          <p className="text-[11px] uppercase tracking-[0.2em] text-KC_PEACH font-semibold mb-3 font-parkinsans">Order from anywhere</p>
          <h1 className="text-KC_PEACH font-wildysans text-5xl sm:text-6xl mb-4">Delivery</h1>
          <p className="text-EggShell/85 text-base sm:text-lg mb-8 font-parkinsans leading-relaxed">Can&apos;t make it to us? We&apos;ll come to you — order for delivery straight from us or through your favourite platform.</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/971543354066" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-KC_PEACH px-6 py-3.5 text-sm font-semibold text-KC_GREEN font-parkinsans transition hover:brightness-105"><FaWhatsapp className="text-lg" /> WhatsApp order</a>
            <a href="tel:044318050" className="inline-flex items-center gap-2 rounded-xl border border-KC_PEACH/50 px-6 py-3.5 text-sm text-KC_PEACH font-parkinsans transition hover:bg-KC_PEACH/10"><FaPhone className="text-sm" /> Call 04 431 8050</a>
          </div>
        </div>
      </div>

      {/* Partners — green bg, peach text */}
      <div className="px-8 sm:px-16 lg:px-24 py-12 sm:py-16">
        <div className="flex flex-wrap justify-between items-baseline gap-3 mb-6">
          <p className="text-xs uppercase tracking-[0.15em] text-KC_PEACH/70 font-medium font-parkinsans">Or order through a partner</p>
          <div className="flex gap-2">
            <span className="text-[11px] px-3 py-1 rounded-full border border-KC_PEACH/30 text-KC_PEACH/80 font-parkinsans">Dine-in</span>
            <span className="text-[11px] px-3 py-1 rounded-full border border-KC_PEACH/30 text-KC_PEACH/80 font-parkinsans">Takeaway</span>
            <span className="text-[11px] px-3 py-1 rounded-full bg-KC_PEACH text-KC_GREEN font-semibold font-parkinsans">Delivery</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {PARTNERS.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 py-8 px-2 rounded-xl border border-KC_PEACH/25 transition hover:border-KC_PEACH hover:bg-KC_PEACH/10 hover:-translate-y-0.5">
              <FaMotorcycle className="text-2xl text-KC_PEACH" />
              <span className="text-sm font-medium text-KC_PEACH font-parkinsans">{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
