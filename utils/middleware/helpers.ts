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

export function formatOrderItems(cartItems: CartItem[]) {
  return cartItems.map((item) => ({
    _id: item._id,
    item_name: item.item_name,
    item_description: item.item_description,
    item_price: item.meal ? item.item_price.meal : item.item_price.single,
    item_category: item.item_category,
    extra_Sauces:
      item.extra_Sauces?.map((sauce) => ({
        item_name: sauce.item_name,
        item_price: sauce.item_price.single,
        item_category: sauce.item_category,
        _id: sauce._id,
      })) ?? [],
    extra_Vegetables:
      item.extra_Vegetables?.map((veg) => ({
        item_name: veg.item_name,
        item_price: veg.item_price.single,
        item_category: veg.item_category,
        _id: veg._id,
      })) ?? [],
    extra_Cheese:
      item.extra_Cheese?.map((cheese) => ({
        item_name: cheese.item_name,
        item_price: cheese.item_price.single,
        item_category: cheese.item_category,
        _id: cheese._id,
      })) ?? [],
    extraMeat: item.extraMeat
      ? {
          item_name: item.extraMeat.item_name,
          item_price: item.extraMeat.item_price.single, //  Fix here
        }
      : undefined,
    mealdrink: item.mealdrink
      ? {
          item_name: item.mealdrink.item_name,
          item_price: item.mealdrink.item_price.single , //  Fix here
        }
      : undefined,
    mealsauce: item.mealsauce
      ? {
          item_name: item.mealsauce.item_name,
          item_price: item.mealsauce.item_price.single, // Fix here
        }
      : undefined,
    size: item.size && typeof item.size === "string" ? item.size : undefined,
    meal: item.meal ?? false,
    item_img_url: item.item_img_url ?? undefined,
    Quantity: item.Quantity,
  }));
}
