import React from 'react'
import Image from 'next/image'
import { customersComments } from '../../../../data/customers-comments'
import CustomerCommentCard from '../ui/customer-comment-card'
import { customerCommentType } from '@/app/types/product.ds'
import arrowLeft from '../../assets/arrow-left.png';
import arrowRight from '../../assets/arrow-right.png'

export default function OurCustomers() {
  return (
    <section className=' max-w-containerScreen m-auto mx-4 py-5 flex flex-col gap-5'>
        <div className=' flex justify-between items-end'>
        <h2 className=' text-3xl font-extrabold'>OUR HAPPY CUSTOMERS</h2>

        <div className=' flex gap-2 items-center justify-center'>
            <button>
            <Image src={arrowLeft} alt='arrowLeft' width={24} height={24}/>
            </button>

            <button>
            <Image src={arrowRight} alt='arrowRight' width={24} height={24}/>
            </button>
        </div>
        </div>

        <div className=' flex gap-3 overflow-auto'>
        {
            customersComments.map((comment: customerCommentType) => {
                return (
                    <CustomerCommentCard comment={comment} key={comment.id}/>
                )
            })
        }
        </div>
    </section>
  )
}
