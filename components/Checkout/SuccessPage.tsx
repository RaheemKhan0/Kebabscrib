"use client";
import OrderSuccessful from "./OrderSuccessful";
import { useSearchParams } from "next/navigation";
import { OrderType } from "types/order";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "@components/Common/LoadingScreen";
import { useCart } from "@utils/context/ShoppingCartContext";

export default function SuccessPage() {
  const searchparams = useSearchParams();
  const orderID = searchparams.get("orderID");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderType | null>(null);
  const [noorder, setNoOrder] = useState(false);
  const { clearCart } = useCart();

  useEffect(() => {
    if (!orderID) {
      setNoOrder(true);
      setLoading(false);
      return;
    }

    let attempts = 0;
    const maxAttempts = 10;

    const pollOrder = async () => {
      try {
        const res = await axios.post(`/api/users/order/getorder`, { orderID });
        const fetchedOrder = res.data.order;

        if (fetchedOrder.isPaid) {
          setOrder(fetchedOrder);
          setLoading(false);
        } else {
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(pollOrder, 2000); // try again in 2 seconds
          } else {
            setOrder(fetchedOrder); // even if unpaid after 10 tries, show it
            setLoading(false);
          }
        }
      } catch (error) {
        setNoOrder(true);
        setLoading(false);
      }
    };

    pollOrder();
    if (order && order.isPaid) {
      clearCart();
    }
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }

  if (noorder || !order) {
    return <p>no order found</p>;
  }

  return <OrderSuccessful order={order} />;
}
