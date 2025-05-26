import { toast } from "react-hot-toast";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import "@public/styles/globals.css";

export const ShowAddToast = (itemName: string) => {
  toast.success(
    <div className="flex items-center space-x-2">
      <CheckCircleIcon className="h-5 w-5 text-green-600" />
      <span className="text-gray-800 font-medium">
        {itemName} added to cart!
      </span>
    </div>,
    {
      duration: 3000,
      position: "top-right",
      style: {
        background: "#ffffff", // White background
        color: "#333", // Dark text for contrast
        fontWeight: "bold",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "12px 16px",
        transform: "translateX(100%)", // Start from right
        transition: "transform 0.5s ease-out", // Smooth transition
      },
      className: "slide-in-toast toast-exit",
    },
  );
};

export const ShowRemoveToast = (itemName: string) => {
  toast.error(
    <div className="flex items-center space-x-2">
      <TrashIcon className="h-5 w-5 text-red-600" />
      <span className="text-gray-800 font-medium">
        {itemName} removed from cart!
      </span>
    </div>,
    {
      duration: 3000,
      position: "top-right",
      style: {
        background: "#ffffff", // White background
        color: "#d9534f", // Red text for error
        fontWeight: "bold",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "12px 16px",
        transform: "translateX(100%)", // Start from right
        transition: "transform 0.5s ease-out", // Smooth transition
      },
      className: "slide-in-toast toast-exit",
    },
  );
};
