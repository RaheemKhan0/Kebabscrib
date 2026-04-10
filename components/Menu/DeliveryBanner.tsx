const PLATFORMS = [
  { name: "Talabat",   href: "https://www.talabat.com/uae/restaurant/612274/kebabs-crib?aid=1272" },
  { name: "Careem",    href: "https://url.careem.com/uMo8iNUqyKMLA" },
  { name: "Deliveroo", href: "https://deliveroo.ae/menu/dubai/marina/kebabs-crib?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share" },
  { name: "Noon",      href: "https://food.noon.com/uae-en/outlet/KBBSCR2LUQ/" },
  { name: "Keeta",     href: "https://url-eu.mykeeta.com/JzHpPofz" },
];

const DeliveryBanner = () => {
  return (
    <div className="w-full border-t border-KC_GREEN/10 py-10">
      <div className="mx-auto max-w-screen-xl px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-KC_GREEN/30 mb-4">
          Order delivery via
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base font-medium text-KC_GREEN/50
                hover:text-KC_GREEN transition-colors duration-200"
            >
              {p.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryBanner;
