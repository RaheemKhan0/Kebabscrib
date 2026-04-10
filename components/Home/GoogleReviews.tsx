"use client";
import React, { useState, useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Review {
  name: string;
  initial: string;
  avatarBg: string;
  stars: number;
  text: string;
  timeAgo: string;
}

const REVIEWS: Review[] = [
  {
    name: "Rabie Rizwan",
    initial: "R",
    avatarBg: "bg-KC_PEACH",
    stars: 5,
    text: "One of the Best French Tacos I have ever had!!! I ordered the large taco with chicken doner and ground beef and it was amazing. The bread was freshly made in the house.",
    timeAgo: "3 months ago",
  },
  {
    name: "Laze Trajkov",
    initial: "L",
    avatarBg: "bg-KC_Ochre",
    stars: 5,
    text: "The customer service at this store is excellent. The staff is always friendly and helpful. They make sure that every customer feels valued and taken care of.",
    timeAgo: "3 months ago",
  },
  {
    name: "Teo Zdravkovski",
    initial: "T",
    avatarBg: "bg-KC_PEACH",
    stars: 5,
    text: "The customer service at this store is truly exceptional, marked by several distinctive aspects. The staff members consistently demonstrate genuine warmth.",
    timeAgo: "2 months ago",
  },
  {
    name: "Teodora Delovska",
    initial: "T",
    avatarBg: "bg-KC_Ochre",
    stars: 5,
    text: "I recently purchased a fabulous kebab from this amazing store, and let me tell you, it has been a total game-changer. Absolutely phenomenal quality!",
    timeAgo: "1 month ago",
  },
  {
    name: "Aleksandar Angelov",
    initial: "A",
    avatarBg: "bg-KC_PEACH",
    stars: 5,
    text: "The quality of the food never fails to impress me. They are not only delicious and well-prepared, but they consistently deliver amazing flavors every time.",
    timeAgo: "4 months ago",
  },
  {
    name: "Filip Koteski",
    initial: "F",
    avatarBg: "bg-KC_Ochre",
    stars: 5,
    text: "These kebabs combine a vibrant, eye-catching presentation with utmost comfort and an unbeatable taste. The perfect meal for any occasion.",
    timeAgo: "2 months ago",
  },
  {
    name: "Jessica Smith",
    initial: "J",
    avatarBg: "bg-KC_PEACH",
    stars: 5,
    text: "Just got my new order and have to say I'm impressed with the quality. The delivery was really fast, it only took 2 days. Highly recommended!",
    timeAgo: "3 weeks ago",
  },
  {
    name: "Bratislav Petrovski",
    initial: "B",
    avatarBg: "bg-KC_Ochre",
    stars: 5,
    text: "This store is my favorite place to order from. The quality of the food is excellent and the prices are reasonable. I always come back for more.",
    timeAgo: "5 months ago",
  },
  {
    name: "Toni Toshic",
    initial: "T",
    avatarBg: "bg-KC_PEACH",
    stars: 5,
    text: "I recently made my first purchase from Kebabs Crib and I am beyond impressed! The selection of flavours is incredible and the quality is top notch.",
    timeAgo: "1 month ago",
  },
];

const OVERALL_RATING = 5.0;
const TOTAL_REVIEWS = REVIEWS.length;

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-3.5 h-3.5 ${i < count ? "text-KC_Yellow" : "text-KC_GREEN/15"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

/* ── Review card — light theme ── */
const ReviewCard = ({ review }: { review: Review }) => (
  <div className="flex flex-col h-full rounded-xl border border-KC_GREEN/10 bg-white/60 p-6
    transition-all duration-300 hover:bg-white/80 hover:border-KC_GREEN/15 hover:shadow-sm">
    {/* Avatar + Name + Stars */}
    <div className="flex items-start gap-3 mb-4">
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-full ${review.avatarBg}
          flex items-center justify-center text-KC_GREEN font-bold text-xs`}
      >
        {review.initial}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-KC_GREEN truncate">
            {review.name}
          </p>
          <GoogleIcon />
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <Stars count={review.stars} />
          <span className="text-[11px] text-KC_GREEN/35">{review.timeAgo}</span>
        </div>
      </div>
    </div>

    {/* Review text */}
    <p className="text-sm leading-relaxed text-KC_GREEN/65 flex-1">
      &ldquo;{review.text}&rdquo;
    </p>

    {/* Google attribution */}
    <div className="mt-4 pt-3 border-t border-KC_GREEN/8 flex items-center gap-1.5">
      <GoogleIcon />
      <span className="text-[10px] text-KC_GREEN/30 uppercase tracking-wider">Google Review</span>
    </div>
  </div>
);

/* ── Mobile carousel ── */
const MobileCarousel = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    drag: true,
    mode: "free-snap",
    defaultAnimation: { duration: 600 },
    slides: { perView: 1.1, spacing: 12 },
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {REVIEWS.map((review, i) => (
        <div key={i} className="keen-slider__slide">
          <ReviewCard review={review} />
        </div>
      ))}
    </div>
  );
};

const GoogleReviews = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header — fade up */
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
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

      /* Cards — staggered fade up */
      if (gridRef.current && !isMobile) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16">
      {/* Header */}
      <div ref={headerRef} className="text-center mb-12 md:mb-16">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-KC_GREEN/40 font-medium mb-4">
          Straight From Google
        </p>
        <h2
          className="font-bold text-KC_GREEN font-wildysans leading-tight"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
        >
          What Our Customers Say
        </h2>
        <div className="mx-auto mt-4 h-px w-16 bg-KC_GREEN/15" />

        {/* Overall rating */}
        {/* <div className="mt-6 flex items-center justify-center gap-3">
          <Stars count={Math.round(OVERALL_RATING)} />
          <span className="text-sm font-medium text-EggShell/80">
            {OVERALL_RATING.toFixed(1)}/5
          </span>
          <span className="text-sm text-EggShell/35">
            · {TOTAL_REVIEWS} reviews
          </span>
        </div> */}
      </div>

      {/* Desktop: grid — Mobile: carousel */}
      {isMobile ? (
        <MobileCarousel />
      ) : (
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      )}

      {/* View all on Google link */}
      <div className="mt-10 text-center">
        <a
          href="https://www.google.com/search?q=kebabscrib+reviews&oq=kebabscrib+reviews&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDYyNDFqMGo3qAIIsAIB&sourceid=chrome&ie=UTF-8#lrd=0x3e5f6b6fe03d5bdd:0x9437455415f3a2c0,1,,,,"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-KC_GREEN/50
            hover:text-KC_GREEN transition-colors duration-200"
        >
          <GoogleIcon />
          View all reviews on Google
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default GoogleReviews;
