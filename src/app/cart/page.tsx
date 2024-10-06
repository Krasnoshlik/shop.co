"use client";
import React, { useEffect, useState } from 'react';
import NextBreadcrumb from '@/components/ui/bread-crumbs';
import { useCart } from '@/context/cart-context';
import Image from 'next/image';
import recycleBinImg from '../../assets/recycle-bin.png';
import HorizontalLine from '@/components/ui/horizontal-line';
import useProducts from '@/hooks/useProducts';

export default function Cart() {
  const { cart, removeFromCart, ChangeQuantity, getItems } = useCart();
  const { productsList, loading } = useProducts();
  const [itemsToShow, setItemsToShow] = useState<any[]>([]);
  const [summary, setSummary] = useState<number>(0);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    if (cart.length === 0) {
      setItemsToShow([]);
    }

    if (loading || cart.length === 0) return;

    const filteredItems = cart.map(cartItem => {
      const product = productsList.find((p) => p.id.toString() === cartItem.addId.toString());
      if (product) {
        return {
          ...product,
          pickedSize: cartItem.pickedSize,
          quantity: cartItem.quantity,
        };
      }
      return null;
    }).filter(item => item !== null);

    setItemsToShow(filteredItems);
    setSummary(filteredItems.reduce((acc, item) => acc + (item.price * item.quantity), 0));

  }, [cart, productsList, loading]);

  console.log(cart)

  return (
    <div className='pb-20 pt-28 max-w-containerScreen m-auto px-2 flex flex-col gap-4'>
      <NextBreadcrumb
        homeElement="Home"
        separator=">"
        capitalizeLinks={true}
      />

      <div className='flex flex-col md:flex-row gap-4 items-center justify-center'>
        <div className='w-full md:w-5/6 flex flex-col gap-4 border rounded-3xl p-3 self-start'>
          {itemsToShow.length === 0 && (
            <div className='w-full text-center my-20 font-bold text-xl'>
              <p>No items in cart</p>
            </div>
          )}
          {
            itemsToShow.map((item: any, index: number) => (
              <div key={index}>
                {index > 0 && <span className='block w-full h-[1px] mb-4 bg-gray-200'></span>}
                <div className='flex gap-5'>
                  <Image src={`https://firebasestorage.googleapis.com/v0/b/shop-co-313bf.appspot.com/o/products%2F${item.img.split('/').pop()}?alt=media`}
                    alt='img' width={100} height={100} className='md:w-[200px]' />
                  <div className='w-full flex flex-col justify-between'>
                    <div>
                      <div className='flex justify-between text-sm'>
                        <p className='font-bold'>{item.title}</p>
                        <button onClick={() => removeFromCart(item.id, item.pickedSize)}>
                          <Image src={recycleBinImg} alt='recycleBinImg' className='min-w-5' />
                        </button>
                      </div>
                      <p className='text-[12px]'>Size: <span className='text-gray-400'>{item.pickedSize}</span></p>
                    </div>

                    <div className='flex justify-between items-end'>
                      <p className='font-bold text-xl'>${item.price}</p>

                      <div className="w-20 flex rounded-3xl bg-[#F0F0F0] py-1 font-medium items-center justify-between text-center text-sm">
                        <button className="w-full" onClick={() => ChangeQuantity(item.id, item.pickedSize, 'minus')}>
                          -
                        </button>
                        <p className="max-w-5 min-w-5">{item.quantity}</p>
                        <button className="w-full" onClick={() => ChangeQuantity(item.id, item.pickedSize, 'plus')}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {itemsToShow.length > 0 && (
          <div className='w-full md:w-max flex flex-col self-start gap-4 border rounded-3xl p-5'>
            <h3 className='font-bold text-black text-xl min-w-[250px]'>Order Summary</h3>

            <div className='flex justify-between text-gray-400'>
              <p>Subtotal</p>
              <p className='font-bold text-black'>${summary}</p>
            </div>

            <div className='flex justify-between text-gray-400'>
              <p>Delivery Fee</p>
              <p className='font-bold text-black'>$15</p>
            </div>

            <HorizontalLine />

            <div className='flex justify-between text-gray-400'>
              <p>Total</p>
              <p className='font-bold text-black'>${summary + 15}</p>
            </div>

            <div className='flex flex-col gap-4'>
              <div className='w-full flex justify-between gap-3'>
                <input type="text" className='max-w-[210px] bg-gray-200 rounded-3xl text-gray-500 pl-4 outline-none' placeholder='Add promo code' />
                <button className='px-6 rounded-3xl bg-black flex items-center justify-center text-white w-full py-3 font-medium lg:hover:bg-white lg:hover:text-black ease-in-out duration-500'>Apply</button>
              </div>
              <button className='bg-black flex rounded-3xl items-center justify-center text-white w-full py-3 font-medium lg:hover:bg-white lg:hover:text-black ease-in-out duration-500'>Go to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
