import type { ReactNode } from "react";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import "@public/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@utils/context/ShoppingCartContext";
import { MenuProvider } from "@utils/context/MenuContext";
import SessionWrapper from "@components/Auth/SessionWrapper";
import { Parkinsans, Playfair_Display } from "next/font/google";
import { Metadata } from "next";

const parkinsans = Parkinsans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-parkinsans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
});

const ogImage =
  "https://res.cloudinary.com/dpqto9jrm/image/upload/w_1200,h_630,c_fill,q_auto,f_jpg/v1776668487/Cover_Photo_g0cch4.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"),
  ),
  title: "Kebab's Crib | Kebabs, French Tacos & Baguettes in Dubai Marina",
  description:
    "Halal French-style kebabs, French tacos, cheesy baguettes & loaded sandwiches in Dubai Marina. Dine in or order delivery. Open till late.",
  openGraph: {
    title: "Kebab's Crib | Kebabs, French Tacos & Baguettes in Dubai Marina",
    description:
      "Halal French-style kebabs, French tacos & loaded sandwiches in Dubai Marina. Dine in or order delivery. Open till late.",
    url: "https://www.kebabscrib.ae",
    siteName: "Kebab's Crib",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Kebab's Crib — French kebabs and tacos in Dubai Marina",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kebab's Crib | Kebabs, French Tacos & Baguettes in Dubai Marina",
    description:
      "Halal French-style kebabs, French tacos & loaded sandwiches in Dubai Marina. Open till late.",
    images: [ogImage],
  },
  icons: {
    icon: {
      url: "/assets/Logo.PNG",
      type: "image/png",
      sizes: "any",
    },
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Kebab's Crib",
  image: ogImage,
  url: "https://www.kebabscrib.ae",
  telephone: "+97144318050",
  priceRange: "$$",
  servesCuisine: ["French", "Kebab", "Halal", "Fast Food", "Sandwiches"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop 1, Marina View Tower A",
    addressLocality: "Dubai Marina",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.078995719277618,
    longitude: 55.14247747540711,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "11:30",
      closes: "04:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "11:30",
      closes: "04:45",
    },
  ],
  menu: "https://www.kebabscrib.ae/menu",
  acceptsReservations: "False",
  sameAs: [
    "https://www.instagram.com/kebabscrib",
    "https://www.facebook.com/Kebabscrib",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${parkinsans.variable} ${playfair.variable}`}>
      <body
        className={`${parkinsans.className} bg-EggShell min-h-screen`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <SessionWrapper>
          <MenuProvider>
            <CartProvider>
              <Toaster />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </MenuProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
