"use client"
import React, { useState } from 'react';
import NextBreadcrumb from '@/components/ui/bread-crumbs';
import filterForShopImg from '../../assets/filters-for-shop.png';
import Image from 'next/image';
import ShopProductsList from '@/components/ui/shop-products-list';
import { productsList } from '../../../data/products';
import ReactPaginate from 'react-paginate';
import MobileFilterForShop from '@/components/ui/mobile-filter-for-shop';

export default function Shop() {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 10;
  const currentItems = productsList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(productsList.length / 10);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * 10) % productsList.length;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setItemOffset(newOffset);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };


  return (
    <div className='pb-20 pt-28 max-w-containerScreen m-auto px-2 flex flex-col gap-4'>
        <NextBreadcrumb
        homeElement="Home"
        separator="/"
        capitalizeLinks={true}
      />
      <div className=' flex justify-between items-center'>
        <p className=' text-sm text-gray-400'>Showing 1-10 of {productsList.length} Products</p>
        <button onClick={() => handleClick()}>
        <Image src={filterForShopImg} alt='filterForShopImg'/>
        </button>
      </div>

      <div>
        <ShopProductsList productsList={currentItems}/>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next ->"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<- Previous"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-center mt-8 space-x-2"
          pageClassName="page-item"
          pageLinkClassName="flex items-center justify-center text-sm w-[36px] h-[36px] text-gray-400"
          activeClassName="bg-gray-300 rounded-md text-black"
          previousClassName="h-[36px] border border-gray-300 rounded-md flex items-center justify-center text-sm px-2"
          nextClassName="h-[36px] border border-gray-300 rounded-md flex items-center justify-center text-sm px-2"
          breakClassName="h-[36px] border border-gray-300 rounded-md flex items-center justify-center text-sm "
          breakLinkClassName="w-[36px] h-[36px] border border-gray-300 rounded-md"
        />
      </div>
      <MobileFilterForShop isOpen={isOpen} handleClick={handleClick} handleOverlayClick={handleOverlayClick}/>
    </div>
  );
}
