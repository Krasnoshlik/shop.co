import Link from 'next/link'
import React from 'react'

export default function PromoBaner() {
  return ( 
    <div className=' max-w-containerScreen px-5 py-2 bg-black text-white text-xs flex justify-center'>
        <p>Sign up and get 20% off to your first order. <Link href={'#'} className=' underline'>Sign Up Now</Link></p>
        </div>
    )
}
