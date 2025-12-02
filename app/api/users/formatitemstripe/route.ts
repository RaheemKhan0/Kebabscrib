import connectMongodb from "@lib/mongodb";
import MenuItem from "@model/menu_items";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { lineItems } = await req.json();

    if (!lineItems || !Array.isArray(lineItems)) {
      return NextResponse.json(
        { error: "Invalid or missing cart items" },
        { status: 400 },
      );
    }

    await connectMongodb();
    const menu = await MenuItem.find(); // all menu items

    const findById = (id: string) =>
      menu.find((item) => item._id.toString() === id);

    const lineItemsfinal = lineItems.map((cartItem) => {
      if (!cartItem._id) {
        throw new Error("Cart item is missing _id");
      }

      const baseItem = findById(cartItem._id);
      if (!baseItem || !baseItem.item_price) {
        throw new Error(`Item not found or missing price: ${cartItem._id}`);
      }
      const imageUrl =
        baseItem?.item_img_url && baseItem.item_img_url.startsWith("http")
          ? baseItem.item_img_url?.replace("/upload", "/upload/q_auto,f_auto")
          : undefined;

      let price = cartItem.meal
        ? (baseItem.item_price.meal ?? baseItem.item_price.single + 10)
        : baseItem.item_price.single;

      const sumExtras = (extras = []) =>
        extras.reduce((total, e : any) => {
          const matched = findById(e._id);
          if (!matched || !matched.item_price) {
            console.warn(`Extra item not found or invalid: ${e._id}`);
            return total;
          }
          return total + (matched.item_price.single ?? 0);
        }, 0);

      // Safely calculate extras
      price +=
        sumExtras(cartItem.extra_Vegetables) +
        sumExtras(cartItem.extra_Sauces) +
        sumExtras(cartItem.extra_Cheese);

      // Extra meat (safely)
      if (cartItem.extraMeat) {
        const meatItem = findById(cartItem.extraMeat._id);
        if (!meatItem || !meatItem.item_price) {
          console.warn(`Extra meat item not found: ${cartItem.extraMeat._id}`);
        } else {
          price += meatItem.item_price.single ?? 0;
        }
      }

      return {
        price_data: {
          currency: "aed",
          product_data: {
            name: baseItem.item_name,
            ...(imageUrl && { images: [imageUrl] }),
          },
          unit_amount: Math.round(price * 100), // convert to fils
        },
        quantity: cartItem.Quantity ?? 1,
      };
    });

    return NextResponse.json({ lineItems: lineItemsfinal });
  } catch (error: any) {
    console.error("Failed to format items for Stripe:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
