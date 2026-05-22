import React from "react";
import Image from "next/image";
import Link from "next/link";

const optimizeUrl = (url: string) =>
  url.replace("/upload/", "/upload/w_1200,q_auto,f_auto/");

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
      </div>
    </Link>
  );
};

export default MenuShowcaseItem;
