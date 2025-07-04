import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    stripe_session_id: { type: String, required: false },
    customer_id: { type: String, required: false },
    customer_name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KebabscribUser",
      required: false,
    },
    items: [
      {
        _id: { type: String, required: true },
        item_name: { type: String, required: true },
        item_description: { type: String }, // optional
        item_price: { type: Number, required: true },
        item_category: { type: String, required: true },
        extra_Sauces: [
          {
            item_name: { type: String, required: true },
            item_price: { type: Number, required: true },
          },
        ],
        extra_Vegetables: [
          {
            item_name: { type: String, required: true },
            item_price: { type: Number, required: true },
          },
        ],
        extra_Cheese: [
          {
            item_name: { type: String, required: true },
            item_price: { type: Number, required: true },
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
    createdAt: Date,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  },
);
orderSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 900, partialFilterExpression: { status: "draft" } },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
