"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import GrayCrossImg from '../../assets/gray-cross.png'
import HorizontalLine from './horizontal-line'
import CheckboxButton from './checkbox-button'
import { MobileFilterForShopProps } from '@/types/product.ds'

const MobileFilterForShop: React.FC<MobileFilterForShopProps> = ({ isOpen, handleClick, handleOverlayClick }) => {
  const [checkedState, setCheckedState] = useState<{ S: boolean; L: boolean; XL: boolean }>({
    S: false,
    L: false,
    XL: false,
  });
  const [stateForType, setStateForType] = useState<string[]>([]);
  const [stateForPrice, setStateForPrice] = useState<[number | null, number | null]>([null, null]);

  const [stateForAllFilters, setStateForAllFilters] = useState<[string[], { S: boolean; L: boolean; XL: boolean }, [number | null, number | null]]>([[], { S: false, L: false, XL: false }, [null, null]]);

  const handleToggle = (option: 'S' | 'L' | 'XL') => (newState: boolean) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [option]: newState,
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setStateForType((prevState) =>
      checked ? [...prevState, id] : prevState.filter((type) => type !== id)
    );
  };

  const handleFromToPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const numericValue = value ? parseFloat(value) : null;
    setStateForPrice((prevState) =>
      id === 'From' ? [numericValue, prevState[1]] : [prevState[0], numericValue]
    );
  };

  const handleApplyFilter = () => {
    setStateForAllFilters([stateForType, checkedState, stateForPrice]);
  };

  useEffect(() => {
    console.log(stateForAllFilters)
  },[stateForAllFilters])

  return (
    <div>
      <div
        className={`fixed top-0 mt-[110px] py-5 px-4 left-0 h-full w-full flex flex-col gap-5 rounded-t-2xl bg-white shadow-lg transform transition-transform z-[110] ${isOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <div className='flex justify-between'>
          <h2 className='font-extrabold text-xl'>Filters</h2>
          <button onClick={handleClick}>
            <Image src={GrayCrossImg} alt="GrayCrossImg" />
          </button>
        </div>

        <HorizontalLine />

        <div>
          <div className='flex gap-2'>
            <input type="checkbox" id="t-shirts" onChange={handleTypeChange} />
            <p className='text-gray-400'>T-shirts</p>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id="jeans" onChange={handleTypeChange} />
            <p className='text-gray-400'>Jeans</p>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id="shirt" onChange={handleTypeChange} />
            <p className='text-gray-400'>Shirt</p>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id="shorts" onChange={handleTypeChange} />
            <p className='text-gray-400'>Shorts</p>
          </div>
        </div>

        <HorizontalLine />

        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center'>
            <h2 className='font-extrabold text-xl'>Price</h2>
            <p className='text-sm font-medium text-gray-400'>Min 10/Max 300</p>
          </div>
          <div className='flex justify-between gap-5'>
            <input type="number" id="From" placeholder='From' className='border w-1/2 py-1 px-2 rounded outline-none' onChange={handleFromToPrice} />
            <input type="number" id="To" placeholder='To' className='border w-1/2 py-1 px-2 rounded outline-none' onChange={handleFromToPrice} />
          </div>
        </div>

        <HorizontalLine />

        <div>
          <h2 className='font-extrabold text-xl'>Size</h2>
          <div>
            <CheckboxButton
              label="S"
              checked={checkedState.S}
              onToggle={handleToggle('S')}
            />
            <CheckboxButton
              label="L"
              checked={checkedState.L}
              onToggle={handleToggle('L')}
            />
            <CheckboxButton
              label="XL"
              checked={checkedState.XL}
              onToggle={handleToggle('XL')}
            />
          </div>
        </div>
        <button
          onClick={handleApplyFilter}
          className='rounded-3xl bg-black text-white w-full py-3 font-medium lg:hover:bg-white lg:hover:text-black ease-in-out duration-500'>Apply Filter</button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 -mt-24 w-full h-full bg-gray-800 bg-opacity-50 z-[100]"
          onClick={handleOverlayClick}
        ></div>
      )}
    </div>
  )
}

export default MobileFilterForShop;
