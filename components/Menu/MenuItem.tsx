import "@public/styles/globals.css";
import { useCart } from "@utils/context/ShoppingCartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

interface MenuItemProps {
  _id: string;
  item_name: string;
  item_description: string;
  item_price: {
    single: number;
    combo?: number;
  };
  item_category: string;
  size?: "Medium" | "Large" | undefined;
  slug: string;
  item_img_url?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  _id,
  item_name,
  item_description,
  item_price,
  item_category,
  size,
  slug,
  item_img_url,
}) => {
  const { addItem } = useCart();
  const router = useRouter();
  const [showFull, setShowFull] = useState(false);

  const isLong = item_description ? item_description.length > 120 : false; // Customize this limit

  const handleClick = () => router.push(`/menu/${slug}-${_id}`);

  const optimisedUrl = item_img_url?.replace(
    "/upload",
    "/upload/w_600,q_auto,f_auto",
  );

  return (
    <div
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full mx-auto flex flex-col justify-between border rounded-lg shadow-md hover:shadow-lg overflow-hidden bg-white h-full"
      onClick={handleClick}
    >
      {/* Image */}
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

      {/* Content */}
      <div className="flex flex-col flex-grow justify-between p-4">
        <div>
          <h1 className="text-2xl font-bold">{item_name}</h1>
          <p className="text-sm text-gray-500 capitalize">{item_category}</p>

          {/* Description with toggle */}
          <p
            className={`text-gray-700 mt-2 ${!showFull ? "line-clamp-2" : ""}`}
          >
            {item_description}
          </p>

          {/* Toggle Button */}
          {isLong && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from routing
                setShowFull(!showFull);
              }}
              className="text-sm text-KC_PEACH mt-1 hover:underline"
            >
              {showFull ? "Less Details" : "More Details"}
            </button>
          )}

          {/* Price */}
          <div className="mt-4">
            <p className="text-lg font-bold">Price: AED {item_price.single}</p>
            {item_price.combo && (
              <p className="text-sm text-gray-500">
                Combo: AED {item_price.combo}
              </p>
            )}
          </div>
        </div>

        {/* Add to Cart */}
        <button
          className="h-12 w-full rounded-lg bg-KC_Yellow text-KebabGreen font-bold  mt-4"
          onClick={(e) => {
            e.stopPropagation();
            addItem({
              _id,
              item_name,
              item_description,
              item_price,
              item_category,
              size,
              item_img_url,
              meal: false,
              Quantity: 1,
            });
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
