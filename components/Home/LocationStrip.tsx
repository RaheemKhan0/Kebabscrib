import { IoLocationSharp } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.6!2d55.13!3d25.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA0JzQ4LjAiTiA1NcKwMDcnNDguMCJF!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae";

const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/dir//Shop+1,+Marina+View+Tower+A,+Dubai+Marina,+Dubai";

const LocationStrip = () => {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="text-center mb-12">
          {/* <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-KC_PEACH font-medium mb-4">
            Come Visit Us
          </p> */}
          <h2
            className="font-bold text-EggShell text-KC_GREEN font-wildysans leading-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Come Visit Us
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-EggShell/15" />
        </div>

        {/* Map + Info */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* Map */}
          <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:h-[450px]  overflow-hidden">
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

          {/* Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Address */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <IoLocationSharp className="w-4 h-4 text-KC_GREEN" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-KebabGreen/35 font-medium">Address</p>
              </div>
              <p className="text-lg font-Parkinsans text-KebabGreen leading-tight">
                Shop 1, Marina View Tower A
              </p>
              <p className="text-sm text-KebabGreen/50 mt-1">Dubai Marina, Dubai</p>
            </div>

            <div className="h-px bg-KebabGreen/50" />

            {/* Hours */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MdAccessTime className="w-4 h-4 text-KC_PEACH" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-KebabGreen/35 font-medium">Hours</p>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between max-w-xs">
                  <span className="text-KebabGreen">Sun – Thu</span>
                  <span className="text-KebabGreen">11:30 AM – 4:30 AM</span>
                </div>
                <div className="flex justify-between max-w-xs">
                  <span className="text-KebabGreen">Fri – Sat</span>
                  <span className="text-KebabGreen">11:30 AM – 4:45 AM</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-KebabGreen/50" />

            {/* Contact */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <IoMdCall className="w-4 h-4 text-KC_PEACH" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-KebabGreen/35 font-medium">Contact</p>
              </div>
              <div className="space-y-2 text-sm">
                <a href="tel:044318050" className="block text-KebabGreen hover:text-KC_PE hover:text-KC_PEACH transition-colors">
                  04 431 8050
                </a>
                <a href="https://wa.me/971543354066" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-KebabGreen hover:text-KC_PEACH transition-colors">
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
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-KebabGreen/20 px-7 py-3
                text-sm font-medium uppercase tracking-wide text-KebabGreen
                transition-all duration-300 hover:bg-KebabGreen hover:text-KC_PEACH hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Directions
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LocationStrip;
