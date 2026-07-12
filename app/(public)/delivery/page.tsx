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
  backgroundImage: `linear-gradient(90deg, rgba(15,10,7,0.9) 0%, rgba(15,10,7,0.55) 45%, rgba(15,10,7,0.12) 78%), url('${HERO_IMG}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export default function DeliveryPage() {
  return (
    <main className="bg-EggShell min-h-screen pt-24 md:pt-32 pb-16">
      <div className="mx-auto max-w-screen-lg px-6 py-6">
        <div className="rounded-2xl overflow-hidden border border-KC_GREEN/15 bg-white shadow-sm">
          {/* Hero */}
          <div className="relative h-[340px] sm:h-[380px] flex items-center px-8 sm:px-10" style={HERO_STYLE}>
            <div className="max-w-md">
              <p className="text-[11px] uppercase tracking-[0.18em] text-KC_PEACH font-semibold mb-2 font-parkinsans">Order from anywhere</p>
              <h1 className="text-white font-wildysans text-4xl sm:text-5xl mb-3">Delivery</h1>
              <p className="text-white/80 text-sm sm:text-base mb-6 font-parkinsans leading-relaxed">Can&apos;t make it to us? We&apos;ll come to you — order for delivery straight from us or through your favourite platform.</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/971543354066" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-KC_PEACH px-5 py-3 text-sm font-semibold text-KC_GREEN font-parkinsans transition hover:brightness-105"><FaWhatsapp className="text-lg" /> WhatsApp order</a>
                <a href="tel:044318050" className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 py-3 text-sm text-white font-parkinsans transition hover:bg-white/20"><FaPhone className="text-sm" /> Call 04 431 8050</a>
              </div>
            </div>
          </div>
          {/* Partners */}
          <div className="px-6 sm:px-8 py-7 sm:py-8">
            <div className="flex flex-wrap justify-between items-baseline gap-3 mb-4">
              <p className="text-xs uppercase tracking-[0.1em] text-KC_GREEN/50 font-medium font-parkinsans">Or order through a partner</p>
              <div className="flex gap-2">
                <span className="text-[11px] px-3 py-1 rounded-full bg-EggShell text-KC_GREEN/70 font-parkinsans">Dine-in</span>
                <span className="text-[11px] px-3 py-1 rounded-full bg-EggShell text-KC_GREEN/70 font-parkinsans">Takeaway</span>
                <span className="text-[11px] px-3 py-1 rounded-full bg-KC_PEACH text-KC_GREEN font-semibold font-parkinsans">Delivery</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {PARTNERS.map((p) => (
                <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2.5 py-5 px-2 rounded-xl border border-KC_GREEN/15 transition hover:border-KC_PEACH hover:-translate-y-0.5 hover:shadow-sm">
                  <FaMotorcycle className="text-2xl text-KC_GREEN/70" />
                  <span className="text-sm font-medium text-KC_GREEN font-parkinsans">{p.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
