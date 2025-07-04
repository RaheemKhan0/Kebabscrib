"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingScreen from "@components/Common/LoadingScreen";
import { OrderType } from "types/order";
import axios from "axios";

export default function CheckoutDetailsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const searchparams = useSearchParams();
  const orderID = searchparams.get("orderID");
  const [noorder, setNoOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderType | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("session : ", session);
    if (status === "authenticated") {
      setCustomerEmail(session.user.email);
      setCustomerName(session.user.user_name);
    }
    const fetchorder = async () => {
      if (!orderID) {
        setNoOrder(true);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.post(`/api/users/order/getorder`, {
          orderID: orderID,
        });
        if (res.data.order) {
          setOrder(res.data.order);
        }
        setLoading(false);
      } catch (error: any) {
        const status = error.response?.status;
        const message = error.response?.data?.error;

        if (status === 404) {
          setNoOrder(true);
          setError("Order not found.");
        } else if (
          status === 400 &&
          message === "Invalid or missing order ID"
        ) {
          setNoOrder(true);
          setError("Invalid order ID provided.");
        } else {
          setError("Something went wrong while fetching the order.");
        }

        setLoading(false);
      }
    };
    fetchorder();
  }, [session]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) {
      setError("Name and email are required.");
      return;
    }
    router.push(
      `/checkout/payment?name=${encodeURIComponent(customerName)}&email=${encodeURIComponent(
        customerEmail,
      )}&phone=${encodeURIComponent(customerPhone)}&orderID=${encodeURIComponent(orderID ?? "")}`,
    );
  };

  if (status === "loading" || loading) {
    return <LoadingScreen />;
  }
  if (noorder) {
    return <p>seems like you have not filled your cart</p>;
  }
  if (order?.isPaid) {
    return <p>the order has been paid</p>;
  }

  return (
    <div className="min-h-screen bg-EggShell flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl font-bold text-KC_GREEN mb-6 text-center">
        Enter Checkout Details
      </h1>
      <form
        onSubmit={handleContinue}
        className="bg-white p-6 md:p-8 rounded-xl shadow-2xl border border-KC_GREEN max-w-md w-full space-y-5"
      >
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-KC_GREEN text-KC_GREEN font-medium"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-KC_GREEN text-KC_GREEN font-medium"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-KC_GREEN text-KC_GREEN font-medium"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-KC_Yellow text-KC_GREEN font-bold py-3 rounded-lg hover:bg-yellow-400 hover:text-KC_BROWN transition-all duration-200 shadow-md"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
}
