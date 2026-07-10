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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"),
  ),
  title: "Kebab's Crib | Kebabs, French Tacos & Baguettes in Dubai Marina",
  description: "Halal French-style kebabs, French tacos, cheesy baguettes & loaded sandwiches in Dubai Marina. Dine in or order delivery. Open till late.",
  icons: {
    icon: {
      url: "/assets/Logo.png",
      type: "image/png",
      sizes: "any",
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${parkinsans.variable} ${playfair.variable}`}>
      <body
        className={`${parkinsans.className} bg-EggShell min-h-screen`}
      >
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
