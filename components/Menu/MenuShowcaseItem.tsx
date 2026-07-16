import React from "react";
import Image from "next/image";
import Link from "next/link";

const optimizeUrl = (url: string) =>
  url.replace("/upload/", "/upload/w_1200,q_auto,f_auto/");

/* Dine-in prices — used only when an item has no price in the database */
const PRICE_MAP: Record<string, { price?: number; range?: [number, number] }> = {
  "veggie-special": { price: 38.25 },
  "classic-poulet": { price: 48.25 },
  boursin: { price: 48.25 },
  "classic-veal": { price: 48.25 },
  "mix-kebab": { price: 48.25 },
  gourmet: { price: 48.25 },
  tandoori: { price: 48.25 },
  "beef-duo": { price: 48.25 },
  "poulet-fromage": { price: 49.25 },
  merguez: { price: 50.0 },
  "beef-trio": { price: 50.0 },
  baguettes: { range: [48.25, 50.0] },
  "french-taco": { range: [46.5, 62.5] },
};

const formatPrice = (n: number) =>
  Number.isInteger(n) ? `${n}` : n.toFixed(2);

const formatRange = ([a, b]: [number, number]) => {
  const hasDecimals = !Number.isInteger(a) || !Number.isInteger(b);
  const f = (n: number) => (hasDecimals ? n.toFixed(2) : `${n}`);
  return `${f(a)} – ${f(b)}`;
};

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

  /* Prefer the database price; fall back to the dine-in list above */
  const dbPrice = item.item_price?.single;
  const fallback = item.slug ? PRICE_MAP[item.slug] : undefined;

  let priceLabel: string | null = null;
  if (dbPrice != null) {
    priceLabel = `AED ${formatPrice(dbPrice)}`;
  } else if (fallback?.price != null) {
    priceLabel = `AED ${formatPrice(fallback.price)}`;
  } else if (fallback?.range) {
    priceLabel = `AED ${formatRange(fallback.range)}`;
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
          <p className="mt-3 text-base sm:text-lg font-wildysans text-KC_GREEN">
            {priceLabel}
          </p>
        )}
      </div>
    </Link>
  );
};

export default MenuShowcaseItem;
