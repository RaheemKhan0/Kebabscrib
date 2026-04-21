import Hero from "@components/Home/Hero"
import DualVideo from "@components/Home/DualVideo"
import OurStory from "@components/Home/OurStory"
import GoogleReviews from "@components/Home/GoogleReviews"
import LocationStrip from "@components/Home/LocationStrip"
import CollageStrip from "@components/Home/CollageStrip"

export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <div className="bg-textured-kcgreen">

      {/* 1 — Hero + Slider (sticky, stays in place) */}
      <Hero />

      {/* Spacer — keeps hero fully visible until user scrolls */}
      <div className="h-[85vh] sm:h-[90vh]" />

      {/* Everything below scrolls over the hero */}
      <div className="relative z-10">

      {/* 2 — Dual Video Strip */}
      <DualVideo />

      {/* 3 — Our Story (full bleed) */}
      <OurStory />

      {/* 4 — Google Reviews + Location + Collage (shared eggshell background) */}
      <div className="bg-textured-eggshell">
        <div className="py-16 md:py-24">
          <GoogleReviews />
        </div>
        <div className="py-16 sm:py-24">
          <LocationStrip />
        </div>
        <CollageStrip />
      </div>

      </div>{/* end relative z-10 wrapper */}
    </div>
  )
}
