"use client"
import React, { useState } from "react";
import Image from "next/image";
import accountImage from "../../assets/account.png";
import searchImage from "../../assets/search.png";
import cartImage from "../../assets/cart.png";
import burgerMenu from '../../assets/burgerMenu.png'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="relative max-w-containerScreen py-3 px-4 flex justify-between items-center bg-white">
      <div className="flex items-center">
        <button
          onClick={handleClick}
          className="flex flex-col justify-center items-center space-y-1 focus:outline-none"
        >
          <Image src={burgerMenu} alt="burgerMenu" width={24} height={24}/>
        </button>

        <h1 className="ml-4 font-bold text-2xl">SHOP.CO</h1>
      </div>
      <div className="flex gap-3 max-h-6">
        <Image src={searchImage} width={24} height={24} alt="Search" />
        <Image src={cartImage} width={24} height={24} alt="Cart" />
        <Image src={accountImage} width={24} height={24} alt="Account" />
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
  );
}


