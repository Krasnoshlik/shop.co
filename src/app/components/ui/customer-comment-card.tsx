import React from 'react'
import Image from 'next/image';
import fullStar from '../../assets/products/fullStar.png';
import greenArrow from '../../assets/greenArrow.png';
import { customerCommentType } from '@/app/types/product.ds';

export default function CustomerCommentCard({comment}: {comment : customerCommentType}) {
  return (
    <div className=' min-w-[338px] min-h-[186px] w-[338px] flex flex-col gap-2 border rounded-3xl p-6 self-center'>
        <div className=' flex gap-1'>
            {
            [fullStar,fullStar,fullStar,fullStar,fullStar,fullStar].map((e,i) => {
                return (
                    <Image src={e} alt='img' key={i} className=' max-w-5'/>
                )
            })
            }
        </div>
        <div className=' flex gap-1'>
        <h4 className=' font-bold text-lg'>{comment.customer}</h4>
        <Image src={greenArrow} alt='greenArrow' height={16} width={26} className=' max-w-6 max-h-6'/>
        </div>

        <p className=' text-sm text-left'>{comment.comment}</p>
    </div>
  )
}
