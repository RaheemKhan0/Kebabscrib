"use client";
import { OrderType } from "types/order";
import React, { useEffect } from "react";
import Image from "next/image";

type Props = {
  order: OrderType;
};

export default function OrderSuccessful({ order }: Props) { 

  useEffect(() => {}, []);
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center px-4 text-white">
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Order Successful!
        </h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Order ID</h2>
          <p className="text-sm break-all text-gray-600">{order._id}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-medium">Customer Name:</h3>
            <p>{order.customer_name || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-medium">Email:</h3>
            <p>{order.email || "N/A"}</p>
          </div>
          <div>
            <h3 className="font-medium">Payment Status:</h3>
            <p className="font-semibold text-green-600">
              {order.isPaid ? "Paid" : "Not Paid "}
            </p>
          </div>
          <div>
            <h3 className="font-medium">Order Time:</h3>
            <p>{new Date(order?.createdAt ?? "").toLocaleString()}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Items Ordered:</h3>
        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex gap-4 items-center">
              <Image
                src={item.item_img_url ?? "/assets/KC_Logo_Logomark_green.svg"}
                alt={item.item_name}
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.item_name}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.Quantity} | Size: {item.size || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Price: AED {item.item_price.single}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <p className="font-bold text-xl">Total:</p>
          <p className="text-xl text-green-700 font-bold">
            AED {order.total_price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
