"use client";
import { useState } from "react";
import PendingItem from "./PendingItem";
import { useOrder } from "@utils/context/OrderContext";
import LoadingScreen from "@components/Common/LoadingScreen";
import CompletedItem from "./CompletedItem";

const PendingOrders = () => {
  const { orders, loading, isLoading } = useOrder();
  const [view, setView] = useState<"pending" | "completed">("pending");

  if (loading || isLoading) {
    return <LoadingScreen />;
  }

  const filteredOrders = orders?.filter((item) => item.status === view);

  return (
    <div className="ml-0 md:ml-64 p-6 bg-EggShell">
      <h1 className="text-KC_GREEN text-4xl font-semibold mb-5 font-parkinsans">
        Orders
      </h1>

      {/* Toggle Bar */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView("pending")}
          className={`px-4 py-1 rounded-3xl border border-KC_GREEN text-KC_GREEN hover:bg-KC_GREEN transition-colors duration-150 hover:text-white ${
            view === "pending" ? "bg-KC_GREEN text-white" : " bg-white"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setView("completed")}
          className={`px-4 py-1 rounded-3xl border border-KC_GREEN text-KC_GREEN hover:bg-KC_GREEN transition-colors duration-150 hover:text-white ${
            view === "completed" ? "bg-KC_GREEN text-white" : "bg-white"
          }`}
        >
          Completed
        </button>
      </div>

      <h2 className="text-xl font-parkinsans mb-5 text-KC_GREEN capitalize">
        {view} Orders
      </h2>

      <div className="container grid grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredOrders && filteredOrders.length > 0 ? (
          filteredOrders.map((order) =>
            view === "pending" ? (
              <PendingItem
                key={order._id?.toString()}
                customerName={order.customer_name ?? ""}
                items={order.items}
                _id={order._id}
                createdAt={order.createdAt}
              />
            ) : (
              <CompletedItem
                key={order._id?.toString()}
                customerName={order.customer_name ?? ""}
                items={order.items}
                total_price={order.total_price}
                updatedAt={order.updatedAt}
              />
            ),
          )
        ) : (
          <p className="text-gray-500 text-lg col-span-full text-center">
            No {view} orders at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default PendingOrders;
