"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Ingredient {
  emoji: string;
  label: string;
  size: string;       // tailwind w-* class
  top: string;        // tailwind top-* or positioning
  left?: string;
  right?: string;
  speed: number;      // parallax multiplier (higher = more movement)
  rotate: number;     // end rotation in degrees
  opacity: number;    // base opacity
}

const INGREDIENTS: Ingredient[] = [
  { emoji: "🥬", label: "Lettuce",  size: "w-14 h-14 sm:w-20 sm:h-20", top: "top-[5%]",   left: "left-[8%]",   speed: 80,  rotate: -15,  opacity: 0.8  },
  { emoji: "🍅", label: "Tomato",   size: "w-10 h-10 sm:w-14 sm:h-14", top: "top-[18%]",  right: "right-[5%]", speed: 120, rotate: 25,   opacity: 0.6  },
  { emoji: "🧅", label: "Onion",    size: "w-12 h-12 sm:w-16 sm:h-16", top: "top-[45%]",  left: "left-[3%]",   speed: 60,  rotate: 20,   opacity: 0.55 },
  { emoji: "🌶️", label: "Chili",    size: "w-9 h-9 sm:w-12 sm:h-12",   top: "top-[60%]",  right: "right-[50%]", speed: 100, rotate: -30,  opacity: 0.65 },
  { emoji: "🧀", label: "Cheese",   size: "w-11 h-11 sm:w-16 sm:h-16", top: "top-[75%]",  left: "left-[10%]",  speed: 90,  rotate: 15,   opacity: 0.5  },
  { emoji: "🥩", label: "Meat",     size: "w-12 h-12 sm:w-18 sm:h-18", top: "top-[35%]",  right: "right-[70%]", speed: 70,  rotate: -10,  opacity: 0.6  },
  { emoji: "🫓", label: "Bread",    size: "w-10 h-10 sm:w-14 sm:h-14", top: "top-[85%]",  right: "right-[12%]",speed: 110, rotate: 35,   opacity: 0.5  },
  { emoji: "🫒", label: "Olive",    size: "w-8 h-8 sm:w-11 sm:h-11",   top: "top-[10%]",  right: "right-[20%]",speed: 130, rotate: -20,  opacity: 0.45 },
];

const FloatingIngredients: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const ing = INGREDIENTS[i];

        gsap.fromTo(
          el,
          {
            y: 0,
            rotation: 0,
            scale: 0.8,
            opacity: 0,
          },
          {
            y: -ing.speed,
            rotation: ing.rotate,
            scale: 1,
            opacity: ing.opacity,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1.5,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {INGREDIENTS.map((ing, i) => (
        <div
          key={ing.label}
          ref={(el) => { itemRefs.current[i] = el; }}
          className={`absolute ${ing.size} ${ing.top} ${ing.left ?? ""} ${ing.right ?? ""}
            flex items-center justify-center select-none opacity-0`}
        >
          <span className="text-[length:inherit] drop-shadow-md" style={{ fontSize: "inherit" }}>
            <span className="block w-full h-full text-center leading-none"
              style={{ fontSize: "clamp(1.5rem, 3vw, 3.5rem)" }}>
              {ing.emoji}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default FloatingIngredients;
