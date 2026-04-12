"use client";
import { useMemo } from "react";
import { useMenu } from "@utils/context/MenuContext";
import MenuShowcaseItem from "./MenuShowcaseItem";

/* Categories to include (in display order). Items from these categories
   are merged into a single flat list under one "Menu" heading. */
const CATEGORIES = ["Des Taco", "Des Baguette", "Des Sandwiches"];

interface MenuItem {
  _id: string;
  item_name: string;
  item_description?: string;
  item_price: { single?: number; meal?: number };
  item_category: string;
  item_img_url?: string;
  isHidden?: boolean;
}

const MenuShowcase = () => {
  const { menu } = useMenu();

  /* Flatten all items from the selected categories, ordered by CATEGORIES order */
  const items = useMemo(() => {
    if (!menu || !Array.isArray(menu)) return [];

    const byCategory: Record<string, MenuItem[]> = {};
    CATEGORIES.forEach((cat) => (byCategory[cat] = []));

    menu.forEach((item) => {
      if (!item.isHidden && CATEGORIES.includes(item.item_category)) {
        byCategory[item.item_category].push(item);
      }
    });

    return CATEGORIES.flatMap((cat) => byCategory[cat]);
  }, [menu]);

  /* Loading state */
  if (!menu || !Array.isArray(menu) || menu.length === 0) {
    return (
      <div className="px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-screen-xl mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[3/2] skeleton-shimmer opacity-5" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ── Single Menu Heading ── */}
      {/* <div className="text-center pt-12 sm:pt-16 pb-8 sm:pb-12">
        <h2
          className="font-wildysans text-KC_GREEN leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Menu
        </h2>
        <div className="mx-auto mt-3 h-px w-12 bg-KC_GREEN/15" />
      </div> */}

      {/* ── All Items Grid ── */}
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16 pb-20">
        <div className="flex flex-wrap justify-center gap-10">
          {items.map((item) => (
            <div
              key={item._id}
              className="w-full sm:w-[calc((100%-2.5rem)/2)] lg:w-[calc((100%-5rem)/3)]"
            >
              <MenuShowcaseItem item={item} />
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <p className="text-center text-KC_GREEN/25 py-12">
            No items available.
          </p>
        )}
      </div>
    </div>
  );
};

export default MenuShowcase;
