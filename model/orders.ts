import {
  Schema,
  model,
  models,
  Document,
  Types,
} from "mongoose";

export interface OrderExtraItem {
  item_name: string;
  item_price: number;
  item_category?: string;
  _id?: string;
}

export interface OrderItem {
  _id: string;
  item_name: string;
  item_description?: string;
  item_price: number;
  item_category: string;
  extra_Sauces: OrderExtraItem[];
  extra_Vegetables: OrderExtraItem[];
  extra_Cheese: OrderExtraItem[];
  extraMeat?: OrderExtraItem;
  mealdrink?: OrderExtraItem;
  mealsauce?: OrderExtraItem;
  size?: "Medium" | "Large";
  meal: boolean;
  item_img_url?: string;
  Quantity: number;
}

export type OrderStatus = "draft" | "pending" | "completed";

export interface OrderDocument extends Document {
  stripe_session_id?: string;
  customer_id?: string;
  customer_name?: string;
  email?: string;
  phone?: string;
  user_id?: Types.ObjectId;
  items: OrderItem[];
  total_price: number;
  status: OrderStatus;
  note?: string;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<OrderDocument>(
  {
    stripe_session_id: { type: String, required: false },
    customer_id: { type: String, required: false },
    customer_name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "KebabscribUser",
      required: false,
    },
    items: [
      {
        _id: { type: String, required: true },
        item_name: { type: String, required: true },
        item_description: { type: String },
        item_price: { type: Number, required: true },
        item_category: { type: String, required: true },
        extra_Sauces: [
          {
            item_name: { type: String, required: true },
            item_price: { type: Number, required: true },
            item_category: { type: String },
            _id: { type: String },
          },
        ],
        extra_Vegetables: [
          {
            item_name: { type: String, required: true },
            item_price: { type: Number, required: true },
            item_category: { type: String },
            _id: { type: String },
          },
        ],
        extra_Cheese: [
          {
            item_name: { type: String, required: true },
            item_price: { type: Number, required: true },
            item_category: { type: String },
            _id: { type: String },
          },
        ],
        extraMeat: {
          item_name: { type: String },
          item_price: { type: Number },
        },
        mealdrink: {
          item_name: { type: String },
          item_price: { type: Number },
        },
        mealsauce: {
          item_name: { type: String },
          item_price: { type: Number },
        },
        size: { type: String, enum: ["Medium", "Large"] },
        meal: { type: Boolean, required: true },
        item_img_url: { type: String },
        Quantity: { type: Number, required: true },
      },
    ],
    total_price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["draft", "pending", "completed"],
      default: "pending",
    },
    note: { type: String },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 900, partialFilterExpression: { status: "draft" } },
);

const Order =
  models.Order || model<OrderDocument>("Order", orderSchema);

export default Order;
