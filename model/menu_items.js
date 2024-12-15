import mongoose from "mongoose";

// Define the schema for menu items
const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    item: { type: Number, required: true },
    combo: { type: Number, required: true },
  },
  category: { type: String, required: true },
  sauces: [String],
  meatType: String,
});

// Create the model for menu items
export default mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);

