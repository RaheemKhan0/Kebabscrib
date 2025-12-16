"use client";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import MenuList from "./MenuList";
import { useRouter } from "next/navigation";

// Define the type for the state object with correct keys
type CheckedItems = {
  Sandwiches: boolean;
  Sides: boolean;
  Drinks: boolean;
};

// Component
const MenuBody: React.FC = () => {
  // Initialize state with correct keys
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    Sandwiches: true,
    Sides: false,
    Drinks: false,
  });
  const router = useRouter();

  // Handle checkbox changes with the correct type
  const handleCheckboxChange = (item: keyof CheckedItems) => {
    const isOnlyThisSelected =
      Object.entries(checkedItems).filter(([_, value]) => value).length === 1 &&
      checkedItems[item];

    if (isOnlyThisSelected) {
      // Reset to show all
      setCheckedItems({
        Sandwiches: true,
        Sides: false,
        Drinks: false,
      });
    } else {
      // Show only the selected one
      const newState: CheckedItems = {
        Sandwiches: false,
        Sides: false,
        Drinks: false,
      };
      newState[item] = true;
      setCheckedItems(newState);
    }
  };
  // bg-[#006244]
  return (
    <div className="flex flex-col items-center mt-24 px-4 sm:px-8 lg:px-20 w-full max-w-screen-xl mx-auto">
      {/* Nav Bar */}
      <nav className="hidden sm:flex justify-center items-center gap-4 px-6 py-2 mt-6 mb-4">
        {(["Sandwiches", "Sides", "Drinks"] as (keyof CheckedItems)[]).map(
          (category) => (
            <button
              key={category}
              onClick={() => handleCheckboxChange(category)}
              className={`px-10 py-1 rounded-md font-medium text-[#390F00] transition-all duration-200  
        ${checkedItems[category] ? "bg-[#F4CF4B]  shadow" : ""}`}
            >
              {category}
            </button>
          ),
        )}
        <button
          className="hidden sm:flex items-center px-4 py-2 rounded-full border border-[#006244] bg-[#F4CF4B] text-[#006244] font-semibold text-md shadow hover:shadow-md transition"
          onClick={() => router.push("/customtaco")}
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Make Taco
        </button>
      </nav>
      {/* Mobile dropdown nav */}
      <div className="flex sm:hidden justify-center mt-4 rounded-md">
        <select
          onChange={(e) =>
            handleCheckboxChange(e.target.value as keyof CheckedItems)
          }
          className="p-2 rounded-md bg-KC_Yellow border text-sm text-[#390F00]"
        >
          <option value="Sandwiches">Sandwiches</option>
          <option value="Sides">Sides</option>
          <option value="Drinks">Drinks</option>
        </select>
      </div>
      {/* Conditional Divs Based on Checkboxes */}
      <div className="mt-10 space-y-6 w-full mx-auto">
        {checkedItems.Sandwiches && (
          <div className="p-4 ">
            <MenuList item_category="Des Sandwiches" />
          </div>
        )}

        {checkedItems.Sides && (
          <div className="p-4">
            <MenuList item_category="Sides" />
          </div>
        )}
        {checkedItems.Drinks && (
          <div className="p-4">
            <MenuList item_category="Soft Drinks"></MenuList>
            <MenuList item_category="Drinks"></MenuList>
            <MenuList item_category="Special Drinks"></MenuList>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBody;
