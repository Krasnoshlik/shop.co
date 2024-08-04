"use client"
import React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import NextBreadcrumb from '@/components/ui/bread-crumbs';
import { productsList } from '../../../../data/products';
import { Product } from '@/types/product.ds';
import RaitingStarts from '@/components/ui/raiting-starts';

export default function ItemReview() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  const product: Product | undefined = productsList !== undefined
    ? productsList.find((item) => item.id === Number(slug))
    : productsList[0];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='pb-20 pt-28 max-w-containerScreen m-auto px-2'>
      <NextBreadcrumb
        homeElement="Home"
        separator=">"
        capitalizeLinks={true}
      />

      <div className=' mt-5 w-full flex flex-col items-center '>

      
      <div className=' flex flex-col gap-2'>
        <Image src={product.img} alt={product.title} />
        <h2>{product.title}</h2>

        <div className=' flex gap-2 items-center'>
        <RaitingStarts starsNum={product.raiting}/>
        <span>{product.raiting}/5</span>
        </div>

      </div>
      
    </div>
    </div>
  );
}
