"use client"

const orderProviders = [
  {
    name: "Talabat",
    href: "https://www.talabat.com/uae/restaurant/612274/kebabs-crib?aid=1272",
    className: "bg-[#ff5a00] hover:bg-[#ff7a2a] focus-visible:ring-[#ff5a00]",
  },
  {
    name: "Careem",
    href: "https://url.careem.com/uMo8iNUqyKMLA",
    className: "bg-[#00c853] hover:bg-[#33d873] focus-visible:ring-[#00c853]",
  },
  {
    name: "Deliveroo",
    href: "https://deliveroo.ae/menu/dubai/marina/kebabs-crib?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share",
    className: "bg-[#00a2ff] hover:bg-[#2ab3ff] focus-visible:ring-[#00a2ff]",
  },
  {
    name: "Noon",
    href: "https://food.noon.com/uae-en/outlet/KBBSCR2LUQ/",
    className: "bg-[#fce000] text-black hover:bg-[#ffea3a] focus-visible:ring-[#fce000]",
  },
  {
    name: "Keeta",
    href: "https://url-eu.mykeeta.com/JzHpPofz",
    className: "bg-[#00c853] hover:bg-[#33d873] focus-visible:ring-[#00c853]",
  },
]

const DeliveryOptions = () => {
  return (
    <section className="mx-auto w-full max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-10">
      <div className="rounded-[28px] border border-KC_GREEN/10 bg-white p-5 shadow-md sm:p-6">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-KebabGreen/70">
            Delivery Platforms that deliver our delicious kebabs to your doorstep
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {orderProviders.map((provider) => (
              <a
                key={provider.name}
                href={provider.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold uppercase tracking-wide shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${provider.className}`}
                aria-label={`Order on ${provider.name}`}
              >
                Order on {provider.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DeliveryOptions
