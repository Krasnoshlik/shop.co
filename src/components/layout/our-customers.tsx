"use client"
import React from 'react'
import { customersComments } from '../../../data/customers-comments'
import CustomerCommentCard from '../ui/customer-comment-card'
import { customerCommentType } from '@/types/product.ds'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function OurCustomers() {
  return (
    <section className='max-w-containerScreen m-auto py-10 flex flex-col gap-5'>
      <div className='flex justify-between items-end mx-4'>
        <h2 className='text-3xl font-extrabold'>OUR HAPPY CUSTOMERS</h2>
      </div>

      <div className=''>
        <Swiper
          slidesPerView={3}
          spaceBetween={0}
          pagination={{
            el: '.custom-swiper-pagination',
            clickable: true,
            renderBullet: (index,className) => {
              return `<span class="${className} custom-pagination-bullet"></span>`;
            },
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
              centeredSlides: true,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {customersComments.map((comment: customerCommentType) => {
            return (
              <SwiperSlide key={comment.id} >
                <div className="slide-content-wrapper">
                <CustomerCommentCard comment={comment} />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className="custom-swiper-pagination"></div>
      </div>
    </section>
  )
}

