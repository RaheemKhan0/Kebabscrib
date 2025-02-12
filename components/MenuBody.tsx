"use client";
import { useState } from "react";
import MenuList from "./MenuList";

// Define the type for the state object with correct keys
type CheckedItems = {
  Burger: boolean;
  Pizzas: boolean;
  Sandwich: boolean;
  Sauces: boolean;
  extras: boolean;
};

// Component
const MenuBody: React.FC = () => {
  // Initialize state with correct keys
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    Burger: true,
    Pizzas: true,
    Sandwich: true,
    Sauces: true,
    extras: true,
  });

  // Handle checkbox changes with the correct type
  const handleCheckboxChange = (item: keyof CheckedItems) => {
    setCheckedItems((prev: CheckedItems) => ({
      ...prev,
      [item]: !prev[item], // Toggle the checkbox value
    }));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Nav Bar */}
      <nav className="bg-KebabGreen text-KebabGold p-2 w-1/2 mt-2 mx-auto mt-5 rounded-full sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-center space-x-10 items-center">
          {/* Burger Checkbox */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="Burger"
              className={`cursor-pointer ${checkedItems.Burger ? "text-KebabGold" : "hover:text-yellow-400"
                }`}
            >
              Burger
            </label>
            <input
              type="checkbox"
              id="Burger"
              checked={checkedItems.Burger}
              onChange={() => handleCheckboxChange("Burger")}
            />
          </div>

          {/* Pizzas Checkbox */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="Pizzas"
              className={`cursor-pointer ${checkedItems.Pizzas ? "text-KebabGold" : "hover:text-yellow-400"
                }`}
            >
              Pizzas
            </label>
            <input
              type="checkbox"
              id="Pizzas"
              checked={checkedItems.Pizzas}
              onChange={() => handleCheckboxChange("Pizzas")}
            />
          </div>

          {/* Sandwich Checkbox */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="Sandwich"
              className={`cursor-pointer ${checkedItems.Sandwich
                ? "text-yellow-400"
                : "hover:text-yellow-400"
                }`}
            >
              Sandwich
            </label>
            <input
              type="checkbox"
              id="Sandwich"
              checked={checkedItems.Sandwich}
              onChange={() => handleCheckboxChange("Sandwich")}
            />
          </div>

          {/* Sauces Checkbox */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="Sauces"
              className={`cursor-pointer ${checkedItems.Sauces ? "text-yellow-400" : "hover:text-yellow-400"
                }`}
            >
              Sauces
            </label>
            <input
              type="checkbox"
              id="Sauces"
              checked={checkedItems.Sauces}
              onChange={() => handleCheckboxChange("Sauces")}
            />
          </div>

          {/* Extras Checkbox */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="extras"
              className={`cursor-pointer ${checkedItems.extras ? "text-KebabGold" : "hover:text-yellow-400"
                }`}
            >
              Extras
            </label>
            <input
              type="checkbox"
              id="extras"
              checked={checkedItems.extras}
              onChange={() => handleCheckboxChange("extras")}
            />
          </div>
        </div>
      </nav>

      {/* Conditional Divs Based on Checkboxes */}
      <div className="mt-10 space-y-6 w-full mx-auto">
        {checkedItems.Burger && (
          <div className="p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold">Burger Section</h2>
            <MenuList item_category="Burger" />
          </div>
        )}

        {checkedItems.Pizzas && (
          <div className="p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold">Pizzas Section</h2>
            <MenuList item_category="Pizza" />
          </div>
        )}

        {checkedItems.Sandwich && (
          <div className="p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold">Sandwich Section</h2>
            <MenuList item_category="Sandwich" />
          </div>
        )}

        {checkedItems.Sauces && (
          <div className="p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold">Sauces Section</h2>
            <MenuList item_category="Sauce" />
          </div>
        )}

        {checkedItems.extras && (
          <div className="p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold">Extras Section</h2>
            <MenuList item_category="Extra" />        
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBody;

