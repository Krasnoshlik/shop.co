"use client"
import Link from 'next/link'
import React, { useState } from 'react'

export default function PromoBaner() {
  const [hiddeBanner, setHiddeBanner] = useState(true);

  return ( 
    <>
    {hiddeBanner &&
    <div className=' px-5 py-2 bg-black text-white text-xs flex justify-center md:gap-6'>
        <p>Sign up and get 20% off to your first order. <Link href={'#'} className=' underline'>Sign Up Now</Link></p>
        <button className='hidden md:block font-extrabold ' onClick={() => setHiddeBanner(false)}>x</button>
    </div>
    }
    </>
    )
}
