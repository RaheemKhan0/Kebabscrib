import SessionWrapper from "@components/Auth/SessionWrapper";
import { CartProvider } from "@utils/context/ShoppingCartContext";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Kebabscrib",
  description:
    "Kebabscrib is a french Restaurant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <CartProvider>
            <Toaster />
            {children}
          </CartProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
