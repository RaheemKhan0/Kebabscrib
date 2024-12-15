import mongoose from "mongoose";
import { Burger } from "./classes/Burger";

const menuItemsSchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  item_description: { type: String, required: true },
  item_price: {
    single: { type: Number, required: true },
    combo: { type: Number, required: false },
  },
  item_category: { type: String, required: true },
  size: { type: String, required: false }, // Optional for items like tacos/pizza
  sauces: { type: [String], required: false }, // Optional for tacos
  extra_toppings: { type: [String], required: false }, // Optional for pizzas
  item_img_url: { type: String, required: false },
});

const MenuItem = mongoose.model("MenuItem", menuItemsSchema);
export default MenuItem;

