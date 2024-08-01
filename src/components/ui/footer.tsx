import React from 'react'
import FormForNewsLetter from './form-for-newsletter'
import { footerImg,paymentImg } from '@/constants/images-arrays-imports'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className=' bg-[#F0F0F0] mt-[140px] pb-5'>
        <div className=' max-w-containerScreen m-auto md:flex md:flex-col md:items-center'>
        <div className=' absolute'>
        <FormForNewsLetter/>
        </div>

        <div className=' pt-[200px] mx-4 lg:flex lg:gap-5 lg:pt-[100px]'>
            <div className=' flex flex-col gap-3 lg:justify-end lg:mb-4'>
                <h2 className=' font-extrabold text-3xl'>SHOP.CO</h2>
                <p className=' text-sm text-gray-400 lg:max-w-48'>We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
                <div className=' flex gap-3'>
                    {
                        footerImg.map((img, i) => {
                            return (
                                <Image src={img} key={i} alt='img'/>
                            )
                        })
                    }
            </div>
            </div>

            <div className=' py-8 flex flex-wrap gap-16'>

                <div className=' flex flex-col gap-3'>
                    <h4 className=' font-medium text-sm'>COMPANY</h4>
                    <Link href={'#'} className=' text-sm text-gray-500'>About</Link>
                    <Link href={'#'} className=' text-sm text-gray-500'>Features</Link>
                    <Link href={'#'} className=' text-sm text-gray-500'>Works</Link>
                    <Link href={'#'} className=' text-sm text-gray-500'>Career</Link>
                </div>

                <div className=' flex flex-col gap-3'>
                    <h4 className=' font-medium text-sm'>HELP</h4>
                    <Link href={'#'} className=' text-sm text-gray-500'>Customer Support</Link>
                    <Link href={'#'} className=' text-sm text-gray-500'>Delivery Details</Link>
                    <Link href={'#'} className=' text-sm text-gray-500'>Terms & Conditions</Link>
                    <Link href={'#'} className=' text-sm text-gray-500'>Privacy Policy</Link>
                </div>

                <div className=' flex flex-col gap-3'>
                    <h4 className=' font-medium text-sm'>FAQ</h4>
                    <Link href={'#'} className=' text-sm text-gray-500'>Account</Link>
                    <Link href={'#'} className=' text-sm text-gray-500'>Manage Deliveries</Link>
                    <Link href={'#'} className=' text-sm text-gray-500'>Orders</Link>
                    <Link href={'#'} className=' text-sm text-gray-500'>Payment</Link>
                </div>

                <div className=' flex flex-col gap-3'>
                    <h4 className=' font-medium text-sm'>RESOURCES</h4>
                    <Link href={'#'} className=' text-sm text-gray-500'>Free eBook</Link>
                    <Link href={'#'} className=' text-sm text-gray-500'>Development Tutorial</Link>
                    <Link href={'#'} className=' text-sm text-gray-500'>How to - Blog</Link>
                    <Link href={'#'} className=' text-sm text-gray-500'>Youtube Playlist</Link>
                </div>

            </div>

            </div>

            <span className=' block h-[1px] w-full bg-slate-300'></span>

            <div className=' flex flex-col gap-2 items-center mt-3'>
                <p className=' text-sm text-gray-500'>Shop.co © 2000-2023, All Rights Reserved</p>
                <div className=' flex'>
                {
                    paymentImg.map((img, i) => {
                        return (
                            <Image src={img} key={i} alt='img'/>
                        )
                    })
                }
                </div>
            </div>
        </div>
        
    </footer>
  )
}
