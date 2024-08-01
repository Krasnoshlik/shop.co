import React from 'react'
import Image from 'next/image'
import { browseByDressImg } from '@/constants/images-arrays-imports'

export default function BrowseByDress() {
  return (
    <div className=' max-w-containerScreen m-auto'>
    <section className=' bg-[#F0F0F0] rounded-[20px] py-5 gap-4 mx-4 flex flex-col justify-center items-center text-center'>
        <h3 className=' font-bold text-3xl'>BROWSE BY <br className=' lg:hidden'/> dress STYLE</h3>
        <div className=' flex flex-col gap-4 md:flex-row md:flex-wrap lg:px-40 justify-center items-center'>
        {
            browseByDressImg.map((image, index) => {
                return (
                    <Image key={index} src={image} alt='Image'/>
                )
            })
        }
        </div>
    </section>
    </div>
  )
}
