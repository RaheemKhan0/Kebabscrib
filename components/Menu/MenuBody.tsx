"use client";
import { useEffect, useState } from "react";
import MenuList from "./MenuList";

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
    Sides: true,
    Drinks: true,
  });
  useEffect(()=> {
    console.log("New State : " , checkedItems);

  }, [checkedItems])

  // Handle checkbox changes with the correct type
  const handleCheckboxChange = (item: keyof CheckedItems) => {
  const isOnlyThisSelected =
    Object.entries(checkedItems).filter(([_, value]) => value).length === 1 &&
    checkedItems[item];

  if (isOnlyThisSelected) {
    // Reset to show all
    setCheckedItems({
      Sandwiches: true,
      Sides: true,
      Drinks: true,
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
    <div className="flex flex-col items-center">
      {/* Nav Bar */}
      <nav className="flex justify-center items-center gap-4 px-6 py-2 mt-6 mb-4">
        {(
          ["Sandwiches", "Sides", "Drinks"] as (keyof CheckedItems)[]
        ).map((category) => (
          <button
            key={category}
            onClick={() => handleCheckboxChange(category)}
            className={`px-10 py-1 rounded-md font-medium text-[#390F00] transition-all duration-200  
        ${
          checkedItems[category]
            ? "bg-[#F4CF4B]  shadow"
            : ""
        }`}
          >
            {category}
          </button>
        ))}
      </nav>
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
