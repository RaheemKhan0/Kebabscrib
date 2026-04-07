import Hero from "@components/Home/Hero"
import StoryCards from "@components/Home/StoryCards"
import { BestSellers } from "@components/Home/BestSellers"
import { DisplayMenu } from "@components/Menu/DisplayMenu"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <div className="bg-textured-eggshell">

      {/* 1 — Hero + Slider */}
      <Hero />

      {/* Divider */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-10">
        <hr className="border-KC_GREEN/10" />
      </div>

      {/* 2 — Story Cards */}
      {/* <div className="py-14 md:py-20">
        <StoryCards />
      </div> */}

      {/* Divider */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-10">
        <hr className="border-KC_GREEN/10" />
      </div>

      {/* 3 — Best Sellers */}
      <div className="py-14 md:py-20">
        <BestSellers />
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-10">
        <hr className="border-KC_GREEN/10" />
      </div>

      {/* 5 — Menu Showcase */}
      <div className="py-14 md:py-20">
        <DisplayMenu />
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-10">
        <hr className="border-KC_GREEN/10" />
      </div>

      {/* 6 — CTA */}
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-10 py-14 md:py-20">
        <div className="rounded-[32px] border border-KC_GREEN/10 bg-white/80 p-8 shadow-lg sm:p-12 backdrop-blur">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-KC_GREEN/50">
              Ready to order
            </p>
            <h2 className="text-3xl font-bold text-KC_GREEN sm:text-4xl">
              Explore the full menu and build your perfect meal
            </h2>
            <p className="max-w-2xl text-sm text-KC_GREEN/60 sm:text-base">
              Categories, rich item details, and a smoother browsing experience
              now live on the menu page.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-KC_GREEN px-7 py-3 text-sm
                font-semibold uppercase tracking-wide text-EggShell shadow-md
                transition hover:bg-KC_Forest hover:scale-105 active:scale-95"
            >
              Go To Menu
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
