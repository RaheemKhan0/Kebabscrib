import connectMongodb from "@lib/mongodb";
import Order from "@model/orders";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await connectMongodb();

  const deleted = await Order.findByIdAndDelete(id);

  if (!deleted) {
    return new NextResponse("Order not found", { status: 404 });
  }

  return new NextResponse("Order deleted", { status: 200 });
}
