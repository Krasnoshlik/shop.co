"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import NextBreadcrumb from '@/components/ui/bread-crumbs';
import { productsList } from '../../../../data/products';
import { Product } from '@/types/product.ds';
import RaitingStarts from '@/components/ui/raiting-starts';
import HorizontalLine from '@/components/ui/horizontal-line';
import BlackButton from '@/components/ui/black-button';

export default function ItemReview() {
  const [sizeChoose, setSizeChoose] = useState('');
  const [count, setCount] = useState(0);
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  const product: Product | undefined = productsList !== undefined
    ? productsList.find((item) => item.id === Number(slug))
    : productsList[0];

  if (!product) {
    return <div>Product not found</div>;
  }
  const sizesArr = product?.sizes.split(' ');

  const plusButton = () => {
    setCount(count + 1)
  }

  const minusButton = () => {
    count > 0 ? setCount(count - 1) : setCount(0);
  } 

  return (
    <div className='pb-20 pt-28 max-w-containerScreen m-auto px-2'>
      <NextBreadcrumb
        homeElement="Home"
        separator=">"
        capitalizeLinks={true}
      />

      <div className=' mt-5 w-full flex flex-col items-center '>

      
      <div className=' flex flex-col gap-1'>
        <Image src={product.img} alt={product.title} />
        <h2 className=' text-xl font-bold'>{product.title}</h2>

        <div className=' flex gap-2 items-center'>
        <RaitingStarts starsNum={product.raiting}/>
        <span>{product.raiting}/5</span>
        </div>
        <p className=' font-bold text-xl'>$ {product.price}</p>
        <HorizontalLine/>
        <div className=' flex gap-2'>
          {
            sizesArr.map((e, i) => {
              return (
              <button key={i} onClick={() => setSizeChoose(e)} className={` px-5 rounded-2xl font-bold text-gray-400 m-1 border-[1px] border-gray-300 bg-[#f9f9f9] ${sizeChoose === e ? 'bg-black text-white border-white' : ''} }`}>{e}</button>
            )
            })
          }
        </div>
        <HorizontalLine/>

        <div className='py-3 flex max-h-16 gap-2'>

          <div className=' w-28 flex rounded-3xl bg-[#F0F0F0] py-1 font-bold items-center justify-between text-center'>
            <button onClick={minusButton} className=' w-full text-lg'>-</button>
            <p className=' max-w-5 min-w-5'>{count}</p>
            <button onClick={plusButton} className=' w-full text-lg'>+</button>
          </div>

          <BlackButton text='Add to Cart'/>
        </div>

      </div>
      
    </div>
    </div>
  );
}
