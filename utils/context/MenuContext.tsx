"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { Menu } from "@components/Menu/MenuList";

const MenuContext = createContext<Menu[] | null>(null);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [menu, setMenu] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const storedItems = localStorage.getItem("MenuItems");

      if (storedItems) {
        setMenu(JSON.parse(storedItems));
      } else {
        try {
          const res = await fetch("/api/fetchmenuitems", { cache: "no-store" });
          const data: Menu[] = await res.json();
          setMenu(data);
          console.log("MenuItems Context: ", data);
        } catch (error) {
          console.error("Failed to fetch menu items (MenuContext.tsx):", error);
        }
      }
    };

    fetchMenuItems();
  }, []);

  // Separate `useEffect` to update localStorage only when `menu` is not empty
  useEffect(() => {
    if (menu.length > 0) {
      // Prevent storing empty array
      localStorage.setItem("MenuItems", JSON.stringify(menu));
    }
  }, [menu]);

  return <MenuContext.Provider value={menu}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === null) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
