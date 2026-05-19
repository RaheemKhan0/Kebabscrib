"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Panel {
  year: string;
  title: string;
  body: string;
  image: string;
}

const PANELS: Panel[] = [
  {
    year: "2011",
    title: "Two Lovers, One Obsession",
    body: "It started across Europe — night after night, kebab after kebab. What began as a shared favourite quietly became something much deeper.",
    image:
      "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775486282/12_zsd2ub.jpg",
  },
  {
    year: "2018",
    title: "Leaving the Corporate Grind",
    body: "Born and raised in the UAE, we stepped away from our corporate careers to chase a dream — building something with purpose, driven by the flavours we grew up craving.",
    image:
      "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775543799/DSC09448_qpjd6k.jpg",
  },
  {
    year: "2024",
    title: "The Grill Fires Up",
    body: "Years of recipe testing, ingredient sourcing, and late-night conversations. Every detail — from the bread to the sauces — was obsessed over until it was just right.",
    image:
      "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775543803/04-1_qx2nrh.jpg",
  },
  {
    year: "2026",
    title: "Kebabs Crib Opens",
    body: "A celebration of bold, French-Lebanese street food in Dubai Marina. Kebab sandwiches, baguettes, and French tacos — crafted to make every customer feel fantastique.",
    image:
      "https://res.cloudinary.com/dpqto9jrm/image/upload/v1776668487/Cover_Photo_g0cch4.jpg",
  },
];

const OurStoryHorizontal = () => {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current || !pinWrapperRef.current) return;

      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (!isDesktop) return; // mobile uses native vertical scroll

      const getDistance = () => {
        if (!trackRef.current) return 0;
        return trackRef.current.scrollWidth - window.innerWidth;
      };

      gsap.to(trackRef.current, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, pinWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-textured-kcgreen overflow-hidden">

      {/* Section header — scrolls normally, NOT pinned */}
      <div className="text-center pt-20 sm:pt-28 pb-12 px-6">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-KC_PEACH font-medium mb-4">
          Our Story
        </p>
        <h2
          className="font-bold text-EggShell font-wildysans leading-tight"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
        >
          Our Beginnings
        </h2>
        <div className="mx-auto mt-5 h-px w-16 bg-KC_PEACH/40" />
        <p className="hidden md:block mt-6 text-xs uppercase tracking-[0.3em] text-EggShell/40">
          Scroll to read →
        </p>
      </div>

      {/* Pin wrapper — this is what gets pinned. Height = viewport height on desktop */}
      <div
        ref={pinWrapperRef}
        className="relative w-full md:h-screen md:overflow-hidden"
      >
        {/* Horizontal track — translated on scroll (desktop only) */}
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row md:flex-nowrap w-full md:w-max md:h-full"
        >
          {PANELS.map((panel, i) => (
            <div
              key={i}
              className="flex-none w-full md:w-screen md:h-full
                px-6 sm:px-10 md:px-16 lg:px-24 py-12 md:py-0
                grid md:grid-cols-2 items-center gap-10 md:gap-16"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-[4/5] overflow-hidden order-1 md:order-none">
                <Image
                  src={panel.image}
                  alt={panel.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 45vw"
                />
                {/* Year stamp */}
                <div className="absolute top-4 left-4 bg-KC_PEACH text-KC_GREEN
                  px-4 py-1.5 font-wildysans text-lg tracking-wide shadow-md">
                  {panel.year}
                </div>
              </div>

              {/* Text */}
              <div className="order-2 md:order-none">
                <p className="text-[11px] uppercase tracking-[0.3em] text-KC_PEACH font-medium mb-3">
                  Chapter {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="font-bold text-EggShell font-wildysans mb-6 leading-[1.1]"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                >
                  {panel.title}
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-EggShell/70 font-parkinsans">
                  {panel.body}
                </p>

                {/* Progress indicator */}
                <div className="mt-10 flex items-center gap-2">
                  {PANELS.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-[2px] transition-all duration-300
                        ${idx === i ? "w-8 bg-KC_PEACH" : "w-4 bg-EggShell/20"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStoryHorizontal;
