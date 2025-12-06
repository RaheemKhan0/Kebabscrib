"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useGsapPlugins } from "@utils/customhooks/useGsapPlugins";
import Link from "next/link";

const Hero = () => {
  useGsapPlugins();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const learnRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const titleSplit = new SplitText(titleRef.current, {
        type: "chars",
      });

      const descSplit = new SplitText(descRef.current, {
        type: "lines",
      });

      gsap.set([titleRef.current, descRef.current], { opacity: 1 });

      const tl = gsap.timeline();

      tl.from(titleSplit.chars, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.04,
      })
        .from(
          descSplit.lines,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
          },
          "<+0.2",
        )
        .fromTo(
          learnRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          "<+0.2",
        )
        .fromTo(
          buttonRef.current,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "<+0.1",
        )
        .to(
          learnRef.current,
          {
            y: 10,
            repeat: -1,
            yoyo: true,
            duration: 1,
            ease: "sine.inOut",
          },
          "<",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-EggShell overflow-hidden h-[100dvh] flex flex-col justify-between"
    >
      {/* CONTENT CENTERED */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20">
        <div className="max-w-[700px] w-full text-center">
          <p className="text-xs sm:text-sm uppercase tracking-widest text-KC_Yellow font-semibold mb-2 rounded-xl">
            Since 2011 • Authentic Taste
          </p>

          <h1
            ref={titleRef}
            className="font-extrabold text-KC_GREEN font-parkinsans mb-3 leading-tight whitespace-nowrap opacity-0"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
            }}
          >
            Kebab&apos;s Crib
          </h1>

          <p
            ref={descRef}
            className="text-gray-700 text-sm sm:text-base md:text-lg mb-6 leading-relaxed mx-auto max-w-lg opacity-0"
          >
            Dive into the juiciest kebabs, meltiest cheese, and the boldest
            flavors—crafted with love and fire, straight from our grill.
          </p>

          <Link
            ref={buttonRef}
            href="/menu"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-KC_Yellow text-KC_GREEN rounded-full text-sm sm:text-base md:text-lg font-semibold shadow-md 
            hover:bg-KC_GREEN hover:text-KC_Yellow transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            View Menu 
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* LEARN MORE SECTION */}
      <div className="text-center text-KebabGreen mb-4">
        <p className="font-parkinsans text-lg tracking-wide">Learn More</p>
        <div className="flex justify-center mt-2 animate-bounce">
          <svg
            ref={learnRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <line x1="12" y1="4" x2="12" y2="20" />
            <polyline points="6 14 12 20 18 14" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
