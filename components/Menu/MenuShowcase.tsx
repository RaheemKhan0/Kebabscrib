"use client";
import { useMemo } from "react";
import { useMenu } from "@utils/context/MenuContext";
import MenuShowcaseItem from "./MenuShowcaseItem";

/* Categories shown on the menu page, in display order.
   Single-item categories appear first, then larger groups. */
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

const CategorySection = ({
  category,
  items,
}: {
  category: string;
  items: MenuItem[];
}) => {
  if (items.length === 0) return null;

  return (
    <div className="pb-16 sm:pb-20">
      {/* Category Title */}
      <div className="text-center pt-12 sm:pt-16 pb-6 sm:pb-8">
        <h2
          className="font-wildysans text-KC_GREEN leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          {category}
        </h2>
        <div className="mx-auto mt-3 h-px w-12 bg-KC_GREEN/15" />
      </div>

      {/* Items Grid */}
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-14">
          {items.map((item) => (
            <MenuShowcaseItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MenuShowcase = () => {
  const { menu } = useMenu();

  const itemsByCategory = useMemo(() => {
    const result: Record<string, MenuItem[]> = {};
    CATEGORIES.forEach((cat) => (result[cat] = []));

    if (!menu || !Array.isArray(menu)) return result;

    menu.forEach((item) => {
      if (!item.isHidden && CATEGORIES.includes(item.item_category)) {
        result[item.item_category].push(item);
      }
    });

    return result;
  }, [menu]);

  /* Loading state */
  if (!menu || !Array.isArray(menu) || menu.length === 0) {
    return (
      <div className="px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-screen-xl mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[3/2] rounded-xl skeleton-shimmer opacity-5" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {CATEGORIES.map((cat) => (
        <CategorySection
          key={cat}
          category={cat}
          items={itemsByCategory[cat]}
        />
      ))}
    </div>
  );
};

export default MenuShowcase;
