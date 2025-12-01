"use client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useCart } from "@utils/context/ShoppingCartContext";
import { useSearchParams } from "next/navigation";
import { OrderType } from "types/order";
import Image from "next/image";

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
      return;
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
        router.push(
          `/ordersuccessful?orderID=${encodeURIComponent(order._id ?? "")}`,
        );
      }
    }
  };

  // Render
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 lg:p-10 bg-EggShell">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-KC_GREEN mb-4 text-center">
        Complete your payment
      </h1>

      {/* Total Price */}
      <p className="text-3xl font-bold text-KC_BROWN mb-10">AED {getTotal()}</p>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row max-w-6xl w-full space-y-6 md:space-y-0 md:space-x-6">
        {/* Order Summary - Made Bigger */}
        <div className="md:w-3/5 w-full bg-KC_GREEN text-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-KC_Yellow">
            Order Summary
          </h2>

          {order.items.length === 0 ? (
            <p className="text-KC_Yellow/80">Loading items...</p>
          ) : (
            order.items.map((item) => (
              <div key={item._id} className="flex items-center space-x-5 mb-5">
                <Image
                  src={
                    item.item_img_url ?? "/assets/KC_Logo_Logomark_green.svg"
                  }
                  alt={item.item_name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg border border-KC_Yellow"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-white text-lg">
                    {item.item_name}
                  </p>
                  <p className="text-sm text-white/80">Qty: {item.Quantity}</p>
                  <p className="text-sm text-KC_Yellow">
                    Price: AED {item.item_price.single}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Payment Form - Enlarged Card Input */}
        <form
          onSubmit={handleSubmit}
          className="md:w-2/5 w-full p-8 bg-white rounded-lg shadow-xl border border-gray-200 space-y-6"
        >
          <h2 className="text-2xl font-bold text-KC_GREEN mb-3">
            Payment Details
          </h2>

            <div className="p-4 border border-gray-300 rounded-md bg-gray-50 w-full">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "20px",
                        color: "#1e293b",
                        "::placeholder": {
                          color: "#94a3b8",
                        },
                      },
                      invalid: {
                        color: "#dc2626",
                        iconColor: "#dc2626",
                      },
                    },
                    hidePostalCode: true,
                  }}
                />
              </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="w-full bg-KC_Yellow text-KC_GREEN font-bold py-3 rounded-lg hover:bg-yellow-400 hover:text-KC_BROWN transition-all duration-200 shadow-md disabled:opacity-60"
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
