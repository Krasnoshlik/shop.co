"use client"
import React from 'react';
import Image from 'next/image';
import { ProductType } from '@/types/product.ds';
import { useRouter } from 'next/navigation';
import RaitingStarts from './raiting-starts';

export default function ProductCard({ product }: { product: ProductType }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`shop/product?slug=${product.id}`);
  };

  return (
    <div onClick={handleClick} className="min-w-[164px] max-w-[290px] flex flex-col gap-1 items-start text-left md:hover:cursor-pointer">
      <Image src={product.img} alt={product.title}/>
      <h4 className="font-bold text-sm truncate-text" title={product.title}>
        {product.title}
      </h4>
      <div className="w-[162px] flex items-center gap-1">
        <RaitingStarts starsNum={product.raiting}/>
        <span>{product.raiting}/5</span>
      </div>
      <div className=' w-full flex justify-between items-center'>
      <p className="font-bold text-sm">${product.price}</p>
      </div>
    </div>
  );
}

