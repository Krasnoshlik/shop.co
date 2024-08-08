"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import NextBreadcrumb from "@/components/ui/bread-crumbs";
import { productsList } from "../../../../data/products";
import { Product } from "@/types/product.ds";
import RaitingStarts from "@/components/ui/raiting-starts";
import HorizontalLine from "@/components/ui/horizontal-line";
import { customersComments } from "../../../../data/customers-comments";
import CustomerCommentCard from "@/components/ui/customer-comment-card";
import { useCart } from '@/context/cart-context';

const tabsArr = ["Product Details", "Raiting & Reviews", "FAQs"];

export default function ItemReview() {
  const [sizeChoose, setSizeChoose] = useState("");
  const [tabsChoose, setTabsChoose] = useState("Product Details");
  const [count, setCount] = useState(1);
  const { cart, addToCart } = useCart();

  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const product: Product | undefined =
    productsList !== undefined
      ? productsList.find((item) => item.id === Number(slug))
      : productsList[0];

  if (!product) {
    return <div>Product not found</div>;
  }
  const sizesArr = product?.sizes.split(" ");

  const plusButton = () => {
    setCount(count + 1);
  };

  const minusButton = () => {
    count > 1 ? setCount(count - 1) : setCount(1);
  };

  function handleAddToCart(p:number,q: number,s: string) {
    if(sizeChoose.length === 0) {alert('Please pick product size')}
    else addToCart(p,q,s);
  };


  return (
    <div className="pb-20 pt-28 max-w-containerScreen m-auto px-2">
      <NextBreadcrumb homeElement="Home" separator=">" capitalizeLinks={true} />

      <div className=" mt-5 w-full flex items-center ">
        <div className=" w-full flex flex-col gap-1">
          <div className=" flex flex-col md:flex-row gap-2">
          <Image src={product.img} alt={product.title} className=" w-full max-w-[600px]" />

          <div className=" md:w-full">
          <h2 className=" text-xl font-bold">{product.title}</h2>
          <div className=" flex gap-2 items-center">
            <RaitingStarts starsNum={product.raiting} />
            <span>{product.raiting}/5</span>
          </div>
          <p className=" font-bold text-xl">$ {product.price}</p>
          <HorizontalLine />
          <div className=" flex gap-2">
            {sizesArr.map((e, i) => {
              return (
                <button
                  key={i}
                  onClick={() => setSizeChoose(e)}
                  className={` px-5 rounded-2xl font-bold text-gray-400 m-1 border-[1px] border-gray-300 bg-[#f9f9f9] ${
                    sizeChoose === e ? "bg-black text-white border-white" : ""
                  } }`}
                >
                  {e}
                </button>
              );
            })}
          </div>
          <HorizontalLine />

          <div className="py-3 flex max-h-16 gap-2">
            <div className=" w-28 flex rounded-3xl bg-[#F0F0F0] py-1 font-bold items-center justify-between text-center">
              <button onClick={minusButton} className=" w-full text-lg">
                -
              </button>
              <p className=" max-w-5 min-w-5">{count}</p>
              <button onClick={plusButton} className=" w-full text-lg">
                +
              </button>
            </div>

            <button 
            className=' rounded-3xl bg-black flex items-center justify-center text-white w-full py-3 font-medium lg:hover:bg-white lg:hover:text-black ease-in-out duration-500'
            onClick={() => handleAddToCart(product.id, count, sizeChoose)}>Add to Cart</button>
            </div>
            </div>
          </div>

          <div>
            <div className=" flex justify-between border-b-2 mb-4 max-w-[550px]">
              {tabsArr.map((e, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => setTabsChoose(e)}
                    className={`font-medium py-2 ${
                      tabsChoose === e ? "border-b-2 border-black" : ""
                    }`}
                  >
                    {e}
                  </button>
                );
              })}
            </div>
            {tabsChoose === "Product Details" && (
              <div className=" flex flex-col gap-3">
                <h3 className=" text-xl font-extrabold">Style and Fit</h3>
                <ul>
                  <li>
                    <span className=" font-bold">Cut and Fit: </span> Checkered
                    shirts come in various cuts, including slim fit, regular
                    fit, and relaxed fit. They may also feature different collar
                    styles, such as button-down or spread collars.
                  </li>
                  <li>
                    <span className=" font-bold">Sleeve Length: </span>
                    Available in both long-sleeve and short-sleeve versions,
                    catering to different seasons and occasions.
                  </li>
                  <li>
                    <span className=" font-bold">
                      Buttons and Pockets:
                    </span>
                    Typically, checkered shirts have button closures and may
                    feature one or two breast pockets.
                  </li>
                </ul>

                <h3 className=" text-xl font-extrabold">
                  Usage and Versatility
                </h3>
                <ul>
                  <li>
                    <span className=" font-bold">Casual Wear: </span> Often worn
                    casually, checkered shirts pair well with jeans, chinos, and
                    shorts. They can be worn untucked or tucked in, depending on
                    the look desired.
                  </li>
                  <li>
                    <span className=" font-bold">Layering: </span> In colder
                    weather, they can be layered over t-shirts or under jackets
                    and sweaters.
                  </li>
                  <li>
                    <span className=" font-bold">Formal Variants: </span> Some
                    checkered shirts are designed for more formal settings, with
                    subtler patterns and finer fabrics, suitable for business
                    casual attire.
                  </li>
                </ul>
              </div>
            )}
            {tabsChoose === 'Raiting & Reviews' && (
                <div className=" flex flex-col gap-5 md:flex-row">
                {customersComments.map((e,i) => {
                  if(i < 3)
                  return (
                    <CustomerCommentCard comment={e} key={i}/>
                  )
                })}
                </div>
            )}
            {tabsChoose === 'FAQs' && (
                  <div className=" flex flex-col gap-5">
                    <h3 className=" text-xl font-extrabold">General Questions</h3>
                <ul className=" flex flex-col gap-4">
                  <li>
                    <span className=" font-bold">What types of clothing do you sell?: </span> <br />We offer a wide range of clothing including tops, bottoms, dresses, outerwear, activewear, and accessories for men, women, and children.
                  </li>
                  <li>
                    <span className=" font-bold">Do you have physical stores?: </span> <br />
                    Currently, we are an online-only store. We do not have any physical retail locations.
                  </li>
                  <li>
                    <span className=" font-bold">
                    How do I contact customer service?:
                    </span> <br />
                    You can reach our customer service team via email at support@yourshop.com or call us at 1-800-123-4567 from 9 AM to 5 PM (EST), Monday through Friday.
                  </li>
                </ul>
                  </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
