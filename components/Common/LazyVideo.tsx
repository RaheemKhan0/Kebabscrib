"use client";
import { useEffect, useRef, useState } from "react";
import { optimizeVideo, videoPoster } from "@utils/cloudinary";

interface LazyVideoProps {
  src: string;
  className?: string;
  width?: number;
  rootMargin?: string;
}

/**
 * A <video> that only starts loading when it's about to enter the viewport.
 * Uses Cloudinary optimization (q_auto, f_auto, vc_auto, w_<width>) and
 * automatically sets a poster from the first second of the video.
 *
 * Stays muted/looping/autoplaying once it does load.
 */
const LazyVideo = ({
  src,
  className = "",
  width = 1000,
  rootMargin = "200px",
}: LazyVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    if (shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldLoad, rootMargin]);

  const optimized = optimizeVideo(src, width);
  const poster = videoPoster(src, Math.min(width, 800));

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {shouldLoad && (
        <video
          ref={videoRef}
          src={optimized}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default LazyVideo;
