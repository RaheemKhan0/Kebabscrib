import { Types } from "mongoose";
import { CartItem } from "@utils/context/ShoppingCartContext";

export interface OrderType {
  _id?: string;
  customer_name?: string;
  email?: string;
  user_id?: string;
  items: CartItem[];
  total_price: number;
  status?: "pending" | "completed" | "draft";
  isPaid?: boolean;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
