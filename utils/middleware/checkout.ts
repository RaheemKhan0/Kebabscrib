"use client";
import axios from "axios";
import { OrderType } from "types/order";

export async function getClientSecret({
  orderID,
  email,
}: {
  orderID: string;
  email?: string;
}) {
  const res = await axios.post("/api/stripe/create-payment-intent", {
    orderID: orderID,
    email: email,
  });

  if (!res.data.clientSecret) {
    throw Error("clientSecret not found");
  }
  return {
    clientSecret: res.data.clientSecret,
  };
}
