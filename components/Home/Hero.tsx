"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";

/* ───────────────────────────────────────────
   Slides — same items as BestSellers.
   Replace image URLs with high-res landscape
   photos when ready.
   ─────────────────────────────────────────── */
const SLIDES = [
  {
    name: "Merguez",
    tagline: "Bold and Flavorful Lamb Sausage Sandwich",
    image: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1745681351/Merguez_zhoplk.jpg",
  },
  {
    name: "Mix Kebab",
    tagline: "Best of Both Worlds Chicken & Veal",
    image: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1745680051/Mix_Kebab_jgizht.jpg",
  },
  {
    name: "Veal Baguette",
    tagline: "Melt in Your Mouth",
    image: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1745681349/Four_Veal_zhish2.jpg",
  },
  {
    name: "Medium Taco",
    tagline: "The Cheesy Bestseller",
    image: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1745680051/Medium_French_Taco_e1yjcj.jpg",
  },
  {
    name: "Poulet Fromage",
    tagline: "Tasty Quartet of Chicken, Ham, Egg and Cheese",
    image: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1745681352/Poulet_Fromage_zjzobp.jpg",
  },
];

const AUTO_PLAY_MS = 4000;

const autoPlayPlugin: KeenSliderPlugin = (slider) => {
  let timeout: ReturnType<typeof setTimeout>;
  const clear = () => clearTimeout(timeout);
  const schedule = () => {
    timeout = setTimeout(() => slider.next(), AUTO_PLAY_MS);
  };
  slider.on("created", schedule);
  slider.on("dragStarted", clear);
  slider.on("animationEnded", schedule);
  slider.on("updated", schedule);
  slider.on("destroyed", clear);
};

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      defaultAnimation: { duration: 800 },
      slides: { perView: 1 },
      created() {
        setLoaded(true);
      },
    },
    [autoPlayPlugin],
  );

  return (
    <section className="sticky top-0 w-full h-[85vh] sm:h-[90vh] z-0">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider h-full">
        {SLIDES.map((slide, i) => (
          <div key={i} className="keen-slider__slide relative">
            {/* Background image */}
            <Image
              src={slide.image}
              alt={slide.name}
              fill
              priority={i < 2}
              className="object-cover"
              sizes="100vw"
            />

            {/* Gradient overlays — bottom for text, top for navbar */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />

            {/* Text content — bottom left */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16 pb-24 sm:pb-28">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-EggShell/70 font-parkinsans font-medium mb-2">
                {slide.tagline}
              </p>
              <h2
                className="font-bold text-EggShell font-parkinsans leading-none"
                style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
              >
                {slide.name}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {loaded && (
        <>
          <button
            onClick={() => instanceRef.current?.prev()}
            aria-label="Previous slide"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10
              w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-sm
              flex items-center justify-center text-white/80
              transition-all duration-200 hover:bg-white/25 hover:text-white hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            aria-label="Next slide"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10
              w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-sm
              flex items-center justify-center text-white/80
              transition-all duration-200 hover:bg-white/25 hover:text-white hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

    </section>
  );
};

export default Hero;


      // {/* Dots + slide counter */}
      // {loaded && (
      //   <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10
      //     flex items-center gap-4">
      //     {/* Dots */}
      //     <div className="flex gap-2">
      //       {SLIDES.map((_, i) => (
      //         <button
      //           key={i}
      //           onClick={() => instanceRef.current?.moveToIdx(i)}
      //           aria-label={`Go to slide ${i + 1}`}
      //           className={`rounded-full transition-all duration-300
      //             ${currentSlide === i
      //               ? "w-6 h-2 bg-white"
      //               : "w-2 h-2 bg-white/40 hover:bg-white/60"
      //             }`}
      //         />
      //       ))}
      //     </div>

      //     {/* Counter */}
      //     <span className="text-xs text-white/50 font-medium tabular-nums">
      //       {String(currentSlide + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      //     </span>
      //   </div>
      //  )}