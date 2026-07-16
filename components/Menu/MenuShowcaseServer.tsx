import type { Menu } from "@components/Menu/MenuList";
import MenuShowcaseItem from "./MenuShowcaseItem";

/* Same categories and order as your client showcase */
const CATEGORIES = ["Des Taco", "Des Baguette", "Des Sandwiches"];

/* Fetch the menu on the SERVER so items are in the HTML (for SEO) */
async function getMenu(): Promise<Menu[]> {
  const base =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://www.kebabscrib.ae";
  try {
    const res = await fetch(`${base}/api/fetchmenuitems`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

const MenuShowcaseServer = async () => {
  const menu = await getMenu();
  const items = Array.isArray(menu)
    ? menu.filter(
        (item) => !item.isHidden && CATEGORIES.includes(item.item_category),
      )
    : [];

  return (
    <div>
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

export default MenuShowcaseServer;
