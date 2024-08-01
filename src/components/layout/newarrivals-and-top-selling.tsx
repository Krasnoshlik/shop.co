import React from 'react'
import ProductsList from '../ui/products-list'
import { productsList } from '../../../data/products'

const productsListReversed = productsList.toReversed();

export default function NewArrivalsAndTopSelling() {
  return (
    <main className=' py-12 px-4 text-center max-w-containerScreen m-auto'>

    <section className=' flex flex-col gap-8'>
        <h3 className=' font-bold text-3xl'>NEW ARRIVALS</h3>
        <ProductsList productsList={productsListReversed}/>
    </section>

    <span className=' block w-full h-[2px] bg-slate-200 my-8'></span>

    <section className=' flex flex-col gap-8'>
        <h3 className=' font-bold text-3xl'>TOP SELLING</h3>
        <ProductsList productsList={productsList}/>
    </section>

    </main>
  )
}
