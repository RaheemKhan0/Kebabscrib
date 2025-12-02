import {
  Schema,
  model,
  models,
  Document,
} from "mongoose";
import slugify from "slugify";

export interface MenuItemPrice {
  single?: number;
  meal?: number;
}

export interface MenuItemSize {
  medium?: boolean;
  large?: boolean;
}

export interface MenuItemDocument extends Document {
  item_name: string;
  item_description?: string;
  item_price: MenuItemPrice;
  item_category: string;
  size: MenuItemSize;
  item_img_url?: string;
  slug: string;
  isHidden: boolean;
}

const menuItemsSchema = new Schema<MenuItemDocument>({
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
  },
  item_img_url: { type: String, required: false },
  slug: { type: String, unique: true, required: true },
  isHidden: { type: Boolean, required: true },
});

menuItemsSchema.pre("save", function (this: MenuItemDocument, next) {
  if (!this.slug) {
    this.slug = slugify(this.item_name, { lower: true, strict: true });
  }
  next();
});

const MenuItem =
  models.MenuItem || model<MenuItemDocument>("MenuItem", menuItemsSchema);
export default MenuItem;
