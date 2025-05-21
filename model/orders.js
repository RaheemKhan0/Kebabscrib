import mongoose from "mongoose";
import { CartItem } from "@utils/context/ShoppingCartContext";

const orderSchema = new mongoose.Schema(
  {
    customer_id : {type : mongoose.Types.ObjectId , required : false},
    customer_name: { type: String, required: true },
    email : {type: String , required : true},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "KebabscribUser", required : false },
    items: { type: [CartItem], required: true },
    total_price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "preparing", "completed", "cancelled"],
      default: "pending",
    },
    isPaid: { type: Boolean, default: false },
    note: { type: String }, // Optional customer note
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
