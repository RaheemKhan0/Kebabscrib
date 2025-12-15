import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import slugify from "slugify";
import MenuItem from "@model/menu_items";
import connectMongodb from "@lib/mongodb";

interface SeedMenuItem {
  item_name: string;
  item_description?: string;
  item_price: {
    single: number;
    meal?: number;
  };
  item_category: string;
  size?: {
    medium?: boolean;
    large?: boolean;
  };
  item_img_url?: string;
  slug?: string;
  isHidden?: boolean;
}

const filename = fileURLToPath(import.meta.url);
const dir = path.dirname(filename);
const dataPath = path.join(dir, "restaurant_items.json");

const seedMenu = async () => {
  const json = readFileSync(dataPath, "utf8");
  const products: SeedMenuItem[] = JSON.parse(json);

  await connectMongodb();
  await MenuItem.deleteMany({});

  const slugCounts = new Map<string, number>();
  const docs = products.map((item) => {
    const baseSlug =
      item.slug ?? slugify(item.item_name, { lower: true, strict: true });
    const count = slugCounts.get(baseSlug) ?? 0;
    const slug = count === 0 ? baseSlug : `${baseSlug}-${count}`;
    slugCounts.set(baseSlug, count + 1);

    return {
      ...item,
      slug,
      isHidden: item.isHidden ?? false,
      size: item.size ?? { medium: false, large: false },
    };
  });

  await MenuItem.insertMany(docs);
  console.log(`Seeded ${docs.length} menu items.`);
};

seedMenu()
  .then(() => {
    console.log("Seed complete.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
