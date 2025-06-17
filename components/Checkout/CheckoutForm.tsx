"use client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useCart } from "@utils/context/ShoppingCartContext";
import { useSearchParams } from "next/navigation";
import { OrderType } from "types/order";

export default function CheckoutForm({
  clientSecret,
  order,
}: {
  clientSecret: string;
  order: OrderType;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const searchparams = useSearchParams();

  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const email = searchparams.get("email");
  const phone = searchparams.get("phone");
  const name = searchparams.get("name");
  const { getTotal } = useCart();

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    if (!name || !email) {
      toast.error("please make sure to fill the checkout details first");
      router.push("/checkout/details");
      return
    }

    const cardElement = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement!,
        billing_details: {
          name: name,
          email: email,
          phone: phone,
        },
      },
      receipt_email: email,
    });

    if (result.error) {
      setError(result.error.message ?? "An error occurred.");
      setIsProcessing(false);
    } else {
      if (result.paymentIntent?.status === "succeeded") {
        console.log("Payment succeeded for order:", order._id);

        // Optional → call your API to mark order complete if needed

        // Redirect to success page
        router.push(`/ordersuccessful?orderID=${encodeURIComponent(order._id ?? "")}`);
      }
    }
  };

  // Render
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 m-14 lg:m-4">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-Sandy mb-6 text-center">
        Complete your payment
      </h1>

      {/* Total Price */}
      <p className="text-3xl font-bold text-white mb-8">AED {getTotal()} </p>

      {/* Main content box */}
      {/* Main content box */}
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-none space-y-6 md:space-y-0 md:space-x-6">
        {/* Order Summary */}
        <div className="md:w-1/2 w-full bg-[#0C6045] text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          {order.items.length === 0 ? (
            <p className="text-gray-300">Loading items...</p>
          ) : (
            order.items.map((item) => (
              <div key={item._id} className="flex items-center space-x-4 mb-4">
                <img
                  src={item.item_img_url}
                  alt={item.item_name}
                  className="w-14 h-14 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.item_name}</p>
                  <p className="text-sm text-gray-200">Qty: {item.Quantity}</p>
                  <p className="text-sm text-gray-200">
                    Price: AED {item.item_price.single}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Payment Form */}
        <form
          onSubmit={handleSubmit}
          className="md:w-1/2 w-full space-y-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Complete Your Payment
          </h2>

          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a",
                },
              },
              hidePostalCode: true,
            }}
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="w-full bg-KebabGreen text-white text-lg font-semibold py-3 rounded-lg hover:bg-KebabGreenDark transition-colors duration-200"
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
