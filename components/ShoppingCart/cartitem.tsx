import React from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { CartItem } from "@utils/context/ShoppingCartContext";
import Image from "next/image";

interface CartItemProps {
  item: CartItem;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  removeItem: () => void;
  getItemExtraTotal: (item: CartItem) => number;
}

const ShoppingCartItem: React.FC<CartItemProps> = ({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  getItemExtraTotal,
}) => {
  const optimisedUrl = item.item_img_url?.replace(
    "/upload",
    "/upload/w_600,q_auto,f_auto"
  );

  return (
    <div className="max-w-3xl mx-auto rounded-lg border border-KC_GREEN bg-white p-4 shadow-md flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 transition-all hover:shadow-lg">
      {/* Item Image */}
      <div className="shrink-0">
        {optimisedUrl ? (
          <Image
            className="h-20 w-20 object-cover rounded-md"
            src={optimisedUrl}
            alt={item.item_name}
            width={100}
            height={50}
          />
        ) : (
          <div className="h-20 w-20 bg-KC_GREEN/10 flex items-center justify-center text-KC_GREEN text-sm font-medium rounded-md">
            No Image
          </div>
        )}
      </div>

      {/* Item Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-KC_GREEN">
          {item.item_name}
        </h3>
        <p className="text-sm text-KC_GREEN/70">{item.item_description}</p>
        <p className="text-sm text-KC_GREEN/60 capitalize mt-1">
          {item.item_category}
        </p>
        <div className="mt-2">
          <p className="text-base font-bold text-KC_GREEN">
            {item.meal && item.item_price?.meal ? (
              <>
                AED {item.item_price.meal + getItemExtraTotal(item)}{" "}
                <span className="text-sm font-normal text-KC_GREEN/60">
                  (Meal)
                </span>
              </>
            ) : (
              <>
                AED {item.item_price.single + getItemExtraTotal(item)}{" "}
                <span className="text-sm font-normal text-KC_GREEN/60">
                  (Single)
                </span>
              </>
            )}
          </p>
        </div>

        {/* Extras */}
        <div className="text-sm text-KC_GREEN/70 space-y-1 mt-2">
          {item.tacoMeats && (
            <p>
              <span className="font-semibold text-KC_GREEN">Taco Meat:</span>{" "}
              {item.tacoMeats.map((i) => i.item_name).join(", ")}
            </p>
          )}
          {item.extraMeat && (
            <p>
              <span className="font-semibold text-KC_GREEN">Extra Meat:</span>{" "}
              {item.extraMeat.item_name}
            </p>
          )}
          {item.tacoSauce && (
            <p>
              <span className="font-semibold text-KC_GREEN">Taco Sauce:</span>{" "}
              {item.tacoSauce.item_name}
            </p>
          )}
          {item.meal && item.mealdrink && (
            <p>
              <span className="font-semibold text-KC_GREEN">Meal Drink:</span>{" "}
              {item.mealdrink.item_name}
            </p>
          )}
          {item.meal && item.mealsauce && (
            <p>
              <span className="font-semibold text-KC_GREEN">Meal Sauce:</span>{" "}
              {item.mealsauce.item_name}
            </p>
          )}
          {item.extra_Sauces?.length > 0 && (
            <p>
              <span className="font-semibold text-KC_GREEN">
                Extra Sauces:
              </span>{" "}
              {item.extra_Sauces.map((s) => s.item_name).join(", ")}
            </p>
          )}
          {item.extra_Cheese?.length > 0 && (
            <p>
              <span className="font-semibold text-KC_GREEN">
                Extra Cheese:
              </span>{" "}
              {item.extra_Cheese.map((c) => c.item_name).join(", ")}
            </p>
          )}
          {item.extra_Vegetables?.length > 0 && (
            <p>
              <span className="font-semibold text-KC_GREEN">
                Extra Vegetables:
              </span>{" "}
              {item.extra_Vegetables.map((v) => v.item_name).join(", ")}
            </p>
          )}
        </div>
      </div>

      {/* Quantity & Controls */}
      <div className="flex sm:flex-col items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={removeItem}
          className="h-9 w-9 flex items-center justify-center rounded-md bg-KC_GREEN/10 hover:bg-KC_GREEN/20 transition p-2"
        >
          <TrashIcon className="h-5 w-5 text-red-500" />
        </button>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={decreaseQuantity}
            className="h-8 w-8 flex items-center justify-center border border-KC_GREEN text-KC_GREEN rounded-md"
          >
            −
          </button>

          <span className="text-md font-medium text-KC_GREEN">
            {item.Quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            className="h-8 w-8 flex items-center justify-center border border-KC_GREEN text-KC_GREEN rounded-md"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCartItem;
