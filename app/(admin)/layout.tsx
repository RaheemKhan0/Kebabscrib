import "@public/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { MenuProvider } from "@utils/context/MenuContext";
import SideBar from "@components/Admin/SideBar";
import { OrdersProvider } from "@utils/context/OrderContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebabscrib Admin",
  icons: {
    icon: {
      url: "/assets/KC_Logo_Logomark_green.svg",
      type: "image/svg+xml",
      sizes: "any",
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-EggShell">
        <div className="flex">
          <MenuProvider>
            <OrdersProvider>
              <Toaster />
                <SideBar />
                <main className="flex-1 p-6">{children}</main>

            </OrdersProvider>
          </MenuProvider>
        </div>
      </body>
    </html>
  );
}
