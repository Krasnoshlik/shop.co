"use client"
import React from 'react';
import ProductsList from '../ui/products/products-list';
import SkeletonProductsList from '../ui/skeletons/skeleton-productlist';
import useProducts from '../../hooks/useProducts';

export default function NewArrivalsAndTopSelling() {
  const { productsList, loading } = useProducts();

  const productsListReversed = [...productsList].reverse();

  if (loading) {
    return (
      <main className='py-12 px-4 text-center max-w-containerScreen m-auto'>
        <section className='flex flex-col gap-8'>
          <h3 className='font-bold text-3xl'>NEW ARRIVALS</h3>
          <SkeletonProductsList />
        </section>

        <span className='block w-full h-[2px] bg-slate-200 my-8'></span>

        <section className='flex flex-col gap-8'>
          <h3 className='font-bold text-3xl'>TOP SELLING</h3>
          <SkeletonProductsList />
        </section>
      </main>
    );
  }

  return (
    <main className='py-12 px-4 text-center max-w-containerScreen m-auto'>
      <section className='flex flex-col gap-8'>
        <h3 className='font-bold text-3xl'>NEW ARRIVALS</h3>
        <ProductsList productsList={productsListReversed} />
      </section>

      <span className='block w-full h-[2px] bg-slate-200 my-8'></span>

      <section className='flex flex-col gap-8'>
        <h3 className='font-bold text-3xl'>TOP SELLING</h3>
        <ProductsList productsList={productsList} />
      </section>
    </main>
  );
}