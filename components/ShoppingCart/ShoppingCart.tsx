"use client";
import React, { useState } from "react";
import { useCart } from "@utils/context/ShoppingCartContext";
import ShoppingCartItem from "./cartitem";
import LoadingScreen from "../Common/LoadingScreen";
import { useSession } from "next-auth/react";
import ContinueAsGuest from "@components/Modals/ContinueAsGuest";
import GuestDetails from "@components/Modals/GuestDetails";

const ShoppingCart = () => {
  const {
    CartItems,
    removeItem,
    loading,
    decreaseQuantity,
    increaseQuantity,
    getTotal,
    getItemExtraTotal,
    placeOrder,
  } = useCart();
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [showGuestDetailsModal, setGuestDetailsModal] = useState(false);
  const handleCheckout = () => {
    if (status === "unauthenticated") {
      setShowModal(true);
      return;
    }
    if (session) {
      console.log("Placing order for the logged in user : " , session.user)
      placeOrder(session?.user.user_name, session?.user.email, session.user._id);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (CartItems.length === 0) {
    return (
      <div className="w-full flex flex-col text-center items-center justify-center flex-grow">
        <h1 className="font-bold text-xl">Your cart is empty</h1>
      </div>
    );
  } else {
    return (
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>
        </div>{" "}
        {showModal && (
          <ContinueAsGuest
            onClose={() => {
              setShowModal(false);
            }}
            onGuestClick={() => {
              setShowModal(false);
              setGuestDetailsModal(true);
            }}
          />
        )}
        {showGuestDetailsModal && (
          <GuestDetails
            onClose={() => {
              setGuestDetailsModal(false);
            }}
            onSubmit={(name, email) => {
              placeOrder(name, email);
            }}
          />
        )}
        {/* Cart Items */}
        <div className="mx-auto max-w-3xl space-y-4">
          {CartItems.map((item) => (
            <ShoppingCartItem
              key={item.cart_id}
              item={item}
              increaseQuantity={() => increaseQuantity(item.cart_id)}
              decreaseQuantity={() => decreaseQuantity(item.cart_id)}
              removeItem={() => removeItem(item.cart_id)}
              getItemExtraTotal={() => getItemExtraTotal(item)}
            />
          ))}
        </div>
        {/* Total Price Section */}
        <div className="mx-auto max-w-3xl px-4 py-6 mt-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Total:
          </h3>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            AED {getTotal()}
          </p>
        </div>
        <button
          onClick={() => {
            handleCheckout();
          }} // <-- Your function
          className="w-full bg-green-700 text-white text-lg font-semibold py-3 rounded-lg hover:bg-green-800 transition-colors duration-200"
        >
          Proceed to Checkout
        </button>
      </section>
    );
  }
};

export default ShoppingCart;
