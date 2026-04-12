"use client";
import React, { useEffect } from "react";
import Image from "next/image";

interface MenuItem {
  _id: string;
  item_name: string;
  item_description?: string;
  item_price: { single?: number; meal?: number };
  item_category: string;
  item_img_url?: string;
}

const DELIVERY_PLATFORMS = [
  { name: "Talabat",    href: "https://www.talabat.com/uae/restaurant/612274/kebabs-crib?aid=1272" },
  { name: "Careem",     href: "https://url.careem.com/uMo8iNUqyKMLA" },
  { name: "Deliveroo",  href: "https://deliveroo.ae/menu/dubai/marina/kebabs-crib?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share" },
  { name: "Noon",       href: "https://food.noon.com/uae-en/outlet/KBBSCR2LUQ/" },
  { name: "Keeta",      href: "https://url-eu.mykeeta.com/JzHpPofz" },
];

const optimizeUrl = (url: string) =>
  url.replace("/upload/", "/upload/w_1000,q_auto,f_auto/");

const MenuShowcaseModal = ({
  item,
  onClose,
}: {
  item: MenuItem;
  onClose: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-KC_Forest
          grid grid-cols-1 lg:grid-cols-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center
            text-white/70 hover:text-white hover:bg-black/50 transition-all duration-200"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image — left 3/5 on desktop, full width on mobile */}
        <div className="relative lg:col-span-3 aspect-[4/3] lg:aspect-auto lg:min-h-[400px]">
          {item.item_img_url ? (
            <Image
              src={optimizeUrl(item.item_img_url)}
              alt={item.item_name}
              fill
              className="object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-KC_GREEN rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
              <span className="text-EggShell/15 text-8xl font-wildysans">KC</span>
            </div>
          )}
        </div>

        {/* Info — right 2/5 on desktop */}
        <div className="lg:col-span-2 flex flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-EggShell/40 mb-2">
              {item.item_category}
            </p>
            <h2 className="font-wildysans text-2xl sm:text-3xl text-EggShell mb-3">
              {item.item_name}
            </h2>

            {item.item_description && (
              <p className="text-sm leading-relaxed text-EggShell/60 mb-5">
                {item.item_description}
              </p>
            )}

            {/* Prices */}
            <div className="flex gap-4 mb-6">
              {item.item_price.single != null && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-EggShell/35 mb-0.5">Single</p>
                  <p className="text-xl font-semibold text-KC_PEACH">
                    AED {item.item_price.single.toFixed(2)}
                  </p>
                </div>
              )}
              {item.item_price.meal != null && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-EggShell/35 mb-0.5">Meal</p>
                  <p className="text-xl font-semibold text-KC_PEACH">
                    AED {item.item_price.meal.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Delivery CTAs */}
          <div>
            <a
              href={DELIVERY_PLATFORMS[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full rounded-full bg-KC_PEACH px-6 py-3 text-sm
                font-semibold uppercase tracking-wide text-KC_GREEN shadow-md
                transition hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
            >
              Order on Talabat
            </a>

            <div className="mt-3 flex flex-wrap justify-center gap-3">
              {DELIVERY_PLATFORMS.slice(1).map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-EggShell/40 hover:text-KC_PEACH transition-colors duration-200"
                >
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuShowcaseModal;
