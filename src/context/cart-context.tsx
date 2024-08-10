"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartContextType, CartItem } from "@/types/product.ds";
import { useUser } from "@clerk/nextjs";

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [cart, setCart] = useState<CartItem[]>([]);

  const getItems = async () => {
    if (isLoaded) {
      if (user) {
        const storedCart = user.publicMetadata?.cart as CartItem[] | undefined;
        if (storedCart) {
          setCart(storedCart);
        } else {
          const localCart = localStorage.getItem("cart");
          if (localCart) {
            setCart(JSON.parse(localCart));
            await saveCart(JSON.parse(localCart));
          }
        }
      } else {
        const localCart = localStorage.getItem("cart");
        if (localCart) {
          setCart(JSON.parse(localCart));
        }
      }
    }
  };

  const saveCart = async (newCart: CartItem[]) => {
    setCart(newCart);
    if (user) {
      try {
        await user.update({
          publicMetadata: {
            cart: newCart,
          },
        } as any);
      } catch (error) {
        console.error("Failed to update user metadata:", error);
      }
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  useEffect(() => {
    getItems();
  }, [isLoaded]);

  const addToCart = (addId: number, quantity: number, pickedSize: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.addId === addId);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.addId === addId ? { ...item, quantity: item.quantity + quantity, pickedSize } : item
        );
      } else {
        updatedCart = [...prevCart, { addId, quantity, pickedSize }];
      }

      saveCart(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (addId: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.addId !== addId);
      saveCart(updatedCart);
      return updatedCart;
    });
  };

  const ChangeQuantity = (pickedId: number, typeChange: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.addId === pickedId) {
          const newQuantity =
            typeChange === "plus" ? item.quantity + 1 : Math.max(1, item.quantity - 1);

          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      saveCart(updatedCart);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, getItems, ChangeQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
