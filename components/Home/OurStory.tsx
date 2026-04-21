"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STORY_IMAGE =
  "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775528143/mujtaba_rasba_v1tc0k.jpg";

const OurStory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Text side — fade in + slide from left */
      if (textRef.current) {
        const children = textRef.current.children;
        gsap.fromTo(
          children,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      /* Image side — fade in + scale up */
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.00 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      /* Divider line — draw in */
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { width: 0 },
          {
            width: "4rem",
            duration: 0.8,
            delay: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-textured-kcgreen">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16 py-16 lg:py-24 grid lg:grid-cols-2 items-center gap-10 lg:gap-16">

        {/* ── Text Side ── */}
        <div ref={textRef} className="flex flex-col justify-center">
          {/* <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-KC_PEACH font-medium mb-4">
            How It All Began
          </p> */}
          <h2
            className="font-bold text-EggShell text-KC_PEACH font-wildysans mb-8 leading-[1.1]"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
          >
            Our Beginnings
          </h2>

          <div className="space-y-6">
            <p className="text-base sm:text-lg leading-relaxed text-EggShell/70">
              Two lovers spent years across Europe obsessing over the perfect kebab
              after every night out — what began as a shared favourite soon became
              something much deeper. Fifteen years later, that obsession became
              Kebabs Crib.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-EggShell/70">
              Born and raised in the UAE, we left our corporate careers
              behind to build something with purpose, driven by a love for the
              flavours we grew up craving and the meals we never forgot.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-EggShell/70">
              With a focus on what we do best, we keep it simple: kebab sandwiches,
              baguettes, and French tacos — crafted to make every customer
              feel fantastique.
            </p>
          </div>

          <div ref={lineRef} className="mt-8 h-[2px] bg-KC_PEACH/50" style={{ width: 0 }} />
        </div>

        {/* ── Image Side ── */}
        <div ref={imageRef} className="relative overflow-hidden">
          <Image
            src={STORY_IMAGE}
            alt="The Kebab's Crib founders"
            width={800}
            height={800}
            className="w-full h-auto object-cover "
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

      </div>
    </section>
  );
};

export default OurStory;
