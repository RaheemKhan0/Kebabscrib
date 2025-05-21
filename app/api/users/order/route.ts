import { NextRequest, NextResponse } from "next/server";
import { OrderType } from "types/order";
import Order from "@model/orders";
import connectMongodb from "@lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("request body of a function : ", body);

    const { customer_name, email, user_id, items, total_price, note } = body;

    // Basic validation
    if (
      (!customer_name && !user_id) ||
      !items ||
      items.length === 0 ||
      !total_price
    ) {
      return NextResponse.json(
        { error: "Missing required order fields" },
        { status: 400 },
      );
    }

    await connectMongodb();

    const newOrder = await Order.create({
      customer_name,
      email,
      user_id,
      items,
      total_price,
      note,
      status: "pending",
      isPaid: false,
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
