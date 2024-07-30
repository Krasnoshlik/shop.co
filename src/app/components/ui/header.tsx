"use client"
import React, { useState } from "react";
import Image from "next/image";
import accountImage from "../../assets/account.png";
import searchImage from "../../assets/search.png";
import cartImage from "../../assets/cart.png";
import burgerMenu from '../../assets/burgerMenu.png'
import searchGray from '../../assets/search-gray.png'
import PromoBaner from "./sign-up-promo-baner";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  return (
    <div className=" fixed w-full z-50">
    <PromoBaner/>
    <div className=" bg-white">
    <header className="relative max-w-containerScreen m-auto py-3 px-4 flex justify-between items-center ">
      <div className="flex items-center md:justify-between md:gap-7 lg:gap-20">
        <button
          onClick={handleClick}
          className="flex flex-col justify-center items-center space-y-1 focus:outline-none md:hidden"
        >
          <Image src={burgerMenu} alt="burgerMenu" width={24} height={24}/>
        </button>

        <h1 className="ml-4 font-bold text-2xl md:ml-0 md:hover:cursor-pointer">SHOP.CO</h1>
        <nav className=" hidden md:flex gap-4 font-medium">
          <a href="#" className="text-black lg:hover:text-gray-500">
          Shop
          </a>
          <a href="#" className="text-black lg:hover:text-gray-500">
            On Sale
          </a>
          <a href="#" className="text-black lg:hover:text-gray-500">
            New Arrivals
          </a>
          <a href="#" className="text-black lg:hover:text-gray-500">
            Brands
          </a>
        </nav>
      </div>

      <div className="flex gap-3 max-h-6">
        <div className=" hidden md:flex md:justify-center md:bg-gray-300 md:px-4 md:h-7 md:rounded-3xl">
          <button className=" w-6">
            <Image src={searchGray} alt="searchGray" className=" w-4"/>
          </button>
          <input type="text" className="bg-gray-300 text-xs outline-none" placeholder="Search for products..."/>
        </div>
        <Image src={searchImage} width={24} height={24} alt="Search" className=" md:hover:cursor-pointer md:hidden"/>
        <Image src={cartImage} width={24} height={24} alt="Cart" className=" md:hover:cursor-pointer"/>
        <Image src={accountImage} width={24} height={24} alt="Account" className=" md:hover:cursor-pointer"/>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={handleClick}
          className="absolute top-4 right-4 text-black"
        >
          x
        </button>
        <nav className="mt-16 flex flex-col space-y-4 px-6">
          <a href="#" className="text-black">
            Home
          </a>
          <a href="#" className="text-black">
            Shop
          </a>
          <a href="#" className="text-black">
            About
          </a>
          <a href="#" className="text-black">
            Contact
          </a>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-40"
          onClick={handleOverlayClick}
        ></div>
      )}
    </header>
    </div>
    </div>
  );
}


