"use client";
import MenuItemDetails from "@components/Menu/MenuItemDetails";
import { useParams } from "next/navigation";

export const dynamic = "force-dynamic";

const MenuItemPage = () => {
  const params = useParams<{ item_id: string }>();
  const itemId = params?.item_id;

  if (!itemId) {
    return null;
  }

  return <MenuItemDetails item_id={itemId} />;
};

export default MenuItemPage;
