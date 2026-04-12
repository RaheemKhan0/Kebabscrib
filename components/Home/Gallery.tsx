"use client";
import React, { useState } from "react";
import Image from "next/image";

/* ───────────────────────────────────────────
   Gallery items — mix of images & videos.
   span: "tall" = 2 rows, "wide" = 2 cols, "large" = 2x2, "normal" = 1x1
   ─────────────────────────────────────────── */
type Span = "normal" | "tall" | "wide" | "large";

interface GalleryItem {
  type: "image" | "video";
  src: string;
  alt: string;
  span: Span;
}

const ITEMS: GalleryItem[] = [
  { type: "video",  src: "https://res.cloudinary.com/dpqto9jrm/video/upload/v1775543834/Vibe_Video_j6agrr.mp4",     alt: "KC Vibe",           span: "tall"   },
  { type: "image",  src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775543799/DSC09448_qpjd6k.jpg",       alt: "KC Kitchen",        span: "normal" },
  { type: "image",  src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775543797/DSC09454_biwsck.jpg",       alt: "Fresh ingredients",  span: "normal" },
  { type: "video",  src: "https://res.cloudinary.com/dpqto9jrm/video/upload/v1775543813/gif_pw9li3.mp4",            alt: "KC in action",       span: "normal" },
  { type: "image",  src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775543803/04-1_qx2nrh.jpg",          alt: "Kebab close-up",     span: "wide"   },
  { type: "video",  src: "https://res.cloudinary.com/dpqto9jrm/video/upload/v1775543805/reel_kebab_mrolmr.mp4",     alt: "Kebab reel",         span: "tall"   },
  { type: "image",  src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775543795/DSC09512_rjg0jf.jpg",       alt: "Plating",            span: "normal" },
  { type: "image",  src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775543788/DSC09493_j8agdh.jpg",       alt: "Grill session",      span: "normal" },
  { type: "image",  src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775543785/10-4_oc44xq.jpg",          alt: "KC ambiance",        span: "normal" },
  { type: "image",  src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775543783/02_cmpkxs.jpg",            alt: "Sandwich art",       span: "wide"   },
  { type: "video",  src: "https://res.cloudinary.com/dpqto9jrm/video/upload/v1753617587/BakingBread_yrvcln.mp4",    alt: "Baking bread",       span: "normal" },
  { type: "image",  src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775486282/12_zsd2ub.jpg",            alt: "KC founders",        span: "normal" },
  //{ type: "image",  src: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1775486282/3_ndvgz1.png",             alt: "KC brand",           span: "normal" },
];

const spanClasses: Record<Span, string> = {
  normal: "",
  tall:   "sm:row-span-2",
  wide:   "sm:col-span-2",
  large:  "sm:col-span-2 sm:row-span-2",
};

/* ── Lightbox overlay ── */
const Lightbox = ({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    onClick={onClose}
  >
    <button
      onClick={onClose}
      className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
      aria-label="Close"
    >
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <div
      className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {item.type === "video" ? (
        <video
          src={item.src}
          autoPlay
          controls
          playsInline
          className="w-full max-h-[85vh] object-contain bg-black"
        />
      ) : (
        <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>
      )}
    </div>
  </div>
);

const Gallery = () => {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  return (
    <>
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-KC_GREEN/50 font-medium mb-2">
            Behind the Grill
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-KC_GREEN font-wildysans">
            The KC Gallery
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-KC_GREEN/20" />
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[240px] gap-3 sm:gap-4">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl overflow-hidden shadow-md cursor-pointer
                transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
                ${spanClasses[item.span]}`}
              onClick={() => setLightboxItem(item)}
            >
              {item.type === "video" ? (
                <>
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                      <svg className="w-5 h-5 text-KC_GREEN ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Subtle gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              )}

              {/* Expand icon — bottom right on hover */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-KC_GREEN" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </>
  );
};

export default Gallery;
