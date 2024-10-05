"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { CartContextType, CartItem } from "@/types/product.ds";
import { useUser } from "@clerk/nextjs";
import { firestore } from "@/utils/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [cart, setCart] = useState<CartItem[]>([]);

  const saveCart = async (newCart: CartItem[]) => {
    if (user) {
      try {
        const userDocRef = doc(firestore, "carts", user.id);
        await setDoc(userDocRef, { cart: newCart });
      } catch (error) {
        console.error("Failed to save cart to Firestore:", error);
      }
    }
    
  };

  const getItems = useCallback(async () => {
    if (isLoaded) {
      if (user) {
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
      }
    }
  }, [isLoaded, user]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  const addToCart = (addId: number, quantity: number, pickedSize: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => +item.addId === addId);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          +item.addId === addId ? { ...item, quantity: item.quantity, pickedSize } : item
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
      const updatedCart = prevCart.filter((item) => +item.addId !== addId);
      saveCart(updatedCart);
      return updatedCart;
    });
  };

  const ChangeQuantity = (pickedId: number, typeChange: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (+item.addId === pickedId) {
          let newQuantity = item.quantity;
  
          if (typeChange === 'plus') {
            newQuantity += 1;  
          } 
          // Decrement quantity
          else if (typeChange === 'minus') {
            if (newQuantity > 1) {
              newQuantity -= 1; 
            } else {
              removeFromCart(+item.addId); 
              return item;
            }
          }
  
          console.log('Before update:', item.quantity, 'Action:', typeChange);
          console.log('After update:', newQuantity);
    
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
