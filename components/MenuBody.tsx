"use client";
import { useState } from "react";
import MenuList from "./MenuList";
import axios from "axios";

// Define the type for the state object with correct keys
type CheckedItems = {
  Sandwiches: boolean;
  Sides: boolean;
  Sauces: boolean;
};

// Component
const MenuBody: React.FC = () => {
  // Initialize state with correct keys
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    Sandwiches: true,
    Sides: true,
    Sauces: true,
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
      <nav className="bg-KebabGreen text-KebabGold p-2 w-1/2 mx-auto mt-5 rounded-full sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-center space-x-10 items-center">
          {/* Sandwich Checkbox */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="Sandwich"
              className={`cursor-pointer ${checkedItems.Sandwiches
                  ? "text-yellow-400"
                  : "hover:text-yellow-400"
                }`}
            >
              Sandwich
            </label>
            <input
              type="checkbox"
              id="Sandwich"
              checked={checkedItems.Sandwiches}
              onChange={() => handleCheckboxChange("Sandwiches")}
            />
          </div>

          {/* Sides Checkbox */}
          <div className="flex items-center space-x-2">
            <label
              htmlFor="extras"
              className={`cursor-pointer ${checkedItems.Sides ? "text-yellow-400" : "hover:text-yellow-400"
                }`}
            >
              Sides
            </label>
            <input
              type="checkbox"
              id="extras"
              checked={checkedItems.Sides}
              onChange={() => handleCheckboxChange("Sides")}
            />
          </div>
        </div>
      </nav>

      {/* Conditional Divs Based on Checkboxes */}
      <div className="mt-10 space-y-6 w-full mx-auto">
        {checkedItems.Sandwiches && (
          <div className="p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold">Des Sandwiches</h2>
            <MenuList item_category="Des Sandwiches" />
          </div>
        )}

        {checkedItems.Sides && (
          <div className="p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold">Sides Section</h2>
            <MenuList item_category="Sides" />
          </div>
        )}

     
      </div>
    </div>
  );
};

export default MenuBody;
