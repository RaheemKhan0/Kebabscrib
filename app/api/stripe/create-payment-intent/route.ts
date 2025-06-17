import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import connectMongodb from "@lib/mongodb";
import Order from "@model/orders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/option";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderID, email } = body;
    console.log("Receipt Email:", email);

    const userSession = await getServerSession(authOptions);

    if (!orderID) {
      return new NextResponse("Missing orderID", { status: 400 });
    }

    await connectMongodb();

    const order = await Order.findById(orderID);

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    if (order.isPaid) {
      return NextResponse.json(
        { message: "Order already paid" },
        { status: 409 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total_price * 100), // AED to fils
      currency: "aed",
      metadata: {
        orderID: order._id.toString(),
      },
      automatic_payment_methods: { enabled: true }, // optional, smart routing
      receipt_email: userSession?.user.email ?? email,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err: any) {
    console.error("Error creating PaymentIntent:", err.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

