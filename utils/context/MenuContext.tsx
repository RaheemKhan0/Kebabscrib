"use client";
import { createContext, useEffect, useContext, useState } from "react";
import { Menu } from "@components/Menu/MenuList";
import axios from "axios";
import toast from "react-hot-toast";
import useSWR from "swr";
import { fetcher } from "@utils/middleware/helpers";

interface MenuContext {
  menu: Menu[];
  hideItem: (id: string) => Promise<any>;
  deleteItem: (id: string) => Promise<void>;
  isLoading: boolean;
  mutate: () => void;
}

const MenuContext = createContext<MenuContext | null>(null);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: menu = [],
    isLoading,
    mutate,
  } = useSWR<Menu[] | []>("/api/fetchmenuitems", fetcher);
  
  const deleteItem = async (id: string) => {
    try {
      const res = await axios.post("/api/admin/deleteitem", { id });
      if (res.status === 200) {
        mutate();
        toast.success(res.data?.deletedItem?.item_name + " deleted successfully");
      }
    } catch (error) {
      throw error
    }
  };
  const hideItem = async (id: string) => {
    try {
      const res = await axios.patch("/api/admin/hideitem", { id });
      console.log("res : ", res);
      if (res.data.status === 200) {
        mutate();
      }
      const targetitem = menu.find((item) => item._id == id);
      if (targetitem && !targetitem?.isHidden) {
        toast.success(targetitem.item_name + " hidden successfully");
      }else{
        toast.success(targetitem?.item_name + " is visible");
      }
    } catch (error) {
      toast.error(
        "There was an error while trying to alter the items visibility",
      );
      throw error;
    }
  };
  // Separate `useEffect` to update localStorage only when `menu` is not empty
  useEffect(() => {
    if (menu.length > 0) {
      // Prevent storing empty array
      localStorage.setItem("MenuItems", JSON.stringify(menu));
    }
  }, [menu]);

  return (
    <MenuContext.Provider
      value={{
        menu: menu,
        hideItem: hideItem,
        deleteItem: deleteItem,
        isLoading: isLoading,
        mutate: mutate,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === null) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
