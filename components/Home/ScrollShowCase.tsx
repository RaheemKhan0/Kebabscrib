"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollShowcase: React.FC = () => {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!videoRef.current) return;

      const video = videoRef.current;

      // Set initial video time
      video.currentTime = 0;

      // Scroll scrub animation for video progress
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          if (video.duration) {
            video.currentTime = video.duration * self.progress;
          }
        },
        onLeave: () => setShowProducts(true), // trigger product reveal
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="relative h-[200vh] bg-black text-white overflow-hidden"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dpqto9jrm/video/upload/v1753617587/BakingBread_yrvcln.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Fade-in product section after scroll ends */}
      {showProducts && (
        <div className="bg-white text-center py-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-KC_GREEN mb-6">
            Signature Products
          </h2>
          {/* You can replace this with <SignatureProducts /> */}
          <p className="text-gray-700 max-w-xl mx-auto">
            Explore our most loved items crafted with precision and bold
            flavors.
          </p>
        </div>
      )}
    </>
  );
};

export default ScrollShowcase;
