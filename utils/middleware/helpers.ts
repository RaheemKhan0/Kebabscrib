import { CartItem } from "@utils/context/ShoppingCartContext";

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, "") // Remove special characters
    .replace(/\\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Collapse multiple dashes
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function extractPublicId(imageUrl: string): string | null {
  const parts = imageUrl.split("/upload/");
  if (parts.length < 2) return null;

  const [folderAndFilename] = parts[1].split(".");
  return folderAndFilename;
}

const getItemExtraTotal = (item: CartItem) => {
  const TotalVegetables =
    item.extra_Vegetables?.reduce(
      (sum, v) => sum + (v.item_price.single ?? 0),
      0,
    ) ?? 0;

  const TotalSauces =
    item.extra_Sauces?.reduce(
      (sum, s) => sum + (s.item_price.single ?? 0),
      0,
    ) ?? 0;

  const TotalCheese =
    item.extra_Cheese?.reduce(
      (sum, c) => sum + (c.item_price.single ?? 0),
      0,
    ) ?? 0;

  return (
    TotalVegetables +
    TotalSauces +
    TotalCheese +
    (item.extraMeat?.item_price.single ?? 0)
  );
};

const getTotal = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (total, item) =>
      total +
      (item.meal
        ? (item.item_price.meal ??
          item.item_price.single + 10 + getItemExtraTotal(item))
        : item.item_price.single + getItemExtraTotal(item)) *
        item.Quantity,
    0,
  );
};

export const formatItemForStripe = (cartItems: CartItem[]) => {
  return cartItems.map((item) => ({
    price_data: {
      currency: "aed",
      product_data: { name: item.item_name },
      unit_amount:
        (item.meal
          ? (item.item_price.meal ?? item.item_price.single + 10) +
            getItemExtraTotal(item)
          : item.item_price.single + getItemExtraTotal(item)) * 100,
    },
    quantity: item.Quantity,
  }));
};

export function formatOrderItems(cartItems: CartItem[]): CartItem[] {
  return cartItems.map((item) => ({
    ...item,
    item_price: {
      single: item.item_price.single,
      ...(item.item_price.meal !== undefined && {
        meal: item.item_price.meal,
      }),
    },
    extra_Sauces:
      item.extra_Sauces?.map((sauce) => ({
        ...sauce,
        item_price: {
          single: sauce.item_price.single,
        },
      })) ?? [],
    extra_Vegetables:
      item.extra_Vegetables?.map((veg) => ({
        ...veg,
        item_price: {
          single: veg.item_price.single,
        },
      })) ?? [],
    extra_Cheese:
      item.extra_Cheese?.map((cheese) => ({
        ...cheese,
        item_price: {
          single: cheese.item_price.single,
        },
      })) ?? [],
    extraMeat: item.extraMeat
      ? {
          ...item.extraMeat,
          item_price: { single: item.extraMeat.item_price.single },
        }
      : undefined,
    mealdrink: item.mealdrink
      ? {
          ...item.mealdrink,
          item_price: { single: item.mealdrink.item_price.single },
        }
      : undefined,
    mealsauce: item.mealsauce
      ? {
          ...item.mealsauce,
          item_price: { single: item.mealsauce.item_price.single },
        }
      : undefined,
    size: item.size && typeof item.size === "string" ? item.size : undefined,
    meal: item.meal ?? false,
    item_img_url: item.item_img_url ?? undefined,
    Quantity: item.Quantity,
  }));
}
