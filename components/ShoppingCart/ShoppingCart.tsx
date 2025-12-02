"use client";
import axios from "axios";
import { OrderType } from "types/order";
import React, { useState } from "react";
import { useCart } from "@utils/context/ShoppingCartContext";
import ShoppingCartItem from "./cartitem";
import LoadingScreen from "../Common/LoadingScreen";
import { useSession } from "next-auth/react";
import ContinueAsGuest from "@components/Modals/ContinueAsGuest";
import { useRouter } from "next/navigation";
import { formatOrderItems } from "@utils/middleware/helpers";
import VerifyModal from "@components/Modals/VerifyModal";
import toast from "react-hot-toast";
import EmptyCart from "./EmptyCart";

const ShoppingCart = () => {
  const {
    CartItems,
    removeItem,
    loading,
    decreaseQuantity,
    increaseQuantity,
    getTotal,
    getItemExtraTotal,
    clearCart,
  } = useCart();
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [skipVerification, setSkipVerification] = useState(false);
  const router = useRouter();
  const [verifyModalLoading, setVerifyModalLoading] = useState(false);

  const handleDraftOrderSuccess = () => {
    toast.success("Order submitted! We'll contact you shortly to confirm.");
    clearCart();
    router.push("/");
  };

  const handleCheckout = async () => {
    if (status === "unauthenticated") {
      setShowModal(true);
      return;
    }
    if (!session?.user.verified && !skipVerification) {
      setShowVerifyModal(true);
      return;
    }
    if (status === "authenticated") {
      try {
        const draftOrder: OrderType = {
          user_id: session?.user._id,
          items: formatOrderItems(CartItems),
          total_price: getTotal(),
          status: "draft",
        };

        await axios.post("/api/users/order/createdraftorder", draftOrder);
        handleDraftOrderSuccess();
      } catch (error) {
        console.error(error);
        toast.error("Unable to submit order. Please try again.");
      }
    }
  };
  const onVerify = async () => {
    try {
      setVerifyModalLoading(true);
      const res = await axios.post("/api/users/resend-verify-email");
      if (res.status === 200) {
        toast.success("verification email successfully sent");
        setSkipVerification(true);
      }
      setVerifyModalLoading(false);
    } catch (error: any) {
      setSkipVerification(true);
      setVerifyModalLoading(false);
      if (error.response.status === 429) {
        toast.error(error.response?.data?.error);
      }
    }
  };

  const onGuestClick = async () => {
    try {
      const draftOrder: OrderType = {
        items: formatOrderItems(CartItems),
        total_price: getTotal(),
        status: "draft",
      };

      await axios.post("/api/users/order/createdraftorder", draftOrder);
      handleDraftOrderSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Unable to submit order. Please try again.");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (CartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="bg-EggShell py-12 antialiased">
      <div className="mx-auto max-w-screen-xl px-4 mt-16">
        <h2 className="text-2xl font-bold text-KC_GREEN text-center sm:text-3xl mb-6">
          Shopping Cart
        </h2>
      </div>

      {showModal && (
        <ContinueAsGuest
          onClose={() => setShowModal(false)}
          onGuestClick={onGuestClick}
        />
      )}

      {showVerifyModal && (
        <VerifyModal
          loading={verifyModalLoading}
          onClose={() => setShowVerifyModal(false)}
          onSkip={async () => {
            setSkipVerification(true);
            try {
              const draftOrder: OrderType = {
                items: formatOrderItems(CartItems),
                total_price: getTotal(),
                status: "draft",
              };

              await axios.post(
                "/api/users/order/createdraftorder",
                draftOrder,
              );
              handleDraftOrderSuccess();
            } catch (error) {
              console.error(error);
              toast.error("Unable to submit order. Please try again.");
            }
          }}
          onVerify={onVerify}
        />
      )}

      {/* Cart Items */}
      <div className="mx-auto max-w-3xl px-4 space-y-4">
        {CartItems.map((item) => (
          <ShoppingCartItem
            key={item.cart_id}
            item={item}
            increaseQuantity={() => increaseQuantity(item.cart_id ?? "")}
            decreaseQuantity={() => decreaseQuantity(item.cart_id ?? "")}
            removeItem={() => removeItem(item.cart_id ?? "")}
            getItemExtraTotal={() => getItemExtraTotal(item)}
          />
        ))}
      </div>

      {/* Total Price Section */}
      <div className="mx-auto max-w-3xl px-4 py-6 mt-8 bg-white border border-KC_GREEN rounded-lg shadow-md flex justify-between items-center">
        <h3 className="text-lg font-semibold text-KC_GREEN">Total:</h3>
        <p className="text-xl font-bold text-KC_GREEN">AED {getTotal()}</p>
      </div>

      {/* Checkout Button */}
      <div className="mx-auto max-w-3xl px-4 mt-6">
        <button
          onClick={handleCheckout}
          className="w-full bg-KC_GREEN text-white text-lg font-semibold py-3 rounded-lg hover:bg-KC_GREEN/90 transition-colors duration-200"
        >
          Submit Order
        </button>
      </div>
    </section>
  );
};
export default ShoppingCart;
