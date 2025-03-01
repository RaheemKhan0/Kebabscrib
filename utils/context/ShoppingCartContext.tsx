"use client";
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  ShowAddToast,
  ShowRemoveToast,
} from "../../components/UserToast/CustomToast";
import toast from "react-hot-toast";

import { Menu } from "../../components/Menu/MenuList";
import { useRouter } from "next/navigation";

export type Extras = {
  _id: string;
  item_name: string;
  item_category: string;
};
export type CartItem = {
  _id: string;
  item_name: string;
  item_description: string;
  item_price: {
    single: number;
    meal?: number;
  };
  item_category: string;
  extra_Sauces?: Extras[];
  extra_Vegetables?: Extras[];
  extra_Cheese?: Extras[];
  size?: string;
  item_img_url?: string;
  Quantity: number;
};

type ShoppingCartContext = {
  CartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item_id: string) => void;
  getItem: (item_id: string) => CartItem | undefined;
  loading: boolean;
  decreaseQuantity: (item_id: string) => void;
  increaseQuantity: (item_id: string) => void;
  getTotal: () => number;
};

export const shoppingCartContext = createContext<ShoppingCartContext | null>(
  null,
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    }
    return [];
  });
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setLoading(false);
  }, [cartItems]);

  const addItem = (Item: CartItem) => {
    if (!Item._id) {
      console.log("ID not provided!");
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item._id === Item._id);
      if (!existingItem) {
        return [
          ...prev,
          {
            ...Item, // ✅ Keep all properties including `_id`
            Quantity: 1, // ✅ Ensure default Quantity
          },
        ];
      } else {
        return prev.map((item) =>
          item._id === Item._id
            ? { ...item, Quantity: item.Quantity + 1 }
            : item,
        );
      }
    });

    ShowAddToast(Item.item_name);
  };

  const removeItem = (item_id: string) => {
    const itemToRemove = cartItems.find((item) => item._id === item_id);
    if (itemToRemove) {
      ShowRemoveToast(itemToRemove?.item_name);
    }
    setCartItems((prev) => prev.filter((item) => item._id !== item_id));
  };
  const decreaseQuantity = (item_id: string) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id == item_id) {
          return {
            ...item,
            Quantity: item.Quantity == 0 ? 0 : item.Quantity - 1,
          };
        } else {
          return item;
        }
      }),
    );
  };
  const increaseQuantity = (item_id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === item_id ? { ...item, Quantity: item.Quantity + 1 } : item,
      ),
    );
  };
  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.item_price.single * item.Quantity,
      0,
    );
  };
  const getItem = (item_id: string) => {
    return cartItems.find((item) => item._id === item_id);
  };
  return (
    <shoppingCartContext.Provider
      value={{
        CartItems: cartItems,
        addItem,
        removeItem,
        getItem,
        loading,
        decreaseQuantity,
        increaseQuantity,
        getTotal,
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
};

export const useCart = () => {
  const cartContext = useContext(shoppingCartContext);
  if (!cartContext) {
    console.warn("Warning: useCart must be used within CartProvider.");
    return {
      CartItems: [],
      addItem: () => { },
      removeItem: () => { },
      getItem: () => undefined,
      loading: false,
      decreaseQuantity: () => { },
      increaseQuantity: () => { },
      getTotal: () => { },
    };
  }
  return cartContext;
};
