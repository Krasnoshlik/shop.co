"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import GrayCrossImg from '../../assets/gray-cross.png'
import HorizontalLine from './horizontal-line'
import CheckboxButton from './buttons/checkbox-button'
import { FilterForShopProps } from '@/types/product.ds'

const FilterForShop: React.FC<FilterForShopProps> = ({handleClick, setFilters }) => {
  const [checkedState, setCheckedState] = useState<{ S: boolean; L: boolean; XL: boolean }>({
    S: false,
    L: false,
    XL: false,
  });
  const [stateForType, setStateForType] = useState<string[]>([]);
  const [stateForPrice, setStateForPrice] = useState<[number | null, number | null]>([null, null]);


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
    setFilters([stateForType, checkedState, stateForPrice]);
  };

  const handleResetFilter = () => {
    setCheckedState({S: false,L: false,XL: false,})
    setStateForType([])
    setStateForPrice([null, null])
    setFilters([])
  }

  const isChecked = (id: string) => stateForType.includes(id);

  return (
        <div className=' flex flex-col gap-5'>
        <div className='flex justify-between'>
          <h2 className='font-extrabold text-xl'>Filters</h2>
          <button onClick={handleClick} className=' md:hidden'>
            <Image src={GrayCrossImg} alt="GrayCrossImg" />
          </button>
        </div>

        <HorizontalLine />

        <div>
        <div className='flex gap-2'>
          <input type="checkbox" id="t-shirt" checked={isChecked("t-shirt")} onChange={handleTypeChange} />
          <p className='text-gray-400'>T-shirts</p>
        </div>
        <div className='flex gap-2'>
          <input type="checkbox" id="jeans" checked={isChecked("jeans")} onChange={handleTypeChange} />
          <p className='text-gray-400'>Jeans</p>
        </div>
        <div className='flex gap-2'>
          <input type="checkbox" id="shirt" checked={isChecked("shirt")} onChange={handleTypeChange} />
          <p className='text-gray-400'>Shirts</p>
        </div>
        <div className='flex gap-2'>
          <input type="checkbox" id="shorts" checked={isChecked("shorts")} onChange={handleTypeChange} />
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
          className='rounded-3xl bg-black text-white w-full py-3 font-medium lg:hover:bg-white lg:hover:text-black ease-in-out duration-500'>
            Apply Filter</button>
          <button className=' text-sm text-red-400' onClick={handleResetFilter}>Reset all filters</button>
      </div>
  )
}

export default FilterForShop;
