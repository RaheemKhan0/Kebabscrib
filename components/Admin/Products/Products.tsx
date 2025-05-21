"use client";

import { useMenu } from "@utils/context/MenuContext";
import ProductItem from "./ProductItem";
import LoadingScreen from "@components/Common/LoadingScreen";
import CreateProductModal from "@components/Modals/CreateProductModal";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const Products = () => {
  const { menu, isLoading, mutate } = useMenu();
  const [showCreateProduct, setCreateProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Des Sandwiches",
    "Sides",
    "Sauce",
    "Drinks",
    "Special Drinks",
    "Soft Drinks",
    "Vegetables & Others",
    "Meat",
    "Cheese & Others",
  ];

  const handleOpen = () => {
    setCreateProduct(true);
  };

  const handleClose = () => {
    setCreateProduct(false);
  };

  const handleSubmit = async (data: FormData) => {
    try {
      const res = await axios.post("/api/admin/additem", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        mutate();
        toast.success(res.data.newItem.item_name + " created successfully!");
      }
    } catch (error) {
      throw error;
    }
  };

  const filteredMenu =
    selectedCategory === "All"
      ? menu
      : menu.filter((item) => item.item_category === selectedCategory);

  if (isLoading) {
    console.log("loading :  ", isLoading);
    return <LoadingScreen />;
  } else {
    return (
      <div className="ml-0 md:ml-64 p-6">
        <h2 className="text-KC_GREEN flex text-4xl font-semibold mb-5 font-parkinsans ml-20">
          Products
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-6 ml-20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-KebabGreen text-white border-KebabGreen"
                  : "bg-white text-KebabGreen border-KebabGreen hover:bg-KebabGreen hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-6 ml-20">
          <button
            className="rounded-lg p-3 text-lg bg-KebabGreen hover:bg-KC_PEACH transition-all duration-150 font-parkinsans text-KC_PEACH hover:text-white"
            onClick={handleOpen}
          >
            Add Product
          </button>
        </div>

        {showCreateProduct && (
          <CreateProductModal
            isOpen={showCreateProduct}
            onClose={handleClose}
            onSubmit={handleSubmit}
            categories={categories.slice(1)} // skip "All"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-6">
          {filteredMenu.map((item) => (
            <ProductItem
              key={item._id}
              _id={item._id}
              item_name={item.item_name}
              item_price={item.item_price}
              item_category={item.item_category}
              item_description={item.item_description}
              item_img_url={item.item_img_url}
              isHidden={item.isHidden}
            />
          ))}
        </div>
      </div>
    );
  }
};
