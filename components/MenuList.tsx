"use client";
import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import axios from "axios";
import { normalize } from "path";

export interface menuItem {
  _id: string;
  item_name: string;
  item_description: string;
  item_price: {
    single: number;
    combo?: number;
  };
  item_category: string;
  size?: string;
  sauces?: string[];
  slug: string;
  item_img_url?: string;
}

interface MenuListProps {
  item_category: string;
}

const MenuList: React.FC<MenuListProps> = ({ item_category }) => {
  const [menuItems, setMenuItems] = useState<menuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const storedItems = localStorage.getItem("MenuItems");
        if (!storedItems) {
          const res = await fetch("/api/fetchmenuitems", { cache: "no-store" });
          const data: menuItem[] = await res.json();
          console.log(res.json);
          localStorage.setItem("MenuItems", JSON.stringify(data));
          console.log("MenuItems : ", data);
          setMenuItems(data);
          setLoading(false);
        } else {
          setMenuItems(JSON.parse(localStorage.getItem("MenuItems")));
          setLoading(false);
        }
      } catch {
        console.error("Failed to fetch menu items (MenuList.tsx):");
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  // If menu items are still loading
  if (loading) {
    return <p className="text-center mt-10">Loading menu items...</p>;
  }

  // Render menu items based on the selected category
  return (
    <div className="container mx-auto mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
      {menuItems
        .filter((item) => item.item_category === item_category)
        .map((item) => {
          return <MenuItem key={item._id} {...item} />;
        })}
    </div>
  );
};

export default MenuList;

/*  {...item} – Spread Operator
This part is crucial but can be confusing at first. Let's break it down:

tsx
Copy code
{...item}
This is called props spreading.
It takes all the properties of the item object and passes them as props to the MenuItem component.
If item looks like this:
ts
Copy code
const item = {
item_name: "Kebab",
item_description: "Delicious grilled kebab",
item_price: { single: 10, combo: 15 },
item_category: "Wraps",
};
The spread operator will translate to:
tsx
Copy code
<MenuItem
item_name="Kebab"
item_description="Delicious grilled kebab"
item_price={{ single: 10, combo: 15 }}
item_category="Wraps"
/>
This means every property in the object is passed directly as a prop to the MenuItem component.
It reduces the need to manually write each prop like this:
tsx
Copy code
<MenuItem
item_name={item.item_name}
item_description={item.item_description}
item_price={item.item_price}
item_category={item.item_category}
/>
Less boilerplate, more efficient.
*/
