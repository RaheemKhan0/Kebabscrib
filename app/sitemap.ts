import type { MetadataRoute } from "next";
import connectMongodb from "@lib/mongodb";
import MenuItem from "@model/menu_items";

const BASE_URL = "https://www.kebabscrib.ae";

/* Regenerate sitemap every hour. Google checks sitemaps periodically,
   so daily is plenty — hourly gives flexibility without much cost. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/menu`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contactus`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/delivery`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/directions`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  /* Fetch all visible menu items from MongoDB.
     If the DB is unreachable at build/revalidation, fall back to static URLs only. */
  let itemUrls: MetadataRoute.Sitemap = [];
  try {
    await connectMongodb();
    const items = (await MenuItem.find({ isHidden: false })
      .select("slug")
      .lean()) as unknown as Array<{ slug: string }>;

    itemUrls = items.map((item) => ({
      url: `${BASE_URL}/menu/${item.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));
  } catch (err) {
    console.error("Sitemap: failed to fetch menu items:", err);
  }

  return [...staticUrls, ...itemUrls];
}
