import { Metadata } from "next";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

export const metadata: Metadata = {
  title: "Directions | Kebab's Crib",
  description:
    "Find Kebab's Crib at Dubai Marina. Dine-in and takeaway available.",
};

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.6!2d55.13!3d25.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA0JzQ4LjAiTiA1NcKwMDcnNDguMCJF!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae";

const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/dir//Shop+1,+Marina+View+Tower+A,+Dubai+Marina,+Dubai";

export default function DirectionsPage() {
  return (
    <div className="bg-textured-eggshell min-h-screen">

      {/* ── Hero ── */}
      <div className="pt-32 sm:pt-40 pb-12 text-center px-6">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-KC_GREEN/40 font-medium mb-4">
          Come Visit Us
        </p>
        <h1
          className="font-bold text-KC_GREEN font-wildysans"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          Find Us
        </h1>
        <div className="mx-auto mt-5 h-px w-20 bg-KC_GREEN/15" />
        <p className="mt-6 text-base sm:text-lg text-KC_GREEN/45 max-w-md mx-auto leading-relaxed">
          Dubai Marina, right by the water.
        </p>
      </div>

      {/* ── Map + Info (two column) ── */}
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16 pb-20">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* Map — takes 3/5 */}
          <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:h-[520px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kebab's Crib location"
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Info — takes 2/5 */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Address */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <IoLocationSharp className="w-4 h-4 text-KC_PEACH" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-KC_GREEN/40 font-medium">Address</p>
              </div>
              <p className="text-lg font-wildysans text-KC_GREEN leading-tight">
                Shop 1, Marina View Tower A
              </p>
              <p className="text-sm text-KC_GREEN/55 mt-1">
                Dubai Marina, Dubai
              </p>
            </div>

            <div className="h-px bg-KC_GREEN/10" />

            {/* Hours */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MdAccessTime className="w-4 h-4 text-KC_PEACH" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-KC_GREEN/40 font-medium">Hours</p>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-KC_GREEN/55">Sun – Thu</span>
                  <span className="text-KC_GREEN">11:30 AM – 4:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-KC_GREEN/55">Fri – Sat</span>
                  <span className="text-KC_GREEN">11:30 AM – 4:45 AM</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-KC_GREEN/10" />

            {/* Contact */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <IoMdCall className="w-4 h-4 text-KC_PEACH" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-KC_GREEN/40 font-medium">Contact</p>
              </div>
              <div className="space-y-2 text-sm">
                <a href="tel:044318050" className="block text-KC_GREEN hover:text-KC_PEACH transition-colors">
                  04 431 8050
                </a>
                <a href="https://wa.me/971543354066" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-KC_GREEN hover:text-KC_PEACH transition-colors">
                  <FaWhatsapp className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* CTA */}
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-KC_GREEN px-7 py-3.5
                text-sm font-semibold uppercase tracking-wide text-EggShell
                transition hover:bg-KC_Forest hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Directions
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className="border-t border-KC_GREEN/10 py-10">
        <div className="flex items-center justify-center gap-8 sm:gap-12">
          {["Dine-in", "Takeaway", "Delivery"].map((tag, i) => (
            <span key={tag} className="flex items-center gap-2">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-KC_GREEN/15 -ml-5 sm:-ml-7 mr-3 sm:mr-5" />}
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-KC_GREEN/40 font-medium">
                {tag}
              </span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
