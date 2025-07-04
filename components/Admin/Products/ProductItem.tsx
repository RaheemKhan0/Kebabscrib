"use client";
import toast from "react-hot-toast";
import { useMenu } from "@utils/context/MenuContext";
import Image from "next/image";
import EditProductModal from "@components/Modals/EditProductModal";
import { useState } from "react";
import axios from "axios";

interface ProductItemProps {
  _id: string;
  item_name: string;
  item_description: string;
  item_price: {
    single: number;
    combo?: number;
  };
  item_category: string;
  item_img_url?: string;
  isHidden: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({
  _id,
  item_name,
  item_description,
  item_price,
  item_category,
  item_img_url,
  isHidden,
}) => {
  const { deleteItem, hideItem } = useMenu();
  const [openEdit, setEdit] = useState(false);

  const optimisedUrl = item_img_url?.replace(
    "/upload",
    "/upload/w_600,q_auto,f_auto",
  );
  const handleSubmit = async (data: FormData) => {
    try {
      const res = await axios.patch("/api/admin/edititem", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200){
        toast.success("item edited successfully");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="border rounded-lg shadow-md hover:shadow-lg bg-white flex flex-col h-full w-full max-w-sm mx-auto sm:max-w-none">
      {/* Display Image */}
      <div className="relative w-full h-48">
        {optimisedUrl ? (
          <Image
            src={optimisedUrl}
            alt={item_name}
            width={500}
            height={300}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Image not available</p>
          </div>
        )}

        <div
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer"
          onClick={() => setEdit(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
        </div>
      </div>
      {openEdit && (
        <EditProductModal
          id={_id}
          isOpen={openEdit}
          onClose={() => setEdit(false)}
          onSubmit={handleSubmit}
          categories={["Des Sandwiches", "Sides", "Sauce"]}
        />
      )}

      <div className="flex flex-col gap-3 w-full p-5 flex-1">
        {/* item_name and item_category */}
        <h1 className="text-2xl font-bold">{item_name}</h1>
        <p className="text-sm text-gray-500 capitalize">{item_category}</p>

        {/* Item Description */}
        <p className="text-gray-700 mt-2">{item_description}</p>

        {/* Price */}
        <div className="mt-4">
          <p className="text-lg font-bold">Price: AED {item_price.single}</p>
          {item_price.combo && (
            <p className="text-sm text-gray-500">
              Combo: AED {item_price.combo}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-auto space-y-3">
          <button
            className={`h-12 w-full rounded-lg font-semibold transition-colors duration-200 ${
              isHidden
                ? "bg-yellow-600 text-white hover:bg-yellow-700"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
            onClick={() => hideItem(_id)}
          >
            {isHidden ? "Unhide Product" : "Hide Product"}
          </button>

          <button
            className="h-12 w-full rounded-lg bg-red-600 text-white hover:bg-white hover:text-red-600 border hover:border-red-600 transition-all duration-300"
            onClick={() => deleteItem(_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
