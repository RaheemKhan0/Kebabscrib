"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";

const SLIDES = [
  { url: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775486282/3_ndvgz1.png",    alt: "Kebab's Crib – slide 1" },
  { url: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775486282/12_zsd2ub.jpg",   alt: "Kebab's Crib – slide 2" },
  { url: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775486282/01_z6vicd.jpg",   alt: "Kebab's Crib – slide 3" },
  { url: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775486281/07-3_her7h1.jpg", alt: "Kebab's Crib – slide 4" },
  { url: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775486282/2_nltwku.png",    alt: "Kebab's Crib – slide 5" },
  { url: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775486282/1_bu01ai.png",    alt: "Kebab's Crib – slide 6" },
  { url: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775486281/12-1_ss8w0e.jpg", alt: "Kebab's Crib – slide 7" },
  { url: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775486280/07-2_bgnhec.jpg", alt: "Kebab's Crib – slide 8" },
  { url: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775486280/07-1_roky4s.jpg", alt: "Kebab's Crib – slide 9" },
];

const AUTO_PLAY_MS = 3500;

const autoPlayPlugin: KeenSliderPlugin = (slider) => {
  let timeout: ReturnType<typeof setTimeout>;
  const clear = () => clearTimeout(timeout);
  const schedule = () => { timeout = setTimeout(() => slider.next(), AUTO_PLAY_MS); };
  slider.on("created", schedule);
  slider.on("dragStarted", clear);
  slider.on("animationEnded", schedule);
  slider.on("updated", schedule);
  slider.on("destroyed", clear);
}; 

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      drag: true,
      mode: "free-snap",
      defaultAnimation: { duration: 700 },
      slides: { perView: 3.2, spacing: 12 },
      breakpoints: {
        "(max-width: 640px)": {
          slides: { perView: 1.2, spacing: 10 },
        },
        "(min-width: 641px) and (max-width: 1024px)": {
          slides: { perView: 2.2, spacing: 12 },
        },
      },
      slideChanged(s) { setCurrentSlide(s.track.details.rel); },
      created() { setLoaded(true); },
    },
    [autoPlayPlugin],
  );

  return (
    /* No background here — page.tsx owns the bg */
    <section className="w-full pt-16 md:pt-20">

      {/* ── BRAND COPY ── */}
      <div className="flex flex-col items-center text-center px-6 pt-10 pb-8 md:pt-14 md:pb-10">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-KC_GREEN/50 font-medium mb-2">
          Since 2011 · Authentic Taste
        </p>
        <h1
          className="font-extrabold text-KC_GREEN font-parkinsans mb-3 leading-tight"
          style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
        >
          Kebab&apos;s Crib
        </h1>
        <p className="text-KC_GREEN/60 text-sm sm:text-base mb-7 leading-relaxed max-w-md">
          Juicy kebabs, melted cheese, bold flavors — crafted with love and
          fire, straight from our grill.
        </p>
        {/* <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-7 py-3 bg-KC_GREEN text-EggShell rounded-full
            text-sm font-semibold tracking-wide shadow-md
            hover:bg-KC_Forest transition duration-300 hover:scale-105 active:scale-95"
        >
          View Menu
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link> */}
      </div>

      {/* ── SLIDER STRIP ── */}
      <div className="relative pb-8 overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 sm:w-16 z-10 bg-gradient-to-r from-EggShell to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-16 z-10 bg-gradient-to-l from-EggShell to-transparent" />

        <div ref={sliderRef} className="keen-slider px-3 sm:px-4">
          {SLIDES.map((slide, i) => (
            <div key={i} className="keen-slider__slide">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md
                transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]">
                <Image
                  src={slide.url}
                  alt={slide.alt}
                  fill
                  priority={i < 3}
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 84vw, (max-width: 1024px) 48vw, 32vw"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        {loaded && (
          <div className="flex justify-center gap-1.5 mt-5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => instanceRef.current?.moveToIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300
                  ${currentSlide === i
                    ? "w-5 h-1.5 bg-KC_GREEN"
                    : "w-1.5 h-1.5 bg-KC_GREEN/25 hover:bg-KC_GREEN/50"
                  }`}
              />
            ))}
          </div>
        )}
      </div>

    </section>
  );
};

export default Hero;
