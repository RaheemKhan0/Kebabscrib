import type { ReactNode } from "react";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import "@public/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@utils/context/ShoppingCartContext";
import { MenuProvider } from "@utils/context/MenuContext";
import SessionWrapper from "@components/Auth/SessionWrapper";
import { Parkinsans, Playfair_Display } from "next/font/google";

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

export const metadata = {
  title: "Kebabscrib",
  description: "Kebabscrib is a french Restaurant",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${parkinsans.variable} ${playfair.variable}`}
    >
      <body
        className={`${parkinsans.className} bg-EggShell grid grid-rows-[auto,1fr,auto] min-h-screen overflow-x-hidden`}
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
