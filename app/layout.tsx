import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../public/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../utils/context/AuthContext";

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
      <body>
        <AuthProvider>
          <Toaster />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
