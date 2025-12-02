"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const banners = [
  {
    src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1751256705/Banner1_xu9h5j.png",
    alt: "Four Veal Banner",
  },
  {
    src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1750918055/Banner2_chvnqx.png",
    alt: "Combo Meal Promo",
  },
  {
    src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1750918805/Banner3_p3yf2j.png",
    alt: "Mozorella Sticks",
  },
];

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      perView: 1,
    },
  });

  useEffect(() => {
    const slider = instanceRef.current;
    if (!slider) return;

    timerRef.current = setInterval(() => {
      slider.next();
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [instanceRef]);

  return (
    <div className="relative w-full px-4 max-w-250px  sm:max-w-screen-sm h-[250px] sm:h-[300px] md:h-[400px]  md:max-w-screen-md mx-auto">
      {/* Slider */}
      <div
        ref={sliderRef}
        className="keen-slider w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] "
      >
        {banners.map((banner, idx) => (
          <div className="keen-slider__slide relative h-full" key={idx}>
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-50 bg-KCGreen text-white p-3 rounded-full hover:bg-green-900 transition"
        aria-label="Previous"
      >
        ←
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-50 bg-KCGreen text-white p-3 rounded-full hover:bg-green-900 transition"
        aria-label="Next"
      >
        →
      </button>

    
    </div>
  );
}
