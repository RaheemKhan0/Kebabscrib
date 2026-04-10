import Hero from "@components/Home/Hero"
import DualVideo from "@components/Home/DualVideo"
import ContactStrip from "@components/Home/ContactStrip"
import StoryCards from "@components/Home/StoryCards"
import { BestSellers } from "@components/Home/BestSellers"
import OurStory from "@components/Home/OurStory"
import GoogleReviews from "@components/Home/GoogleReviews"
import Gallery from "@components/Home/Gallery"
import { DisplayMenu } from "@components/Menu/DisplayMenu"
import Link from "next/link"

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

      {/* 3 — Our Story (full bleed, transitions into maroon) */}
      <OurStory />

      {/* 4 — Gallery */}
      {/* <div className="bg-textured-kcgreen py-16 md:py-24">
        <Gallery />
      </div> */}

      {/* 5 — Google Reviews */}
      <div className="bg-textured-eggshell py-16 md:py-24">
        <GoogleReviews />
      </div>

      {/* 6 — Contact (final section before footer) */}
      <ContactStrip />
      </div>{/* end relative z-10 wrapper */}
    </div>
  )
}
