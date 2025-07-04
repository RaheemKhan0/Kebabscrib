import { NextRequest, NextResponse } from "next/server";
import { sendOrderReceiptEmail } from "@lib/emails/sendEmail";
import Stripe from "stripe";
import connectMongodb from "@lib/mongodb";
import Order from "@model/orders";
import KebabscribUser from "@model/Kebabscrib_User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

// Stripe expects raw body, so we must disable Next.js default parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// We use this helper to read raw body (Next.js App Router way)
async function buffer(readable: ReadableStream<Uint8Array>) {
  const reader = readable.getReader();
  let result = new Uint8Array();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    if (value) {
      const combined = new Uint8Array(result.length + value.length);
      combined.set(result);
      combined.set(value, result.length);
      result = combined;
    }
    done = doneReading;
  }

  return result;
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  if (!req.body) {
    console.error("No body found in Stripe webhook request!");
    return new NextResponse("Missing body", { status: 400 });
  }

  const rawBody = await buffer(req.body);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return new NextResponse("Webhook Error", { status: 400 });
  }
  // Handle checkout success
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const orderID = paymentIntent.metadata?.orderID;
    const charges = await stripe.charges.retrieve(
      paymentIntent.latest_charge as string,
    );
    await connectMongodb();

    const updated = await Order.findByIdAndUpdate(
      orderID,
      {
        stripe_session_id: paymentIntent.id, // now PaymentIntent id
        isPaid: true,
        total_price: paymentIntent.amount
          ? paymentIntent.amount / 100
          : undefined,
        customer_name: charges?.billing_details?.name || "Guest",
        email: charges?.billing_details?.email || "",
        status: "pending",
        phone: charges.billing_details?.phone,
      },
      { new: true },
    );
    const updateUserOrders = await KebabscribUser.findOneAndUpdate(
      updated.user_id,
      {
       $push: {orders : orderID} 
      },
      {
        new : true
      }
    );
    console.log("updated user's order : ", updateUserOrders)

    console.log("updated order : ", updated);
    await sendOrderReceiptEmail(updated);

    console.log("Order Updated successfully in webhook : ", updated);

    if (!updated) {
      console.error("Failed to update order:", orderID);
      return new NextResponse("Order not found", { status: 404 });
    }

    return new NextResponse("Webhook received", { status: 200 });
  } else {
    const session = event.data.object as Stripe.Checkout.Session;

    return NextResponse.json("Event type not handled", { status: 200 });
  }
}
