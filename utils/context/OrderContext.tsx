"use client";
import {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import { OrderType } from "types/order";
import axios from "axios";
import toast from "react-hot-toast";

interface OrdersContextType {
  fetchorder: () => Promise<void>;
  completeorder: (_id: string | undefined) => Promise<void>;
  order: OrderType[];
  loading: boolean;
}

const OrdersContext = createContext<OrdersContextType | null>(null);

export const OrdersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchorders = async () => {
    try {
      const res = await axios.get("/api/admin/fetchorder");
      const data: OrderType[] = await res.data.orders;
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.log("There was an error fetching the Orders : ", error);
      setLoading(false);
    }
  };
  const completeOrder = async (_id: string | undefined) => {
    try {
      setLoading(true);
      console.log("id : ", _id);
      const res = await axios.post("/api/admin/completeorder", { _id });
      if (res.status == 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === _id ? { ...order, status: "completed" } : order,
          ),
        );
        toast.success("order completed!");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchorders();
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        fetchorder: fetchorders,
        completeorder: completeOrder,
        order: orders,
        loading,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
export const useOrder = () => {
  const OrderContext = useContext(OrdersContext);
  if (!OrderContext) {
    throw new Error("useOrder must be used within an OrdersProvider");
  }
  return OrderContext;
};
