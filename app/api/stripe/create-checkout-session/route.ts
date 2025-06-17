import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/option";
import { stripe } from "@lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userSession = await getServerSession(authOptions);
  if (!body.lineItems) {
    return NextResponse.json(
      { error: "line items are neccessary for stripe checkout" },
      { status: 400 },
    );
  }
  console.log("body : ", body);
  console.log("line Items : " , body.lineItems);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_creation: "always",
      line_items: body.lineItems,
      customer_email: userSession?.user.email || undefined,
      metadata: {
       orderID : body.orderID, 
      },
      billing_address_collection: "auto",
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/cart`,
    });
    console.log("Session: ", session);

    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (err: any) {
    console.log("Stripe Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
