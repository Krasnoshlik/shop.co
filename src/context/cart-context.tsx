"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { CartContextType, CartItem } from "@/types/product.ds";
import { useUser } from "@clerk/nextjs";
import { firestore } from "@/utils/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Key for local storage
const LOCAL_STORAGE_KEY = 'cart_items';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [cart, setCart] = useState<CartItem[]>([]);

  // Save cart to Firestore if user is logged in, otherwise to local storage
  const saveCart = async (newCart: CartItem[]) => {
    if (user) {
      try {
        const userDocRef = doc(firestore, "carts", user.id);
        await setDoc(userDocRef, { cart: newCart });
      } catch (error) {
        console.error("Failed to save cart to Firestore:", error);
      }
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCart));
    }
  };

  // Fetch cart from Firestore for logged-in users or from local storage for anonymous users
  const getItems = useCallback(async () => {
    if (isLoaded) {
      if (user) {
        // Fetch from Firestore if the user is logged in
        try {
          const userDocRef = doc(firestore, "carts", user.id);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const storedCart = userDocSnap.data()?.cart as CartItem[] | undefined;
            if (storedCart) {
              setCart(storedCart);
            }
          }
        } catch (error) {
          console.error("Failed to fetch cart from Firestore:", error);
        }
      } else {
        // Fetch from local storage if the user is not logged in
        const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      }
    }
  }, [isLoaded, user]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  // Add item to cart and save to the appropriate storage
  const addToCart = (addId: number, quantity: number, pickedSize: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.addId === addId && item.pickedSize === pickedSize
      );
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.addId === addId && item.pickedSize === pickedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...prevCart, { addId, quantity, pickedSize }];
      }

      saveCart(updatedCart);
      return updatedCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (addId: number, pickedSize: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => !(item.addId === addId && item.pickedSize === pickedSize)
      );

      saveCart(updatedCart);
      return updatedCart;
    });
  };

  // Change quantity of a cart item
  const ChangeQuantity = (pickedId: number, pickedSize: string, typeChange: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.addId === pickedId && item.pickedSize === pickedSize) {
          let newQuantity = item.quantity;

          if (typeChange === 'plus') {
            newQuantity += 1;
          } else if (typeChange === 'minus') {
            newQuantity = Math.max(1, newQuantity - 1);
          }

          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      saveCart(updatedCart);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, getItems, ChangeQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
