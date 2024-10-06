import { StaticImageData } from "next/image";

export interface ProductType {
  id: number;
  img: StaticImageData;
  title: string;
  raiting: number;
  price: number;
  type: string;
}

export interface Product {
  id: number;
  img: StaticImageData;
  title: string;
  raiting: number;
  price: number;
  type: string;
  sizes: string;
}

export interface customerCommentType {
  id: number;
  customer: string;
  comment: string;
}

export interface FilterForShopProps {
  isOpen: boolean;
  handleClick: () => void;
  handleOverlayClick: () => void;
  setFilters: any;
}

export interface CartItem {
  addId: number;
  quantity: number;
  pickedSize: string;
}

export interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (addId: number, quantity: number, pickedSize: string) => void;
  removeFromCart: (addId: number, pickedSize: string) => void;
  ChangeQuantity: (pickedId: number, pickedSize: string, typeChange: string) => void;
  getItems: () => void;
}