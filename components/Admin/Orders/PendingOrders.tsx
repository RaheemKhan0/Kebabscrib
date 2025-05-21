"use client";
import PendingItem from "./PendingItem";
import { useEffect } from "react";
import { useOrder } from "@utils/context/OrderContext";
import LoadingScreen from "@components/Common/LoadingScreen";

const PendingOrders = () => {
  const { order, loading } = useOrder();

  useEffect(() => {
    console.log("Orders : ", order);
  }, [order]);

  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <div className="ml-0 md:ml-64 p-6 bg-EggShell">
          <h1 className="text-KC_GREEN flex  text-4xl font-semibold mb-5 font-parkinsans ">
            Orders
          </h1>
          <h2 className="text-xl font-parkinsans mb-5 text-KC_GREEN">
            Pending Orders
          </h2>
          <div className="container grid grid-cols-2 lg:grid-cols-3 gap-3">
            {order
              .filter((item) => item.status === "pending")
              .map((item) => (
                <PendingItem
                  key={item._id?.toString()} // add a key if possible
                  customerName={item.customer_name}
                  items={item.items}
                  _id={item?._id}
                />
              ))}
          </div>
        </div>
      </>
    );
  }
};

export default PendingOrders;
