import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../public/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../utils/context/AuthContext";
import { CartProvider } from "../utils/context/ShoppingCartContext";
import "../public/styles/globals.css";
import { MenuProvider } from "../utils/context/MenuContext";
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
      <body className="grid grid-rows-[auto,1fr,auto] min-h-screen">
        <AuthProvider>
          <MenuProvider>
            <CartProvider>
              <Toaster />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </CartProvider>
          </MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
