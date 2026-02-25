import DeliveryOptions from "@components/Menu/DeliveryOptions"
import MenuCategories from "@components/Menu/MenuCategories"

export const dynamic = "force-dynamic"

export default function MenuPage() {
  return (
    <div className="bg-EggShell">
      <section className="mx-auto mt-10 max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-10">
        <div className="rounded-[32px] border border-KC_GREEN/10 bg-white p-6 shadow-lg sm:p-10">
          <div className="flex flex-col gap-4 text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-KebabGreen/70">
              Menu Experience
            </p>
            <h1 className="text-3xl font-bold text-KebabGreen sm:text-4xl">
              Browse categories, open item details, and order fast
            </h1>
            <p className="max-w-2xl text-sm text-gray-600 sm:text-base">
              Use the category filter to explore everything we serve.
              Tap any item for photos, descriptions, and ordering options.
            </p>
          </div>
        </div>
      </section>
      <DeliveryOptions />
      <section className="pb-12">
        <MenuCategories />
      </section>
    </div>
  )
}
