"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../utils/context/ShoppingCartContext";
import { useRouter } from "next/navigation";
import CartItem from "./cartitem";

const ShoppingCart = () => {
  const {
    CartItems,
    addItem,
    removeItem,
    getItem,
    loading,
    decreaseQuantity,
    increaseQuantity,
    getTotal,
  } = useCart();
  const router = useRouter();

  useEffect(() => {
    console.log("Updating Cart Items : ", CartItems);
  }, [CartItems]);

  if (loading) {
    return (
      <div className="w-full flex flex-col text-center items-center justify-center flex-grow">
        <h1 className="font-bold text-xl">Loading</h1>
      </div>
    );
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
        </div>

        {/* Cart Items */}
        <div className="mx-auto max-w-3xl space-y-4">
          {CartItems.map((item) => (
            <CartItem
              key={item.id}
              item_name={item.item_name}
              item_description={item.item_description}
              item_price={item.item_price}
              item_category={item.item_category}
              size={item.size}
              extra_toppings={item.extra_toppings}
              item_img_url={item.item_img_url}
              quantity={item.Quantity}
              increaseQuantity={() => increaseQuantity(item.id)}
              decreaseQuantity={() => decreaseQuantity(item.id)}
              removeItem={() => removeItem(item.id)}
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
      </section>
    );
  }
};

export default ShoppingCart;
