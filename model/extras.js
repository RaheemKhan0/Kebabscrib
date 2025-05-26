import mongoose from "mongoose";

const otherSchema = new mongoose.Schema(
  {
    item_name: { type: String, required: true },
    item_description: { type: String, default: "" },
    item_price: { type: Number, required: true },
    item_category: {
      type: String,
      required: true,
      enum: ["Sauce", "Cheese", "Vegetable", "Drink", "Other"],
    },
    isHidden: { type: Boolean, default: false },
    item_img_url: {type : string, required : false},
  },
  { timestamps: true }
);

const OtherItem =
  mongoose.models.OtherItem || mongoose.model("OtherItem", otherSchema);

export default OtherItem;

