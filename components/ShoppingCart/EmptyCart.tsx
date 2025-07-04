import { useRouter } from "next/navigation";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const EmptyCart = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-EggShell">
      {/* Icon */}
      <div className="bg-KC_GREEN rounded-full p-4 mb-6">
        <ShoppingBagIcon className="w-12 h-12 text-KC_Yellow" />
      </div>

      {/* Text */}
      <h2 className="text-2xl md:text-3xl font-bold text-KC_GREEN mb-3">
        Your cart is empty!
      </h2>
      <p className="text-KC_GREEN text-md max-w-sm mb-6">
        Looks like you haven’t added anything to your cart yet. Let’s fix that!
      </p>

      {/* Button */}
      <button
        onClick={() => router.push("/menu")}
        className="bg-KC_Yellow text-KC_GREEN font-semibold px-6 py-3 rounded-full hover:bg-yellow-400 transition duration-300"
      >
        Browse Menu
      </button>
    </div>
  );
};

export default EmptyCart;

