import React from "react";
import BlackButton from "../ui/black-button";
import Image from "next/image";

// images imports
import { storesImg } from "../../constants/images-arrays-imports";
import twoPeople from "../../assets/twoPeople.png";
import romb from "../../assets/romb.png";

export default function HomePageFindClothes() {
  return (
    <div className=" bg-[#F2F0F1] w-full flex flex-col justify-center items-center">
      <section className=" max-w-containerScreen pt-6 px-4">
        <div className=" flex flex-col gap-4">
          <h2 className=" font-extrabold text-4xl">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h2>
          <p className=" text-gray-400 text-sm">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <BlackButton text={"Shop Now"} />

          <div className="flex flex-col justify-center items-center gap-3">
            <div className=" flex justify-center">
              <div>
                <h3 className=" font-bold text-2xl">200+</h3>
                <p className=" font-medium text-gray-400 text-sm">
                  International Brands
                </p>
              </div>

              <span className=" block w-[1px] bg-gray-300 mx-4"></span>

              <div>
                <h3 className=" font-bold text-2xl">2,000+</h3>
                <p className=" font-medium text-gray-400 text-sm">
                  High-Quality Products
                </p>
              </div>
            </div>

            <div>
              <h3 className=" font-bold text-2xl">30,000+</h3>
              <p className=" font-medium text-gray-400 text-sm">
                Happy Customers
              </p>
            </div>
          </div>
        </div>

        <div className=" -mx-4">
          <div className=" relative">
            <Image
              src={romb}
              alt="romb"
              width={76}
              height={76}
              className=" absolute right-5 top-10"
            />
          </div>
          <div className=" relative">
            <Image
              src={romb}
              alt="romb"
              width={44}
              height={44}
              className=" absolute left-5 top-[140px]"
            />
          </div>
          <Image src={twoPeople} alt="twoPeople" />
        </div>
      </section>

      <div className=" bg-black py-8 w-full flex flex-wrap gap-6 items-center justify-center">
        {storesImg.map((item, index) => {
          return (
            <Image
              src={item}
              key={index}
              alt="item"
              className=" max-w-32 max-h-6"
            />
          );
        })}
      </div>
    </div>
  );
}
