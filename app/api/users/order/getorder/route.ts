import connectMongodb from "@lib/mongodb";
import Order from "@model/orders";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const reqbody = await req.json();
    const { orderID } = reqbody;

    console.log("Order ID:", orderID);
    console.log("reqBody:", reqbody);

    if (!orderID || !mongoose.Types.ObjectId.isValid(orderID)) {
      return NextResponse.json(
        { error: "Invalid or missing order ID" },
        { status: 400 },
      );
    }

    await connectMongodb();

    const fetchedOrder = await Order.findById(orderID);

    if (!fetchedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    console.log("Fetched Order:", fetchedOrder);

    return NextResponse.json({ order: fetchedOrder }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching order:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
