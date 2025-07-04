import connectMongodb from "@lib/mongodb";
import Order from "@model/orders";
import { NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectMongodb();

  const deleted = await Order.findByIdAndDelete(params.id);

  if (!deleted) {
    return new NextResponse("Order not found", { status: 404 });
  }

  return new NextResponse("Order deleted", { status: 200 });
}

