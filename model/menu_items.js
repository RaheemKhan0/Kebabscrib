import mongoose from "mongoose";

// Define the schema for menu items
const menuItemsSchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  item_description: { type: String, required: true },
  item_price: {
    single: { type: Number, required: false },
    combo: { type: Number, required: false },
  },
   item_category: { type: String, required: true },
  item_img_url: {type:String, required: false}
});

// Create the model for menu items
const Menu_items = mongoose.model("MenuItem", menuItemsSchema);

export default Menu_items;
