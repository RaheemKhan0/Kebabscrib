"use client";
import React, { useState, useMemo } from "react";
import { Menu } from "../MenuList";
import { useMenu } from "@utils/context/MenuContext";
import { CartItem, useCart } from "@utils/context/ShoppingCartContext";
import toast from "react-hot-toast";
import ToggleSection from "./ToggleSection";
import Image from "next/image";
import { Extras } from "@utils/context/ShoppingCartContext";
import DrinkSelectionModal from "@components/Modals/DrinkSelection";
import SauceSelectionModal from "@components/Modals/SauceSelection";

const TacoBuilder: React.FC = () => {
  const { menu } = useMenu();
  const { addItem } = useCart();

  const [meal, setMeal] = useState(false);
  const [size, setSize] = useState<"Medium" | "Large">("Medium");
  const [baseMeats, setBaseMeats] = useState<Menu[]>([]);
  const [extraMeat, setExtraMeat] = useState<Extras | null>(null);
  const [sauces, setSauces] = useState<Menu[]>([]);
  const [cheeses, setCheeses] = useState<Menu[]>([]);
  const [vegetables, setVegetables] = useState<Menu[]>([]);
  const mediumTaco = menu.find((item) => item.item_name == "Medium Taco");
  const [openDrinkSelection, setDrinkSelection] = useState(false);
  const [openSauceSelection, setSauceSelection] = useState(false);
  const largeTaco = menu.find((item) => item.item_name == "Large Taco");
  const maxMeats = size === "Large" ? 2 : 1;
  const [mealDrink, setMealDrink] = useState<Menu | undefined>();
  const [mealSauce, setMealSauce] = useState<Extras | undefined>();
  const [tacoSauce, setTacoSauce] = useState<Extras | null>(null);

  const tacoItem = useMemo((): CartItem | undefined => {
    const baseItem = size === "Medium" ? mediumTaco : largeTaco;
    if (!baseItem) return undefined;
    return {
      _id: baseItem._id,
      item_name: "Taco",
      item_description: `Custom built taco with ${baseMeats.length} base meat(s)`,
      item_price: {
        single: size === "Medium"? mediumTaco?.item_price.single ?? 44.5 : largeTaco?.item_price.single ?? 62.5,
        meal:  size === "Medium"? mediumTaco?.item_price.meal ?? 55.5 : largeTaco?.item_price.single ?? 72.5,
      },
      item_category: "Taco",
      size : size,
      extra_Sauces: sauces,
      extra_Cheese: cheeses,
      meal: meal,
      extra_Vegetables: vegetables,
      extraMeat : extraMeat ?? undefined,
      mealdrink: mealDrink,
      mealsauce: mealSauce,
      tacoMeats: baseMeats,
      tacoSauce: tacoSauce ?? undefined,
      Quantity: 1,
    };
  }, [
    menu,
    size,
    meal,
    baseMeats,
    sauces,
    cheeses,
    vegetables,
    extraMeat,
    mealDrink,
    mealSauce,
    tacoSauce,
  ]);

  const handleAddToCart = () => {
    if (!tacoItem) {
      toast.error("Please select all the required options");
      return;
    }
    if (!tacoItem?.tacoMeats || tacoItem.tacoMeats.length == 0) {
      toast.error("please select your meats for the taco");
      return;
    }
    if (tacoItem.size === "Large" && tacoItem.tacoMeats.length != 2) {
      toast.error("please select two meats for your large taco");
      return;
    }
    if (!tacoItem?.tacoSauce) {
      toast.error("please select your sauce for the taco");
      return;
    }
    if (tacoItem.meal && !tacoItem.mealdrink) {
      setDrinkSelection(true);
      console.log("Drink modal activated");
      return;
    }
    if (tacoItem.meal && !tacoItem.mealsauce) {
      setSauceSelection(true);
      return;
    }

    addItem(tacoItem);
  };
  const onDrinkSelectionSubmit = (selectedDrink: Menu | null) => {
    if (!selectedDrink) {
      toast.error("Please select your drink");
      return;
    }
    setMealDrink(selectedDrink);
    setDrinkSelection(false);
    handleAddToCart();
  };

  const onSauceSelectionSubmit = (selectedSauce: Extras | null) => {
    if (!selectedSauce) return;
    setMealSauce(selectedSauce);
    handleAddToCart();
  };
  const closeSauceSelection = () => {
    setMealDrink(undefined);
    setMealSauce(undefined);
    setSauceSelection(false);
  };
  const closeDrinkSelection = () => {
    setMealDrink(undefined);
    setDrinkSelection(false);
  };

  const handleToggle = (
    list: Menu[],
    setList: React.Dispatch<React.SetStateAction<Menu[]>>,
    item: Menu,
    limit: number,
  ) => {
    const exists = list.find((i) => i._id === item._id);
    if (exists) {
      setList(list.filter((i) => i._id !== item._id));
    } else if (list.length < limit) {
      setList([...list, item]);
    } else {
      setList([...list.slice(1), item]);
    }
  };

  const renderIngredientGrid = (
    items: Menu[],
    selected: Menu[] | Menu | Extras | null,
    setSelected: React.Dispatch<any>,
    max: number,
  ) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.map((item) => {
        const isSelected = Array.isArray(selected)
          ? selected.some((s) => s._id === item._id)
          : selected?._id === item._id;

        const isMax =
          Array.isArray(selected) && selected.length >= max && !isSelected;

        return (
          <button
            key={item._id}
            disabled={isMax}
            onClick={() => {
              if (Array.isArray(selected)) {
                handleToggle(selected, setSelected, item, max);
              } else {
                setSelected(item);
              }
            }}
            className={`relative overflow-hidden h-24 flex items-center justify-center rounded-xl border-2 transition-all duration-200
              ${isSelected ? "border-KebabGreen bg-KebabGreen/10 ring-2 ring-KebabGreen/40 shadow-md" : "border-gray-300 hover:border-KebabGreen"}
              ${isMax ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {item.item_img_url && (
              <Image
                src={item.item_img_url.replace(
                  "/upload",
                  "/upload/c_fill,g_auto,w_400,h_300,q_auto,f_auto",
                )}
                alt={item.item_name}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
            {isSelected && (
              <div className="absolute top-2 right-2 z-20">
                <span className="bg-KebabGreen text-white rounded-full px-2 text-xs">
                  ✓
                </span>
              </div>
            )}
            <span className="relative z-20 text-white font-semibold text-sm text-center px-2">
              {item.item_name}
            </span>
          </button>
        );
      })}
    </div>
  );


  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-KebabGreen tracking-tight text-center">
        🌮 Build Your Dream Taco!
      </h1>
      <p className="text-center text-gray-500 text-sm mb-6">
        Select your base, add juicy meats, drizzle sauces & top with veggies!
      </p>

      {/* Size */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-center text-KebabGreen mb-4">
          Meal?
        </h2>
        <div className="flex item-center justify-center gap-4">
          {["Single", "Meal"].map((s) => {
            const isSelected =
              (s === "Meal" && meal) || (s === "Single" && !meal);
            return (
              <button
                key={s}
                onClick={() => (s == "Single" ? setMeal(false) : setMeal(true))}
                className={`w-32 py-3 rounded-full border-2 text-md font-semibold transition-all duration-200
              ${
                isSelected
                  ? "bg-KebabGreen text-white border-KebabGreen shadow-lg ring-2 ring-KebabGreen/30"
                  : "bg-white text-gray-800 border-gray-300 hover:border-KebabGreen"
              }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
      {openDrinkSelection && (
        <DrinkSelectionModal
          isOpen={openDrinkSelection}
          onClose={closeDrinkSelection}
          onSubmit={onDrinkSelectionSubmit}
        />
      )}
      {openSauceSelection && (
        <SauceSelectionModal
          isOpen={openSauceSelection}
          onClose={closeSauceSelection}
          onSubmit={onSauceSelectionSubmit}
        />
      )}

      <ToggleSection title="Choose your Size :" initiallyOpen={false}>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-center text-KebabGreen mb-4">
            🧩 Select Taco Size
          </h2>
          <div className="flex justify-center gap-4">
            {["Medium", "Large"].map((s) => {
              const isSelected = size === s;
              return (
                <button
                  key={s}
                  onClick={() => {
                    setSize(() => {
                      if (s === "Medium" && baseMeats.length > 1)
                        setBaseMeats([]);
                      if (s === "Large") setBaseMeats([]);
                      return s as "Medium" | "Large";
                    });
                  }}
                  className={`w-32 py-3 rounded-full border-2 text-md font-semibold transition-all duration-200
              ${
                isSelected
                  ? "bg-KebabGreen text-white border-KebabGreen shadow-lg ring-2 ring-KebabGreen/30"
                  : "bg-white text-gray-800 border-gray-300 hover:border-KebabGreen"
              }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <p className="text-sm text-center text-gray-500 mt-2">
            {size === "Medium"
              ? "Choose one base meat"
              : "Choose up to two base meats"}
          </p>
        </div>
      </ToggleSection>

      {/* Base Meat */}
      <ToggleSection title="Choose your Meat" initiallyOpen={false}>
        <div className="mb-4">
          <h2 className="font-semibold text-lg text-KebabGreen mb-4 text-center">
            Choose Your Base Meat ({maxMeats}{" "}
            {maxMeats > 1 ? "choices" : "choice"})
          </h2>
          {renderIngredientGrid(
            menu.filter(
              (item) => !item.isHidden && item.item_category === "Meat",
            ),
            baseMeats,
            setBaseMeats,
            maxMeats,
          )}
          <p className="text-sm text-gray-500 mt-2">
            {baseMeats.length} of {maxMeats} selected
          </p>
        </div>
      </ToggleSection>
      <ToggleSection title="Choose your Sauce" initiallyOpen={false}>
        <div className="mb-4">
          <h2 className="font-semibold text-lg text-KebabGreen mb-4 text-center">
            🧂 Choose Your Sauce{" "}
            <span className="text-gray-500 text-sm">(Up to 1)</span>
          </h2>

          {renderIngredientGrid(
            menu.filter(
              (item) => !item.isHidden && item.item_category === "Sauce",
            ),
            tacoSauce,
            setTacoSauce,
            1,
          )}
        </div>
      </ToggleSection>

      {/* Extra Meat */}
      <ToggleSection title="Extra Meat" initiallyOpen={false}>
        <div className="mb-4">
          <h2 className="font-semibold text-lg text-KebabGreen mb-4 text-center">
            Chosse your Extra Meat
            <span className="text-gray-500 text-sm"> (Up to 1)</span>
          </h2>
          <h3 className="text-gray-500 text-sm text-center md-3">
            {" "}
            9 AED Extra
          </h3>

          {renderIngredientGrid(
            menu.filter(
              (item) => !item.isHidden && item.item_category === "Meat",
            ),
            extraMeat,
            setExtraMeat,
            1,
          )}
        </div>
      </ToggleSection>

      {/* Sauces */}
      <ToggleSection title="Extra Sauces" initiallyOpen={false}>
        <div className="mb-4">
          <h2 className="font-semibold text-lg text-KebabGreen mb-4 text-center">
            🧂 Choose Your Extra Sauces{" "}
            <span className="text-gray-500 text-sm">(Up to 3)</span>
          </h2>
          <h3 className="text-gray-500 text-sm text-center md-3">
            {" "}
            4 AED Each
          </h3>

          {renderIngredientGrid(
            menu.filter(
              (item) => !item.isHidden && item.item_category === "Sauce",
            ),
            sauces,
            setSauces,
            3,
          )}
        </div>
      </ToggleSection>

      {/* Cheese */}
      <ToggleSection title="Extra Cheese" initiallyOpen={false}>
        <div className="mb-4">
          <h2 className="font-semibold text-lg text-KebabGreen mb-4 text-center">
            Extra Cheese
            <span className="text-gray-500 text-sm"> (Up to 3)</span>
          </h2>
          <h3 className="text-gray-500 text-sm text-center md-3">
            {" "}
            6 AED Each
          </h3>

          {renderIngredientGrid(
            menu.filter(
              (item) =>
                !item.isHidden && item.item_category === "Cheese & Others",
            ),
            cheeses,
            setCheeses,
            3,
          )}
        </div>
      </ToggleSection>

      {/* Vegetables */}
      <ToggleSection title="Extra Veggies" initiallyOpen={false}>
        <div className="mb-4">
          <h2 className="font-semibold text-lg text-KebabGreen mb-4 text-center">
            Extra Vegetables
            <span className="text-gray-500 text-sm"> (Up to 3)</span>
          </h2>
          <h3 className="text-gray-500 text-sm text-center md-3">
            {" "}
            3 AED Each
          </h3>

          {renderIngredientGrid(
            menu.filter(
              (item) =>
                !item.isHidden && item.item_category === "Vegetables & Others",
            ),
            vegetables,
            setVegetables,
            3,
          )}
        </div>
      </ToggleSection>

      {/* Confirm Button */}
      <button
        className="bg-KebabGreen text-white font-bold px-6 py-3 mt-6 rounded-lg shadow-md"
        onClick={() => handleAddToCart()}
      >
        Add Taco to Cart
      </button>
    </div>
  );
};

export default TacoBuilder;
