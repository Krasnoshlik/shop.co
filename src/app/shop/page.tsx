"use client"; 
import React, { useEffect, useState } from 'react';
import NextBreadcrumb from '@/components/ui/bread-crumbs';
import filterForShopImg from '../../assets/filters-for-shop.png';
import Image from 'next/image';
import ShopProductsList from '@/components/ui/products/shop-products-list';
import ReactPaginate from 'react-paginate';
import FilterForShop from '@/components/ui/filter-for-shop';
import useProducts from '@/hooks/useProducts';

export default function Shop() {
  const { productsList, loading } = useProducts();
  const [itemOffset, setItemOffset] = useState(0);
  const [filters, setFilters] = useState<any>([]);
  const [filteredItems, setFilteredItems] = useState<any>([]);

  const endOffset = itemOffset + 10;
  const currentItems = filteredItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredItems.length / 10);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * 10) % filteredItems.length;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setItemOffset(newOffset);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClickOnFilterIcon = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    let filtered = productsList || [];

    // Filter by type
    if (filters[0] && filters[0].length > 0) {
      filtered = filtered.filter((item) => filters[0].includes(item.type));
    }

    // Filter by size
    if (filters[1] && Object.values(filters[1]).includes(true)) {
      const selectedSizes = Object.keys(filters[1]).filter((size) => filters[1][size]);
      filtered = filtered.filter((item) => {
        const itemSizes = item.sizes.split(' ');
        return selectedSizes.some((size) => itemSizes.includes(size));
      });
    }

    // Filter by price
    if (filters[2]) {
      const [minPrice, maxPrice] = filters[2];
      filtered = filtered.filter((item) => {
        return (
          (minPrice === null || item.price >= minPrice) &&
          (maxPrice === null || item.price <= maxPrice)
        );
      });
    }

    setFilteredItems(filtered);
    setIsOpen(false);
  }, [filters, productsList]);

  return (
    <div className='pb-20 pt-28 max-w-containerScreen m-auto px-2 flex flex-col gap-4'>
      <NextBreadcrumb
        homeElement="Home"
        separator=">"
        capitalizeLinks={true}
      />
      <div className='flex justify-between items-center'>
        <p className='text-sm text-gray-400'>Showing {loading ? 0 : currentItems.length} of {filteredItems.length} Products</p>
        <button onClick={handleClickOnFilterIcon} className='md:hidden'>
          <Image src={filterForShopImg} alt='filterForShopImg' />
        </button>
      </div>

      <div className='md:flex md:justify-between md:gap-5'>
        <div className='hidden md:flex md:max-w-[240px] lg:max-w-[300px] border rounded-lg p-4 h-min'>
          <FilterForShop isOpen={isOpen} handleClick={handleClickOnFilterIcon} handleOverlayClick={handleOverlayClick} setFilters={setFilters} />
        </div>
        <div>
            <ShopProductsList productsList={currentItems} />
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
      </div>

      <div
        className={`fixed top-0 mt-[110px] py-5 px-4 left-0 h-full w-full flex flex-col gap-5 rounded-t-2xl bg-white shadow-lg transform transition-transform z-[110] ${isOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <FilterForShop isOpen={isOpen} handleClick={handleClickOnFilterIcon} handleOverlayClick={handleOverlayClick} setFilters={setFilters} />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 -mt-24 w-full h-full bg-gray-800 bg-opacity-50 z-[100]"
          onClick={handleOverlayClick}
        ></div>
      )}
    </div>
  );
}
