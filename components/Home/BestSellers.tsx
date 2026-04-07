import Image from "next/image";
import Link from "next/link";

const BEST_SELLERS = [
  {
    number: "01",
    name: "Merguez",
    tagline: "Bold & Spicy",
    description:
      "Bold and flavorful lamb sausage sandwich. All sandwiches come with salad, tomato, onion and a sauce of your liking in a home-made bread",
    image: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1745681351/Merguez_zhoplk.jpg",
    cardBg: "bg-KC_GREEN",
    imageBg: "bg-KC_Forest",
  },
  {
    number: "02",
    name: "Mix Kebab",
    tagline: "Best of Both Worlds",
    description:
      "The best of both worlds — veal and chicken in perfect marriage. All sandwiches come with salad, tomato, onion and a sauce of your liking in a home-made bread.",
    image: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1745680051/Mix_Kebab_jgizht.jpg",
    cardBg: "bg-Sandy",
    imageBg: "bg-KC_Ochre",
  },
  {
    number: "03",
    name: "Veal Baguette",
    tagline: "Melt-In-Your-Mouth",
    description:
      "Melt-in-your-mouth veal kebab topped with gooey mozzarella in a baguette. Comes with salad, tomato, onion and a sauce of your liking in a home-made bread.",
    image: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1745681349/Four_Veal_zhish2.jpg",
    cardBg: "bg-KC_GREEN",
    imageBg: "bg-KC_Forest",
  },
  {
    number: "04",
    name: "Medium Taco",
    tagline: "The French Taco",
    description:
      "Our best-selling French taco comes with fries, cheese sauce, cheddar and extra sauce inside. Choose your size, meat and extra sauce.",
    image: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1745680051/Medium_French_Taco_e1yjcj.jpg",
    cardBg: "bg-Sandy",
    imageBg: "bg-KC_Ochre",
  },
  {
    number: "05",
    name: "Poulet Fromage",
    tagline: "Crispy & Cheesy",
    description:
      "Grilled chicken breast meets the perfect trio — savory turkey ham, egg and gooey melted cheddar. All sandwiches come with salad, tomato, onion and a sauce of your liking in a home-made bread.",
    image: "https://res.cloudinary.com/dpqto9jrm/image/upload/v1745681352/Poulet_Fromage_zjzobp.jpg",
    cardBg: "bg-KC_GREEN",
    imageBg: "bg-KC_Forest",
  },
];

export const BestSellers = () => {
  return (
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="text-center mb-10 md:mb-14">
        <p className="text-xs uppercase tracking-[0.3em] text-KC_GREEN/50 font-medium mb-2">
          Fan Favourites
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-KC_GREEN font-parkinsans">
          Our Best Sellers
        </h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-KC_GREEN/20" />
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-5">
        {BEST_SELLERS.map((item) => {
          const isGreen = item.cardBg === "bg-KC_GREEN";
          return (
            <div
              key={item.number}
              className={`group flex flex-col sm:flex-row rounded-3xl overflow-hidden shadow-md
                hover:shadow-xl transition-shadow duration-300 ${item.cardBg}`}
            >
              {/* ── TEXT SIDE ── */}
              <div className="relative flex flex-col justify-center px-8 py-9 sm:w-[45%] gap-3">
                {/* faint number watermark */}
                <span
                  aria-hidden
                  className={`absolute top-5 left-7 text-8xl font-extrabold font-parkinsans leading-none select-none pointer-events-none
                    ${isGreen ? "text-white/10" : "text-KC_GREEN/10"}`}
                >
                  {item.number}
                </span>

                <p className={`text-[11px] uppercase tracking-[0.28em] font-medium
                  ${isGreen ? "text-EggShell/60" : "text-KC_GREEN/50"}`}>
                  {item.tagline}
                </p>
                <h3 className={`text-2xl sm:text-3xl font-bold font-parkinsans leading-tight
                  ${isGreen ? "text-EggShell" : "text-KC_GREEN"}`}>
                  {item.name}
                </h3>
                <p className={`text-sm leading-relaxed max-w-sm
                  ${isGreen ? "text-EggShell/70" : "text-KC_GREEN/60"}`}>
                  {item.description}
                </p>

                {/* Decorative dots row */}
                <div className={`flex gap-1 mt-1 ${isGreen ? "text-EggShell/20" : "text-KC_GREEN/15"}`}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} className="text-[10px]">✕</span>
                  ))}
                </div>

                <Link
                  href="/menu"
                  className={`self-start mt-2 inline-flex items-center gap-1.5 text-xs font-semibold
                    uppercase tracking-wider pb-px border-b transition-colors duration-200
                    ${isGreen
                      ? "text-EggShell border-EggShell/40 hover:border-EggShell"
                      : "text-KC_GREEN border-KC_GREEN/30 hover:border-KC_GREEN"
                    }`}
                >
                  View in Menu
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>

              {/* ── IMAGE SIDE ── */}
              <div className={`relative aspect-[16/9] sm:aspect-auto sm:w-[55%] ${item.imageBg}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 55vw"
                />
                {/* gradient blend from card color into image */}
                <div className={`absolute inset-0 bg-gradient-to-r pointer-events-none
                  ${isGreen ? "from-KC_GREEN/40 via-KC_GREEN/10 to-transparent" : "from-Sandy/60 via-Sandy/10 to-transparent"}
                  hidden sm:block`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
