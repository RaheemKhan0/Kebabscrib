"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { getClientSecret } from "@utils/middleware/checkout";
import { useCart } from "@utils/context/ShoppingCartContext";
import { getStripe } from "@utils/middleware/client/getStripe";
import { useSession } from "next-auth/react";
import { OrderType } from "types/order";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const stripePromise = getStripe();

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const email = searchParams.get("email");
  const orderID = searchParams.get("orderID");
  const [order, setOrder] = useState<OrderType | null>(null);
  const [noOrder, setNoOrder] = useState(false);
  const [notoastdisplay, setNoToastDisplay] = useState(false);

  useEffect(() => {
    const fetchEverything = async () => {
      if (!email || !orderID) {
        setNoOrder(true);
        return;
      }

      try {
        const res = await axios.post(`/api/users/order/getorder`, { orderID });
        const fetchedOrder = res.data.order;

        if (!fetchedOrder) throw new Error("No order found");
        setOrder(fetchedOrder);

        if (fetchedOrder.isPaid) return; // Don't fetch clientSecret if paid

        const secret = await getClientSecret({
          email,
          orderID,
        });

        setClientSecret(secret.clientSecret);
      } catch (err: any) {
        const status = err.response?.status;
        const message = err.response?.data?.error;

        if (status === 400 && message === "Invalid or missing order ID") {
          setNoOrder(true);
        } else if (status === 409 && !notoastdisplay) {
          toast.success("Your order has been placed and paid");
          setNoToastDisplay(true);
        } else {
          console.error("Unhandled error:", err);
        }
      }
    };

    fetchEverything();
  }, [email, orderID, notoastdisplay]);

  if (noOrder) {
    return <p>please add some items to your cart</p>;
  }

  if (order?.isPaid) {
    return <p>Payment already completed for this order.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-KebabGreenDark via-KebabGreen to-KebabGreen">
      <img
        src="/assets/KC_Logo.png"
        alt="Kebab's Crib Logo"
        className="h-20 w-36 absolute top-1 "
      />

      {clientSecret && order ? (
        <>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm clientSecret={clientSecret} order={order} />
          </Elements>
        </>
      ) : (
        <p>Preparing payment...</p>
      )}
    </div>
  );
}
