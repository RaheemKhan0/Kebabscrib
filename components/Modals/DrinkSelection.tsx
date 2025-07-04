"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "@components/Menu/MenuList";
import { useMenu } from "@utils/context/MenuContext";
import Image from "next/image";

interface DrinkSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedDrink: Menu) => void;
}

const DrinkSelectionModal: React.FC<DrinkSelectionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { menu } = useMenu();
  const drinks = menu.filter((item) =>
    ["Soft Drinks", "Drinks"].includes(item.item_category)
  );
  const specialdrinks = menu.filter(
    (item) => item.item_category === "Special Drinks"
  );
  const [selectedDrink, setSelectedDrink] = useState<Menu | null>(null);

  useEffect(() => {
    console.log("Selected Drink : ", selectedDrink);
  }, [selectedDrink]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full max-h-[90%] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-800">
          Choose Your Drink
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {drinks
            .filter((item) => !item.isHidden)
            .map((drink) => (
              <button
                key={drink._id}
                onClick={() => setSelectedDrink(drink)}
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                  selectedDrink?._id === drink._id
                    ? "border-KebabGreen bg-KebabGreen/10"
                    : "border-gray-300"
                } hover:border-KebabGreen`}
              >
                <div className="relative w-20 h-20 mb-2">
                  {drink.item_img_url ? (
                    <Image
                      src={drink.item_img_url.replace(
                        "/upload",
                        "/upload/c_fill,g_auto,w_250,h_250,q_auto,f_auto"
                      )}
                      alt={drink.item_name}
                      fill
                      className="object-contain rounded-md"
                    />
                  ) : (
                    <p>Image not available</p>
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {drink.item_name}
                </span>
              </button>
            ))}
        </div>

        <h2 className="text-2xl font-semibold my-6 text-center text-green-800">
          Special Drinks (5 AED Extra)
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {specialdrinks
            .filter((item) => !item.isHidden)
            .map((drink) => (
              <button
                key={drink._id}
                onClick={() => setSelectedDrink(drink)}
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                  selectedDrink?._id === drink._id
                    ? "border-KebabGreen bg-KebabGreen/10"
                    : "border-gray-300"
                } hover:border-KebabGreen`}
              >
                <div className="relative w-20 h-20 mb-2">
                  {drink.item_img_url ? (
                    <Image
                      src={drink.item_img_url.replace(
                        "/upload",
                        "/upload/c_fill,g_auto,w_250,h_250,q_auto,f_auto"
                      )}
                      alt={drink.item_name}
                      fill
                      className="object-contain rounded-md"
                    />
                  ) : (
                    <p>Image not available</p>
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {drink.item_name}
                </span>
              </button>
            ))}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-md text-sm font-medium text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => selectedDrink && onSubmit(selectedDrink)}
            className={`px-6 py-2 rounded-md text-sm font-semibold ${
              selectedDrink
                ? "bg-KebabGreen hover:bg-KebabGold text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectedDrink}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrinkSelectionModal;

