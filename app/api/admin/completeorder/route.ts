import connectMongodb from "@lib/mongodb";
import Order from "@model/orders";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id } = body;
    console.log("id : ", _id);

    await connectMongodb();

    const updatedOrder = await Order.updateOne(
      { _id },
      { $set: { status: "completed" } },
    );

    if (updatedOrder.modifiedCount === 0) {
      return NextResponse.json({ error: "No order updated", status: 400 });
    }

    return NextResponse.json({
      message: "Order status changed to completed",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
      status: 500,
    });
  }
}
