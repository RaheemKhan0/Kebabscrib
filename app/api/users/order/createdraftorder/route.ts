import { NextRequest, NextResponse } from "next/server";
import Order from "@model/orders";
import connectMongodb from "@lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      email,
      user_id,
      items,
      total_price,
    } = body;
    console.log("Cart Items : ", items);

    // Basic validation
    if (!items || items.length === 0 || !total_price) {
      return NextResponse.json(
        { error: "Missing required order fields" },
        { status: 400 },
      );
    }

    await connectMongodb();
    // Create new order
    const newOrder = await Order.create({
      email: email || "",
      user_id: user_id || null,
      items,
      total_price,
      status: "draft",
      isPaid: false,
    });

    console.log("Draft order created:", newOrder._id);

    return NextResponse.json({ newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error placing/updating order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
