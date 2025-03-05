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
import { useRouter } from "next/navigation";

export type Extras = {
  _id: string;
  item_name: string;
  item_category: string;
};

export type CartItem = {
  _id: string;
  cart_id: string;
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
  meal: boolean;
  size?: string;
  item_img_url?: string;
  Quantity: number;
};

type ShoppingCartContext = {
  CartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (cart_id: string) => void;
  getItem: (cart_id: string) => CartItem | undefined;
  loading: boolean;
  decreaseQuantity: (cart_id: string) => void;
  increaseQuantity: (cart_id: string) => void;
  generate_Cart_ID: (item: CartItem) => string;
  getTotal: () => number;
  getItemExtraTotal: (item: CartItem) => number;
};

export const shoppingCartContext = createContext<ShoppingCartContext | null>(
  null,
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setLoading(false);
  }, [cartItems]);

  const generate_Cart_ID = (item: CartItem) => {
    return [
      item._id,
      item.extra_Sauces?.length ? JSON.stringify(item.extra_Sauces) : null,
      item.extra_Cheese?.length ? JSON.stringify(item.extra_Cheese) : null,
      item.extra_Vegetables?.length
        ? JSON.stringify(item.extra_Vegetables)
        : null,
      item.meal ? "meal" : null,
    ]
      .filter(Boolean)
      .join("-");
  };

  const addItem = (Item: CartItem) => {
    if (!Item._id) {
      console.log("ID not provided!");
      return;
    }
    const newCartID = generate_Cart_ID(Item);

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.cart_id === newCartID);
      if (!existingItem) {
        return [
          ...prev,
          {
            ...Item,
            cart_id: newCartID, // ✅ Assign new cart_id
            Quantity: 1,
          },
        ];
      } else {
        return prev.map((item) =>
          item.cart_id === newCartID // ✅ Check against `cart_id`, not `_id`
            ? { ...item, Quantity: item.Quantity + 1 }
            : item,
        );
      }
    });
    router.push("/menu");
    ShowAddToast(Item.item_name);
  };

  const removeItem = (cart_id: string) => {
    const itemToRemove = cartItems.find((item) => item.cart_id === cart_id);
    if (itemToRemove) {
      ShowRemoveToast(itemToRemove.item_name);
    }
    setCartItems((prev) => prev.filter((item) => item.cart_id !== cart_id)); // ✅ Remove based on `cart_id`
  };

  const decreaseQuantity = (cart_id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cart_id === cart_id
          ? { ...item, Quantity: Math.max(1, item.Quantity - 1) }
          : item,
      ),
    );
  };

  const increaseQuantity = (cart_id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cart_id === cart_id
          ? { ...item, Quantity: item.Quantity + 1 }
          : item,
      ),
    );
  };

  const getItemExtraTotal = (item: CartItem) => {
    const TotalVegetables = (item.extra_Vegetables?.length ?? 0) * 3;
    const TotalSauces = (item.extra_Sauces?.length ?? 0) * 4;
    const TotalCheese = (item.extra_Cheese?.length ?? 0) * 6;
    return TotalVegetables + TotalSauces + TotalCheese;
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total +
        (item.meal
          ? (item.item_price.meal ?? item.item_price.single + 10)
          : item.item_price.single) +
        getItemExtraTotal(item) * item.Quantity,
      0,
    );
  };

  const getItem = (cart_id: string) => {
    return cartItems.find((item) => item.cart_id === cart_id);
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
        generate_Cart_ID,
        getTotal,
        getItemExtraTotal,
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
      generate_Cart_ID: () => [],
      getTotal: () => 0,
      getItemExtraTotal: () => 0,
    };
  }
  return cartContext;
};
