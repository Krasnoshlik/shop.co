import React from 'react'
import Image from 'next/image'
import { browseByDressImg } from '@/app/constants/images-arrays-imports'

export default function BrowseByDress() {
  return (
    <section className=' bg-[#F0F0F0] rounded-[20px] py-5 gap-4 max-w-containerScreen mx-4 flex flex-col justify-center items-center text-center'>
        <h3 className=' font-bold text-3xl'>BROWSE BY <br /> dress STYLE</h3>
        {
            browseByDressImg.map((image, index) => {
                return (
                    <Image key={index} src={image} alt='Image'/>
                )
            })
        }
    </section>
  )
}
