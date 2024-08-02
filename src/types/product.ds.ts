import { StaticImageData } from "next/image";

export interface ProductType {
    id: number,
    img: StaticImageData,
    title: string,
    raiting: number,
    price: number,
    type: string
}

export interface customerCommentType {
    id: number,
    customer: string,
    comment: string,
}

export interface MobileFilterForShopProps {
    isOpen: boolean;
    handleClick: () => void;
    handleOverlayClick: () => void;
  }