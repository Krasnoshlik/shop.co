"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from './product-card'
import { ProductType } from '@/app/types/product.ds'

export default function ProductsList({productsList}:{productsList : any}) {
    const [productsToShow, setProductsToShow] = useState([]);

    function onlyFourItems() {
        const filteredItems = productsList.slice(0,4);
        setProductsToShow(filteredItems)
    }

    useEffect(() => {
        onlyFourItems()
    },[])

  return (
    <div className=' flex flex-col gap-4'>
    <div className=' flex gap-4 overflow-auto lg:overflow-visible lg:flex-wrap'>
        {
            productsToShow.map((product: ProductType) => {
                return (
                    <ProductCard product={product} key={product.id}/>
                )
            })
        }
    </div>
    {productsToShow.length === 4 ?
    <button className=' border rounded-2xl py-1' onClick={() => setProductsToShow(productsList)}>View More</button>   
    : <button className=' border rounded-2xl py-1' onClick={() => onlyFourItems()}>View less</button>
}
    </div>
)
}
