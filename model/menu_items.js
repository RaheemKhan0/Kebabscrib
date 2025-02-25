import mongoose, { Schema, models } from "mongoose";
import slugify from "slugify"; // To generate SEO-friendly slugs

const menuItemsSchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  item_description: { type: String, required: false },
  item_price: {
    single: { type: Number, required: false },
    meal: { type: Number, required: false },
  },
  item_category: { type: String, required: true },
  size: {
    medium: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
  }, // Optional for items like tacos
  sauces: { type: [String], required: false }, // Optional for tacos
  item_img_url: { type: String, required: false },
  slug: { type: String, unique: true, required: true }, // ✅ SEO-friendly URL
});
// **Middleware to Generate Slug Before Saving**
menuItemsSchema.pre("save", function(next) {
  if (!this.slug) {
    this.slug = slugify(this.item_name, { lower: true, strict: true });
  }
  next();
});

const MenuItem = models.MenuItem || mongoose.model("MenuItem", menuItemsSchema);
export default MenuItem;
