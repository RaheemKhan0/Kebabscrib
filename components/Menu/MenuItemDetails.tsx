"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "./MenuList";
import { useMenu } from "@utils/context/MenuContext";
import { CartItem, useCart } from "@utils/context/ShoppingCartContext";
import LoadingScreen from "../Common/LoadingScreen";

interface MenuItemDetailsProps {
  item_id: string;
}

const MenuItemDetails: React.FC<MenuItemDetailsProps> = ({ item_id }) => {
  const menu = useMenu();
  const defaultMenuItem: CartItem = {
    _id: "default_id",
    cart_id: "default_cart_id",
    item_name: "Loading...",
    item_description: "Fetching item details...",
    item_price: { single: 0, meal: undefined },
    item_category: "Uncategorized",
    extra_Sauces: [],
    extra_Vegetables: [],
    extra_Cheese: [],
    meal: false,
    size: "Regular",
    item_img_url: "/public/assets/placeholder.png", // Use a placeholder image
    Quantity: 1,
  };

  const [menuItem, setMenuItem] = useState<CartItem>(defaultMenuItem);

  const { addItem, generate_Cart_ID } = useCart();

  const [meal, setMeal] = useState(false);
  const [extraSauce, SetExtraSauces] = useState<Menu[]>([]);
  const [extraCheese, setExtraCheese] = useState<Menu[]>([]);
  const [extraVeggies, setExtraVeggies] = useState<Menu[]>([]);

  const HandleExtraSauce = (item: any) => {
    SetExtraSauces((prev) => {
      const updatedSauces = prev.some((sauce) => sauce._id === item._id)
        ? prev.filter((items) => items._id !== item._id) // Remove if already selected
        : prev.length >= 3
          ? [...prev.slice(1), item] //  Remove first if max 3 reached
          : [...prev, item]; // Add if not exists

      setMenuItem((prevMenuItem) => ({
        ...prevMenuItem, //  Ensure `prevMenuItem` exists and right now using a just temporary fix which makes the typescript think that the prevMenuItem is not null which in production grade application may led to the app crashing since the preMenuItem is null
        extra_Sauces: updatedSauces.map((sauce) => {
          return {
            _id: sauce._id, // Correctly returning an object
            item_name: sauce.item_name,
            item_category: sauce.item_category,
          };
        }),
      }));

      return updatedSauces;
    });
  };
  const HandleExtraCheese = (item: any) => {
    setExtraCheese((prev) => {
      const updatedCheese = prev.some((cheese) => cheese._id === item._id)
        ? prev.filter((cheese) => cheese._id !== item._id)
        : prev.length >= 3
          ? [...prev.slice(1), item]
          : [...prev, item];

      setMenuItem((prevMenuItem) => ({
        ...prevMenuItem,
        extra_Cheese: updatedCheese.map((cheese) => {
          return {
            _id: cheese._id,
            item_name: cheese.item_name,
            item_category: cheese.item_category,
          };
        }),
      }));

      return updatedCheese;
    });
  };

  const HandleExtraVegetables = (item: any) => {
    setExtraVeggies((prev) => {
      const updatedVeggies = prev.some((veggie) => veggie._id === item._id)
        ? prev.filter((veggie) => veggie._id !== item._id)
        : prev.length >= 3
          ? [...prev.slice(1), item]
          : [...prev, item];

      setMenuItem((prevMenuItem) => ({
        ...prevMenuItem,
        extra_Vegetables: updatedVeggies.map((veggie) => {
          return {
            _id: veggie._id,
            item_name: veggie.item_name,
            item_category: veggie.item_category,
          };
        }),
      }));

      return updatedVeggies;
    });
  };

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        console.log("Fetching menu item...");
        const res = await axios.get(`/api/fetchmenuitems/${item_id}`);
        const fetchedItem = res.data.menu_item;

        setMenuItem((prevMenuItem) => ({
          ...(fetchedItem ?? prevMenuItem),
          cart_id: generate_Cart_ID(fetchedItem) ?? "default_cart_id",
        }));
      } catch (error) {
        console.log("Failed to fetch menu item details:", error);
      }
    };

    if (menuItem._id === "default_id") {
      fetchMenuItem();
    } else {
      setMenuItem((prevMenuItem) => ({
        ...prevMenuItem,
        cart_id: generate_Cart_ID(prevMenuItem) ?? "default_cart_id",
        meal: meal,
      }));
    }
  }, [item_id, extraSauce, extraCheese, extraVeggies, meal]);

  if (menuItem.item_name == "Loading...") {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center max-w-full mx-auto mt-16 px-6">
      {/* Image Section */}
      <div className="md:w-1/2 flex items-center justify-center">
        <Image
          src={"/assets/placeholder.png"}
          width={500}
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
                ${!meal ? "bg-KebabGold text-white border-KebabGold" : "bg-white text-black border-black"}`}
              onClick={() => setMeal(false)}
            >
              {menuItem.item_price.single}{" "}
              <span className="font-bold">Single</span>
            </button>

            <button
              className={`text-lg mt-2 border-2 rounded-full p-3 mr-8 transition-all duration-200
                ${meal ? "bg-KebabGold text-white border-KebabGold" : "bg-white text-black border-black"}`}
              onClick={() => setMeal(true)}
            >
              {menuItem.item_price.meal} <span className="font-bold">Meal</span>
            </button>

            {/* Extra Sauce Selection */}
            <div>
              <h3 className="text-xl font-bold mt-4 mb-4">
                Extra Sauces (Upto 3)
              </h3>
              {menu
                ?.filter((item) => item.item_category === "Sauce")
                .map((item) => (
                  <button
                    key={item._id}
                    onClick={() => HandleExtraSauce(item)}
                    className={`text-lg mt-2 border-2 rounded-full p-3 mr-8 transition-all duration-200
                ${extraSauce.some((sauce) => item._id === sauce._id) ? "bg-KebabGold text-white border-KebabGold" : "bg-white text-black border-black"}`}
                  >
                    {item.item_name}
                  </button>
                ))}
            </div>

            {/* Extra Cheese Selection */}
            <div>
              <h3 className="font-bold text-xl mt-5 mb-5">
                Extra Cheese (Upto 3)
              </h3>
              {menu
                ?.filter((item) => item.item_category === "Cheese & Others")
                .map((item) => (
                  <button
                    key={item._id}
                    onClick={() => HandleExtraCheese(item)}
                    className={`text-lg mt-2 border-2 rounded-full p-3 mr-8 transition-all duration-200
                ${extraCheese.some((sauce) => item._id === sauce._id) ? "bg-KebabGold text-white border-KebabGold" : "bg-white text-black border-black"}`}
                  >
                    {item.item_name}
                  </button>
                ))}
            </div>
            <div>
              <h3 className="font-bold text-xl mt-5 mb-5">
                Extra Veggies (Upto 3)
              </h3>
              {menu
                ?.filter((item) => item.item_category === "Vegetables & Others")
                .map((item) => (
                  <button
                    key={item._id}
                    onClick={() => HandleExtraVegetables(item)}
                    className={`text-lg mt-2 border-2 rounded-full p-3 mr-8 transition-all duration-200
                ${extraVeggies.some((sauce) => item._id === sauce._id) ? "bg-KebabGold text-white border-KebabGold" : "bg-white text-black border-black"}`}
                  >
                    {item.item_name}
                  </button>
                ))}
            </div>
          </>
        ) : null}

        <button
          className="bg-KebabGreen hover:bg-KebabGold text-white font-bold py-2 px-6 mt-6 rounded-lg shadow-md mb-10"
          onClick={() => {
            addItem(menuItem);
          }}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default MenuItemDetails;
