import Link from "next/link";

const ContactStrip = () => {
  return (
    <section className="w-full bg-textured-kcgreen border-t border-EggShell/5">
      <div className="mx-auto max-w-screen-md px-6 sm:px-10 py-24 sm:py-32 text-center">

        {/* Heading */}
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-KC_PEACH font-medium mb-4">
          Get In Touch
        </p>
        <h2
          className="font-bold text-EggShell font-wildysans leading-tight mb-6"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          We&apos;d Love to Hear From You
        </h2>
        <p className="text-base sm:text-lg text-EggShell/50 leading-relaxed mb-10 max-w-lg mx-auto">
          Questions, feedback, or just want to say hello — reach out and
          we&apos;ll get back to you.
        </p>

        {/* Contact details — horizontal on desktop, stacked on mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-10">
          <a href="tel:044318050" className="text-EggShell/70 hover:text-KC_PEACH transition-colors text-sm">
            04 431 8050
          </a>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-EggShell/20" />
          <a href="https://wa.me/971543354066" target="_blank" rel="noopener noreferrer"
            className="text-EggShell/70 hover:text-KC_PEACH transition-colors text-sm">
            WhatsApp
          </a>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-EggShell/20" />
          <span className="text-EggShell/70 text-sm">
            kebabscrib@gmail.com
          </span>
        </div>

        {/* CTA */}
        <Link
          href="/contactus"
          className="inline-flex items-center gap-2 rounded-full border border-EggShell/20 px-8 py-3.5
            text-sm font-medium uppercase tracking-wide text-EggShell
            transition-all duration-300 hover:bg-EggShell hover:text-KC_GREEN hover:scale-[1.02] active:scale-[0.98]"
        >
          Send Us a Message
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

      </div>
    </section>
  );
};

export default ContactStrip;
