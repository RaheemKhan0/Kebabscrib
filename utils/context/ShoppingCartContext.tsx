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
} from "@components/UserToast/CustomToast";
import { useRouter } from "next/navigation";
import { OrderType } from "types/order";
import axios from "axios";
import toast from "react-hot-toast";
import { Menu } from "@components/Menu/MenuList";
import Stripe from "stripe";

export type Extras = {
  _id: string;
  item_name: string;
  item_category: string;
  item_price: {
    single : number
  };
};

export type CartItem = {
  _id: string;
  cart_id?: string;
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
  tacoSauce?: Extras;
  tacoMeats?: Menu[];
  size?: "Medium" | "Large" | undefined;
  meal: boolean;
  extraMeat?: Extras;
  mealdrink?: Menu;
  mealsauce?: Extras;
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
  placeOrder: (name: string, email: string, id?: string) => Promise<void>;
  formatItemForStripe: () => Stripe.Checkout.SessionCreateParams.LineItem[];
  clearCart: () => void;
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
  }, [cartItems]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoading(false));
    return () => cancelAnimationFrame(frame);
  }, []);

  const generate_Cart_ID = (item: CartItem): string => {
    return [
      item._id,
      item.extra_Sauces?.length ? JSON.stringify(item.extra_Sauces) : null,
      item.extra_Cheese?.length ? JSON.stringify(item.extra_Cheese) : null,
      item.extra_Vegetables?.length
        ? JSON.stringify(item.extra_Vegetables)
        : null,
      item.meal ? "meal" : null,
      item.mealdrink ? item.mealdrink : "",
      item.mealsauce ? item.mealsauce : "",
    ]
      .filter(Boolean)
      .join("-");
  };
  const clearCart = () => {
    setCartItems([]);
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
            cart_id: newCartID,
            Quantity: 1,
          },
        ];
      } else {
        return prev.map((item) =>
          item.cart_id === newCartID
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
    setCartItems((prev) => prev.filter((item) => item.cart_id !== cart_id));
  };

  const decreaseQuantity = (cart_id: string | undefined) => {
    if (!cart_id) return;
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
    const TotalVegetables =
      item.extra_Vegetables?.reduce((sum, v) => sum + (v.item_price.single ?? 0), 0) ??
      0;

    const TotalSauces =
      item.extra_Sauces?.reduce((sum, s) => sum + (s.item_price.single ?? 0), 0) ?? 0;

    const TotalCheese =
      item.extra_Cheese?.reduce((sum, c) => sum + (c.item_price.single ?? 0), 0) ?? 0;

    return (
      TotalVegetables +
      TotalSauces +
      TotalCheese +
      (item.extraMeat?.item_price.single ?? 0)
    );
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total +
        (item.meal
          ? (item.item_price.meal ??
            item.item_price.single + 10 + getItemExtraTotal(item))
          : item.item_price.single + getItemExtraTotal(item)) *
          item.Quantity,
      0,
    );
  };

  const formatItemForStripe = () => {
    return cartItems.map((item) => ({
      price_data: {
        currency: "aed",
        product_data: { name: item.item_name },
        unit_amount:
          (item.meal
            ? (item.item_price.meal ?? item.item_price.single + 10) +
              getItemExtraTotal(item)
            : item.item_price.single + getItemExtraTotal(item)) * 100,
      },
      quantity: item.Quantity,
    }));
  };
  const placeOrder = async (name: string, email: string, id?: string) => {
    try {
      const order: OrderType = {
        user_id: id,
        customer_name: name,
        email: email,
        items: cartItems,
        total_price: getTotal(),
        status: "pending",
        isPaid: true,
      };
      const res = await axios.post("/api/users/order", order);
      if (res.status == 201) {
        toast.success("Order Placed Successfully!!");
        setCartItems([]);
      }
    } catch (error) {
      console.log("Order placing error : ", error);
      toast.error("There was an error placing your order");
    }
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
        placeOrder,
        formatItemForStripe,
        clearCart
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
      addItem: () => {},
      removeItem: () => {},
      getItem: () => undefined,
      loading: false,
      decreaseQuantity: () => {},
      increaseQuantity: () => {},
      generate_Cart_ID: () => "",
      getTotal: () => 0,
      getItemExtraTotal: () => 0,
      placeOrder: async () => {},
      formatItemForStripe: () => [],
      clearCart: () => {},
    };
  }
  return cartContext;
};
