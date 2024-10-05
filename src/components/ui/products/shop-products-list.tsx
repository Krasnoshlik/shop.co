"use client"; 
import React from 'react';
import ProductCard from './product-card';
import { ProductType } from '@/types/product.ds';

export default function ShopProductsList({ productsList }: { productsList: ProductType[] }) {

  return (
    <div className='flex flex-col gap-4'>
      <div className='w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productsList.map((product: ProductType) => (
          <ProductCard product={product} key={product.id} />
          ))
        }
      </div>
    </div>
  );
}

