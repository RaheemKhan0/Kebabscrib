"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STORY_IMAGE =
  "https://res.cloudinary.com/dpqto9jrm/image/upload/c_crop,g_north_west,h_589,w_674,x_6,y_5/mujtaba_rasba_v1tc0k.jpg";

const OurStoryPolaroid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Polaroid — rotate in from a slight tilt */
      if (polaroidRef.current) {
        gsap.fromTo(
          polaroidRef.current,
          { opacity: 0, rotate: -15, y: 60 },
          {
            opacity: 1,
            rotate: -4,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      /* Stamp — small wobble in */
      if (stampRef.current) {
        gsap.fromTo(
          stampRef.current,
          { opacity: 0, scale: 0.6, rotate: 20 },
          {
            opacity: 1,
            scale: 1,
            rotate: 8,
            duration: 0.7,
            delay: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      /* Text — children stagger fade up */
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-textured-kcgreen overflow-hidden">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16 py-20 lg:py-28
        grid lg:grid-cols-2 items-center gap-16 lg:gap-20">

        {/* ── Polaroid Side ── */}
        <div className="flex justify-center lg:justify-start relative">

          {/* Polaroid */}
          <div
            ref={polaroidRef}
            className="polaroid-frame w-full max-w-[380px] relative"
            style={{ transform: "rotate(-4deg)" }}
          >
            {/* Masking tape at top */}
            <div className="tape" />

            {/* Photo */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={STORY_IMAGE}
                alt="The Kebab's Crib founders"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 380px"
              />
            </div>

            {/* Handwritten-style caption */}
            <div className="mt-4 text-center">
              <p className="font-wildysans text-lg text-gray-800 leading-tight">
                Sheerin &amp; Mujtaba
              </p>
              <p className="text-[11px] text-gray-500 tracking-wide mt-1">
                Kebabs Crib · 2026
              </p>
            </div>
          </div>

          {/* "Since 2011" stamp — floats next to polaroid */}
          <div
            ref={stampRef}
            className="absolute top-4 -right-2 lg:top-8 lg:-right-6 z-10
              rounded-full bg-KC_PEACH text-KC_GREEN
              w-24 h-24 lg:w-28 lg:h-28
              flex flex-col items-center justify-center
              shadow-lg ring-4 ring-KC_PEACH/30"
            style={{ transform: "rotate(8deg)" }}
          >
            <span className="text-[9px] uppercase tracking-[0.2em] opacity-70">Est.</span>
            <span className="font-wildysans text-2xl lg:text-3xl leading-none">2020</span>
            <span className="text-[9px] uppercase tracking-[0.2em] opacity-70 mt-0.5">Dubai</span>
          </div>
        </div>

        {/* ── Text Side ── */}
        <div ref={textRef} className="flex flex-col justify-center">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-KC_PEACH font-medium mb-4">
            Our Story
          </p>
          <h2
            className="font-bold text-EggShell font-wildysans mb-8 leading-[1.1]"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
          >
            Our Beginnings
          </h2>

          <div className="space-y-5">
            <p className="text-base sm:text-lg leading-relaxed text-EggShell/75 font-parkinsans">
              Two lovers spent years across Europe obsessing over the perfect kebab —
              what began as a shared favourite soon became something much deeper.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-EggShell/75 font-parkinsans">
              Born and raised in the UAE, we left our corporate careers behind
              to build something with purpose, driven by a love for the flavours
              we grew up craving.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-EggShell/75 font-parkinsans">
              Kebab sandwiches, baguettes, and French tacos — crafted to make
              every customer feel fantastique.
            </p>
          </div>

          {/* Signature-style sign off */}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-10 bg-KC_PEACH/40" />
            <p className="font-wildysans text-xl text-KC_PEACH">— The Founders</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurStoryPolaroid;
