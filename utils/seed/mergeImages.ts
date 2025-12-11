import { readFileSync, writeFileSync } from "fs";
import path from "path";

const baseDir = __dirname;
const itemsPath = path.join(baseDir, "restaurant_items.json");
const linksPath = path.join(baseDir, "cloudinary-image-urls.json");
const outputPath = path.join(baseDir, "restaurant_items_with_images.json");

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const items = JSON.parse(readFileSync(itemsPath, "utf8")) as Array<Record<string, any>>;
const links = JSON.parse(readFileSync(linksPath, "utf8")) as string[];

const linkMap = new Map<string, string>();
for (const url of links) {
  const lastSegment = url.split("/").pop();
  if (!lastSegment) continue;
  const parts = lastSegment.split("_").slice(0, -1);
  if (!parts.length) continue;
  const joined = parts.join(" ");
  const filename = path.parse(joined).name;
  if (!filename) continue;
  linkMap.set(normalize(filename), url);
}

const enriched = items.map((item) => {
  const key = normalize(item.item_name ?? "");
  const matchedUrl = linkMap.get(key);
  return matchedUrl ? { ...item, item_img_url: matchedUrl } : item;
});

writeFileSync(outputPath, JSON.stringify(enriched, null, 2));
console.log(`Wrote ${enriched.length} items to ${outputPath}`);
