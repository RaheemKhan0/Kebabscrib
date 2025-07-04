import connectMongodb from "@lib/mongodb";
import Order from "@model/orders";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const orderID = params.id;

  if (!orderID) {
    return NextResponse.json(
      { error: "No order ID provided" },
      { status: 400 },
    );
  }

  await connectMongodb();
  const fetchedOrder = await Order.findById(orderID);

  if (!fetchedOrder) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  console.log("Fetched Order:", fetchedOrder);

  return NextResponse.json({ cartItems: fetchedOrder.items }, { status: 200 });
}
