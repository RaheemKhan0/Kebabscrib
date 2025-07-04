"use client";
import React, { useState } from "react";
import { Menu } from "@components/Menu/MenuList";
import { useMenu } from "@utils/context/MenuContext";
import Image from "next/image";

interface SauceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedSauce: Menu | null) => void;
}

const SauceSelectionModal: React.FC<SauceSelectionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { menu } = useMenu();
  const sauces = menu.filter((item) => item.item_category === "Sauce");
  const [selectedSauce, setSelectedSauce] = useState<Menu | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md max-h-[90%] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-800">
          Choose Your Meal Sauce
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {sauces.map((sauce) => (
            <button
              key={sauce._id}
              onClick={() => setSelectedSauce(sauce)}
              className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                selectedSauce?._id === sauce._id
                  ? "border-KebabGreen bg-KebabGreen/10"
                  : "border-gray-300"
              } hover:border-KebabGreen`}
            >
              <div className="relative w-20 h-20 mb-2">
                {sauce.item_img_url ? (
                  <Image
                    src={
                      sauce.item_img_url?.replace(
                        "/upload",
                        "/upload/c_fill,g_auto,w_250,h_250,q_auto,f_auto"
                      ) ?? "/assets/placeholder.png"
                    }
                    alt={sauce.item_name}
                    fill
                    className="object-contain rounded-md"
                  />
                ) : (
                  <p>Image not available</p>
                )}
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {sauce.item_name}
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
            onClick={() => onSubmit(selectedSauce)}
            className="bg-KebabGreen hover:bg-KebabGold text-white px-6 py-2 transition-all rounded-md text-sm font-semibold"
            disabled={!selectedSauce}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SauceSelectionModal;

