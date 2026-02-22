import Hero from "@components/Home/Hero"
import StoryCards from "@components/Home/StoryCards"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <div className="bg-EggShell">
      <Hero />
      <StoryCards />
      <section className="mx-auto mt-10 max-w-screen-xl px-4 pb-16 sm:px-6 lg:px-10">
        <div className="rounded-[32px] border border-KC_GREEN/10 bg-white p-6 shadow-lg sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-KebabGreen/70">
              Ready to order
            </p>
            <h2 className="text-3xl font-bold text-KebabGreen sm:text-4xl">
              Explore the full menu and build your perfect meal
            </h2>
            <p className="max-w-2xl text-sm text-gray-600 sm:text-base">
              Categories, rich item details, and a smoother browsing experience
              now live on the menu page.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-KC_GREEN px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-KebabGreenDark"
            >
              Go To Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
