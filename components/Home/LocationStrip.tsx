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
          <h2
            className="font-bold text-KC_GREEN font-wildysans leading-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            In the Heart of Dubai Marina
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-KC_GREEN/15" />
        </div>

        {/* Map + Info */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* Map — square, no rounded corners */}
          <div className="lg:col-span-3 relative aspect-square lg:aspect-auto lg:h-[450px] overflow-hidden">
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

          {/* Info — centered text, no icons */}
          <div className="lg:col-span-2 flex flex-col gap-8 text-center lg:text-left">

            {/* Address */}
            <div>
              <p className="font-bold font-parkinsans text-KC_GREEN mb-1">
                Address
              </p>
              <p className="text-sm font-parkinsans text-KC_GREEN/70">
                Shop 1, Marina View Tower A
              </p>
              <p className="text-sm font-parkinsans text-KC_GREEN/50">Dubai Marina, Dubai</p>
            </div>

            <div className="h-px bg-KC_GREEN/10" />

            {/* Hours */}
            <div>
              <p className="font-bold font-parkinsans text-KC_GREEN mb-2">
                Hours
              </p>
              <div className="space-y-1.5 text-sm font-parkinsans">
                <div className="flex justify-between max-w-xs mx-auto lg:mx-0">
                  <span className="text-KC_GREEN/60">Sun – Thu</span>
                  <span className="text-KC_GREEN">11:30 AM – 4:30 AM</span>
                </div>
                <div className="flex justify-between max-w-xs mx-auto lg:mx-0">
                  <span className="text-KC_GREEN/60">Fri – Sat</span>
                  <span className="text-KC_GREEN">11:30 AM – 4:45 AM</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-KC_GREEN/10" />

            {/* Contact */}
            <div>
              <p className="font-bold font-parkinsans text-KC_GREEN mb-2">
                Contact
              </p>
              <div className="space-y-2 text-sm font-parkinsans">
                <a href="tel:044318050" className="block text-KC_GREEN/70 hover:text-KC_PEACH transition-colors">
                  04 431 8050
                </a>
                <a href="https://wa.me/971543354066" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-KC_GREEN/70 hover:text-KC_PEACH transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>

            {/* CTA */}
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-KC_PEACH px-8 py-3.5
                text-sm font-semibold uppercase tracking-wide text-KC_GREEN
                transition hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
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
