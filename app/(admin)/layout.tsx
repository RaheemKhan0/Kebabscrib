import SessionWrapper from "@components/Auth/SessionWrapper";
import "@public/styles/globals.css";
import { Toaster } from "react-hot-toast";
import SideBar from "@components/Admin/SideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-EggShell">
        <div className="flex">
         <SideBar /> 
          <main className="flex-1 p-6 bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  );
}
