import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import "@public/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@utils/context/ShoppingCartContext";
import "@public/styles/globals.css";
import { MenuProvider } from "@utils/context/MenuContext";
import SessionWrapper from "@components/Auth/SessionWrapper";
export const metadata = {
  title: "Kebabscrib",
  description:
    "Kebabscrib is a food delivery service that delivers food to your doorstep.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
            <link href="https://fonts.googleapis.com/css2?family=Parkinsans:wght@457&display=swap" rel="stylesheet" />
            </head>
            <body className="bg-EggShell grid grid-rows-[auto,1fr,auto] min-h-screen">
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
