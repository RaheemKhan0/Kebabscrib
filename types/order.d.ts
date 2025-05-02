
import { Types } from "mongoose";
import { CartItem } from "./CartItem";

export interface OrderType {
  _id?: Types.ObjectId;
  customer_name: string;
  user_id?: Types.ObjectId;
  items: CartItem[];
  total_price: number;
  status?: "pending" | "preparing" | "completed" | "cancelled";
  isPaid?: boolean;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

