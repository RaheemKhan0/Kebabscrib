import React from "react";
import Image from "next/image";
import Link from "next/link";

const optimizeUrl = (url: string) =>
  url.replace("/upload/", "/upload/w_1200,q_auto,f_auto/");

/* Correct prices — these override the out-of-date database values */
const PRICE_OVERRIDE: Record<string, number> = {
  "veggie-special": 38.25,
  "classic-poulet": 48.25,
  boursin: 48.25,
  "classic-veal": 48.25,
  "mix-kebab": 48.25,
  gourmet: 48.25,
  tandoori: 48.25,
  "beef-duo": 48.25,
  "poulet-fromage": 49.25,
  "beef-trio": 50.0,
  merguez: 52.0,
};

/* Category cards shown as a price range (pre-formatted) */
const RANGE_OVERRIDE: Record<string, string> = {
  baguettes: "AED 48.25 - 52.00",
  "french-taco": "AED 46.50 - 62.50",
};

const formatPrice = (n: number) =>
  Number.isInteger(n) ? `${n}` : n.toFixed(2);

interface MenuItem {
  _id: string;
  item_name: string;
  item_description?: string;
  item_price: { single?: number; meal?: number };
  item_category: string;
  item_img_url?: string;
  slug?: string;
}

const MenuShowcaseItem = ({ item }: { item: MenuItem }) => {
  const href = item.slug ? `/menu/${item.slug}` : "/menu";

  const rangeLabel = item.slug ? RANGE_OVERRIDE[item.slug] : undefined;
  const fixedPrice = item.slug ? PRICE_OVERRIDE[item.slug] : undefined;

  let priceLabel: string | null = null;
  if (rangeLabel) {
    priceLabel = rangeLabel;
  } else if (fixedPrice != null) {
    priceLabel = `AED ${formatPrice(fixedPrice)}`;
  }

  return (
    <Link href={href} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-KC_GREEN/5">
        {item.item_img_url ? (
          <Image
            src={optimizeUrl(item.item_img_url)}
            alt={item.item_name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-KC_GREEN/5">
            <span className="text-KC_GREEN/10 text-7xl font-wildysans">KC</span>
          </div>
        )}
      </div>
      {/* Info — centered */}
      <div className="mt-5 text-center">
        <h3 className="font-wildysans fw-bold text-xl sm:text-2xl text-KC_GREEN group-hover:text-KC_PEACH transition-colors duration-200">
          {item.item_name}
        </h3>
        {item.item_description && (
          <p className="mt-2 text-sm leading-relaxed text-KC_GREEN/50 max-w-md mx-auto">
            {item.item_description}
          </p>
        )}
        {priceLabel && (
          <p className="mt-3 text-base sm:text-lg font-semibold text-KC_GREEN">
            {priceLabel}
          </p>
        )}
      </div>
    </Link>
  );
};

export default MenuShowcaseItem;
