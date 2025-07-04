import connectMongodb from "@lib/mongodb";
import Order from "@model/orders";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
const dotenv = await import("dotenv");
dotenv.config({ path: ".env.local" });

export async function GET(req: NextRequest) {
  const payload = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (payload?.role != "admin" && payload?.role != "staff") {
    return NextResponse.json({
      error: "Not authorised to make this request",
      status: 401,
    });
  }
  try {

    await connectMongodb();
    const order = await Order.find();
    if (!order) {
      return NextResponse.json({
        message: "No orders found",
        status: 404
      })
    }

    return NextResponse.json({
      message: "Orders Fetched",
      orders : order,
      status: 200
    })



  } catch (error) {
    return NextResponse.json({
      error : error,
      status : 500
    })
  }
}
