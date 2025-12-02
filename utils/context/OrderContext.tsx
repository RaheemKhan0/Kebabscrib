"use client";
import {
  ReactNode,
  useContext, 
  useState,
  createContext,
} from "react";
import useSWR from "swr";
import { OrderType } from "types/order";
import axios from "axios";
import toast from "react-hot-toast";

interface OrdersContextType {
  completeorder: (_id: string | undefined) => Promise<void>;
  orders: OrderType[];
  loading: boolean;
  mutate: () => void;
  isLoading: boolean;
}

const OrdersContext = createContext<OrdersContextType | null>(null);

export const OrdersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    data: orders = [],
    isLoading,
    mutate,
  } = useSWR<OrderType[] | []>("/api/admin/fetchorder", (url : string) => fetch(url).then((res) => res.json()).then((data) => data.orders));

  const [loading, setLoading] = useState(false);

  const completeOrder = async (_id: string | undefined) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/admin/completeorder", { _id });
      if (res.status == 200) {
        mutate();
        toast.success("order completed!");
      }
    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        completeorder: completeOrder,
        orders: orders,
        mutate: mutate,
        loading,
        isLoading: isLoading,
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
