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
  const hasOrderId = Boolean(orderID);
  const [loading, setLoading] = useState(hasOrderId);
  const [order, setOrder] = useState<OrderType | null>(null);
  const [noorder, setNoOrder] = useState(!hasOrderId);
  const { clearCart } = useCart();

  useEffect(() => {
    if (!orderID) {
      return;
    }

    let attempts = 0;
    const maxAttempts = 10;
    let timeout: NodeJS.Timeout | null = null;
    let cancelled = false;

    const pollOrder = async () => {
      try {
        const res = await axios.post(`/api/users/order/getorder`, { orderID });
        const fetchedOrder = res.data.order;

        if (cancelled) {
          return;
        }

        if (fetchedOrder.isPaid) {
          setOrder(fetchedOrder);
          setLoading(false);
        } else {
          attempts += 1;
          if (attempts < maxAttempts) {
            timeout = setTimeout(pollOrder, 2000);
          } else {
            setOrder(fetchedOrder);
            setLoading(false);
          }
        }
      } catch {
        if (cancelled) {
          return;
        }
        setNoOrder(true);
        setLoading(false);
      }
    };

    pollOrder();

    return () => {
      cancelled = true;
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [orderID]);

  useEffect(() => {
    if (order?.isPaid) {
      clearCart();
    }
  }, [clearCart, order]);
  if (loading) {
    return <LoadingScreen />;
  }

  if (noorder || !order) {
    return <p>no order found</p>;
  }

  return <OrderSuccessful order={order} />;
}
