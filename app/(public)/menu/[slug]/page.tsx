import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import connectMongodb from "@lib/mongodb";
import MenuItem from "@model/menu_items";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kebabscrib.ae";

const DELIVERY_PLATFORMS = [
  {
    name: "Talabat",
    href: "https://www.talabat.com/uae/restaurant/612274/kebabs-crib?aid=1272",
  },
  { name: "Careem", href: "https://url.careem.com/uMo8iNUqyKMLA" },
  {
    name: "Deliveroo",
    href: "https://deliveroo.ae/menu/dubai/marina/kebabs-crib?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share",
  },
  { name: "Noon", href: "https://food.noon.com/uae-en/outlet/KBBSCR2LUQ/" },
  { name: "Keeta", href: "https://url-eu.mykeeta.com/JzHpPofz" },
];

const optimizeUrl = (url: string, width = 1600) =>
  url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`);

interface MenuItemData {
  _id: string;
  item_name: string;
  item_description?: string;
  item_price: { single?: number; meal?: number };
  item_category: string;
  item_img_url?: string;
  slug: string;
  isHidden: boolean;
}

async function getItem(slug: string): Promise<MenuItemData | null> {
  try {
    await connectMongodb();
    const item = await MenuItem.findOne({ slug, isHidden: false }).lean();
    if (!item) return null;
    return JSON.parse(JSON.stringify(item)) as MenuItemData;
  } catch (err) {
    console.error("Failed to fetch menu item:", err);
    return null;
  }
}

/* Pre-generate paths at build time for SEO + speed */
export async function generateStaticParams() {
  try {
    await connectMongodb();
    const items = (await MenuItem.find({ isHidden: false })
      .select("slug")
      .lean()) as unknown as Array<{ slug: string }>;
    return items.map((item) => ({ slug: item.slug }));
  } catch {
    return [];
  }
}

/* Per-item SEO metadata — title, description, OG image */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItem(slug);

  if (!item) {
    return { title: "Menu Item Not Found | Kebab's Crib" };
  }

  const title = `${item.item_name} | Kebab's Crib`;
  const description =
    item.item_description ??
    `Order ${item.item_name} from Kebab's Crib in Dubai Marina. Fast. Fresh. Fantastique.`;
  const image = item.item_img_url
    ? optimizeUrl(item.item_img_url, 1200)
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/menu/${item.slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/menu/${item.slug}`,
      type: "website",
      images: image ? [{ url: image, width: 1200, height: 800, alt: item.item_name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function MenuItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getItem(slug);
  if (!item) notFound();

  /* Schema.org structured data — Google can show rich results
     (price, image, brand) directly in search */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: item.item_name,
    description: item.item_description,
    image: item.item_img_url ? optimizeUrl(item.item_img_url, 1200) : undefined,
    offers: item.item_price.single
      ? {
          "@type": "Offer",
          price: item.item_price.single,
          priceCurrency: "AED",
          availability: "https://schema.org/InStock",
          url: `${BASE_URL}/menu/${item.slug}`,
        }
      : undefined,
    brand: {
      "@type": "Brand",
      name: "Kebab's Crib",
    },
  };

  return (
    <div className="bg-textured-eggshell min-h-screen">
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 pb-16">
        {/* Back to menu */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm font-medium text-KC_GREEN/60 hover:text-KC_GREEN transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to menu
        </Link>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-KC_GREEN/5">
            {item.item_img_url ? (
              <Image
                src={optimizeUrl(item.item_img_url, 1600)}
                alt={item.item_name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-KC_GREEN/10 text-9xl font-wildysans">KC</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-[0.3em] text-KC_GREEN/40 font-medium mb-3">
              {item.item_category}
            </p>
            <h1
              className="font-bold text-KC_GREEN font-wildysans leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {item.item_name}
            </h1>

            {item.item_description && (
              <p className="text-base sm:text-lg leading-relaxed text-KC_GREEN/65 font-parkinsans mb-8">
                {item.item_description}
              </p>
            )}

            {/* Order CTA */}
            <div className="mt-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-KC_GREEN/35 mb-4">
                Order via
              </p>
              <div className="flex flex-wrap gap-3">
                {DELIVERY_PLATFORMS.map((p) => (
                  <a
                    key={p.name}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-KC_GREEN/15 px-5 py-2 text-sm font-medium
                      text-KC_GREEN/70 transition-all duration-200
                      hover:bg-KC_GREEN hover:text-EggShell hover:border-KC_GREEN"
                  >
                    {p.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
