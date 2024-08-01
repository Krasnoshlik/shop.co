import React from 'react'
import Image from 'next/image'
import GrayCrossImg from '../../assets/gray-cross.png'
import HorizontalLine from './horizontal-line'

export default function MobileFilterForShop({isOpen,handleClick,handleOverlayClick}) {
  return (
    <div>
        <div
        className={`fixed top-0 mt-[110px] py-5 px-4 left-0 h-full w-full flex flex-col gap-5 rounded-t-2xl bg-white shadow-lg transform transition-transform z-[110] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className=' flex justify-between'>
            <h2 className=' font-extrabold text-xl'>Filters</h2>
        <button
          onClick={handleClick}
        >
          <Image src={GrayCrossImg} alt="GrayCrossImg" />
        </button>
        </div>

        <HorizontalLine/>

        <div>
            <div className=' flex gap-2'>
                <input type="checkbox" name="" id="" />
                <p className=' text-gray-400'>T-shirts</p>
            </div>
            <div className=' flex gap-2'>
                <input type="checkbox" name="" id="" />
                <p className=' text-gray-400'>Jeans</p>
            </div>
            <div className=' flex gap-2'>
                <input type="checkbox" name="" id="" />
                <p className=' text-gray-400'>Shirt</p>
            </div>
            <div className=' flex gap-2'>
                <input type="checkbox" name="" id="" />
                <p className=' text-gray-400'>Shorts</p>
            </div>
        </div>

        <HorizontalLine/>

        <div>
            <h2 className=' font-extrabold text-xl'>Price</h2>
        </div>
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
