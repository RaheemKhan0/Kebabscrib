"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import menuItem, { menuItem } from "./MenuList";

interface MenuItemDetailsProps {
  item_id: string;
}

const MenuItemDetails: React.FC<MenuItemDetailsProps> = ({ item_id }) => {
  const [menuItem, setMenuItem] = useState<any>(null);
  const [menu, setMenu] = useState(null);
  const [meal, setMeal] = useState({
    single: true,
    meal: false,
  });

  const [extraMeat, SetExtraMeat] = useState(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const res = await axios.get(`/api/fetchmenuitems/${item_id}`);
        const storedItems = localStorage.getItem("MenuItems");
        if (!storedItems) {
          const request = await axios.get("api/fetchmenuitems");
          setMenu(request.data);
          localStorage.setItem("MenuItems", JSON.stringify(request.data));
        } else {
          setMenu(JSON.parse(storedItems));
        }
        setMenuItem(res.data.menu_item);
      } catch (error) {
        console.log("Failed to fetch menu item details:", error);
      }
    };
    fetchMenuItem();
  }, [item_id]);

  if (!menuItem && !menu) {
    return <p className="text-center text-xl mt-10">Loading menu item...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center max-w-full mx-auto mt-16 px-6">
      {/* Image Section */}
      <div className="md:w-1/2 flex items-center justify-center">
        <Image
          src={"/assets/placeholder.png"}
          width={500} // Adjust width for better responsiveness
          height={500}
          alt={menuItem.item_name}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Text Content Section */}
      <div className="md:w-1/2 md:ml-10 text-center md:text-left">
        <h1 className="text-4xl font-bold mt-2 mb-5">{menuItem.item_name}</h1>

        {menuItem.item_category === "Des Sandwiches" ? (
          <>
            <button
              className={`text-lg mt-2 border-2 rounded-full p-3 mr-8 transition-all duration-200
          ${meal.single ? "bg-KebabGold text-white border-KebabGold" : "bg-white text-black border-black"}`}
              onClick={() => setMeal({ single: true, meal: false })}
            >
              {menuItem.item_price.single}{" "}
              <span className="font-bold">Single</span>
            </button>

            <button
              className={`text-lg mt-2 border-2 rounded-full p-3 mr-8 transition-all duration-200
          ${meal.meal ? "bg-KebabGold text-white border-KebabGold" : "bg-white text-black border-black"}`}
              onClick={() => setMeal({ single: false, meal: true })}
            >
              {menuItem.item_price.meal} <span className="font-bold">Meal</span>
            </button>

            {/* Extra Meat Selection */}
            <div>
              <h3>Extra Meat</h3>
              {menu
                .filter((item) => item.item_category === "Meat")
                .map((item) => (
                  <button key={item._id} className="text-lg mt-2 border-2 rounded-full p-3 mr-8 transition-all duration-200">{item.item_name}</button>
                ))}
            </div>

            <p className="text-gray-700 mt-4">{menuItem.item_description}</p>
          </>
        ) : (
          <>
            <p>Price: {menuItem.item_price.single} </p>
            <p className="text-gray-700 mt-4">{menuItem.item_description}</p>
          </>
        )}

        {/* Order Button */}
        <button className="bg-KebabGreen hover:bg-KebabGold text-white font-bold py-2 px-6 mt-6 rounded-lg shadow-md">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default MenuItemDetails;
