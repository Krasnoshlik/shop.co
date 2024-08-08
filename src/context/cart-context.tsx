"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  addId: number;
  quantity: number;
  pickedSize: string;
}

interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (addId: number, quantity: number, pickedSize: string) => void;
  removeFromCart: (addId: number) => void;
  getItems: () => void;
  ChangeQuantity: (pickedId: number, typeChange: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const getItems = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (addId: number, quantity: number, pickedSize: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.addId === addId);

      if (existingItem) {
        return prevCart.map(item =>
          item.addId === addId ? { ...item, quantity: item.quantity + quantity, pickedSize } : item
        );
      } else {
        return [...prevCart, { addId, quantity, pickedSize }];
      }
    });
  };

  const removeFromCart = (addId: number) => {
    setCart(prevCart => prevCart.filter(item => item.addId !== addId));
  };

  function ChangeQuantity(pickedId: number, typeChange: string) {
    setCart((prevCart) => 
        prevCart.map((item) => {
            if (item.addId === pickedId) {
                const newQuantity = typeChange === 'plus' 
                    ? item.quantity + 1 
                    : Math.max(1, item.quantity - 1);

                return { ...item, quantity: newQuantity };
            }
            return item;
        })
    );
}

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

