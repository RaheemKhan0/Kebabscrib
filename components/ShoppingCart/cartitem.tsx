import React from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Extras } from "../../utils/context/ShoppingCartContext";

interface CartItemProps {
  item_name: string;
  item_description: string;
  item_price: {
    single: number;
    meal?: number;
  };
  item_category: string;
  size?: string;
  extra_Sauces?: Extras[];
  extra_Vegetables?: Extras[];
  extra_Cheese?: Extras[];
  item_img_url?: string;
  quantity: number;
  meal: boolean;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  removeItem: () => void;
  getItemExtraTotal: () => number;
}

const CartItem: React.FC<CartItemProps> = ({
  item_name,
  item_description,
  item_price,
  item_category,
  size,
  extra_Sauces,
  extra_Cheese,
  extra_Vegetables,
  item_img_url,
  quantity,
  meal,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  getItemExtraTotal,
}) => {
  return (
    <div className="max-w-3xl mx-auto rounded-lg border border-gray-700 bg-gray-900 p-4 shadow-md flex items-center justify-between space-x-4 transition-all hover:shadow-lg">
      {/* Item Image */}
      <div className="shrink-0">
        {item_img_url ? (
          <img
            className="h-20 w-20 object-cover rounded-md"
            src={item_img_url}
            alt={item_name}
          />
        ) : (
          <div className="h-20 w-20 bg-gray-700 flex items-center justify-center text-gray-400 text-sm font-medium rounded-md">
            No Image
          </div>
        )}
      </div>

      {/* Item Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white">{item_name}</h3>
        <p className="text-sm text-gray-400">{item_description}</p>
        <p className="text-sm text-gray-500 capitalize mt-1">{item_category}</p>
        {/* Price Section - Show Based on `meal` Selection */}
        <div className="mt-2">
          <p className="text-base font-bold text-white">
            {meal && item_price?.meal ? (
              <>
                AED {item_price.meal}{" "}
                <span className="text-sm text-gray-400">(Meal)</span>
              </>
            ) : (
              <>
                AED {item_price.single}{" "}
                <span className="text-sm text-gray-400">(Single)</span>
              </>
            )}
          </p>
        </div>
      </div>
      {/* Extras Section */}
      <div className="flex flex-col text-sm text-gray-400 space-y-1">
        {/* Extra Sauces */}
        {extra_Sauces && extra_Sauces.length > 0 && (
          <p>
            <span className="text-gray-300 font-semibold">Extra Sauces:</span>{" "}
            {extra_Sauces.map((sauce) => sauce.item_name).join(", ")}
          </p>
        )}

        {/* Extra Cheese */}
        {extra_Cheese && extra_Cheese.length > 0 && (
          <p>
            <span className="text-gray-300 font-semibold">Extra Cheese:</span>{" "}
            {extra_Cheese.map((cheese) => cheese.item_name).join(", ")}
          </p>
        )}

        {/* Extra Vegetables */}
        {extra_Vegetables && extra_Vegetables.length > 0 && (
          <p>
            <span className="text-gray-300 font-semibold">
              Extra Vegetables:
            </span>{" "}
            {extra_Vegetables.map((veggie) => veggie.item_name).join(", ")}
          </p>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        {/* Trash Icon - Styled for dark theme */}
        <button
          type="button"
          className="h-9 w-9 flex items-center justify-center rounded-md bg-gray-800 hover:bg-gray-700 transition-all p-2"
          onClick={removeItem}
        >
          <TrashIcon className="h-5 w-5 text-gray-400 hover:text-red-500 transition-all" />
        </button>

        <button
          type="button"
          onClick={decreaseQuantity}
          className="h-9 w-9 flex items-center justify-center border border-gray-600 rounded-md bg-gray-800 hover:bg-gray-700 transition-all"
        >
          <span className="text-xl font-bold text-gray-300">−</span>
        </button>

        <span className="text-lg font-medium text-white">{quantity}</span>

        <button
          type="button"
          onClick={increaseQuantity}
          className="h-9 w-9 flex items-center justify-center border border-gray-600 rounded-md bg-gray-800 hover:bg-gray-700 transition-all"
        >
          <span className="text-xl font-bold text-gray-300">+</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
