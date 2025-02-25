"use client";
import MenuItemDetails from "../../../components/MenuItemDetails";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  return <MenuItemDetails item_id={params.item_id} />;
};

export default page;
