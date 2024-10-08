"use client";
import React, { useState } from "react";
import Image from "next/image";
import accountImage from "../../assets/account.png";
import searchImage from "../../assets/search.png";
import cartImage from "../../assets/cart.png";
import burgerMenu from "../../assets/burgerMenu.png";
import PromoBaner from "./sign-up-promo-baner";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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
      <PromoBaner />
      <div className=" bg-white border-b">
        <header className="relative max-w-containerScreen m-auto py-3 px-4 flex justify-between items-center ">
          <div className="flex items-center md:justify-between md:gap-7 lg:gap-20">
            <button
              onClick={handleClick}
              className="flex flex-col justify-center items-center space-y-1 focus:outline-none md:hidden"
            >
              <Image src={burgerMenu} alt="burgerMenu" width={24} height={24} />
            </button>

            <Link href={"/"}>
              <h1 className="ml-4 font-bold text-2xl md:ml-0 md:hover:cursor-pointer">
                SHOP.CO
              </h1>
            </Link>
            <nav className=" hidden md:flex gap-4 font-medium">
              <a href="/shop" className="text-black lg:hover:text-gray-500">
                Shop
              </a>
              <a href="#" className="text-black lg:hover:text-gray-500 line-through">
                On Sale
              </a>
              <a href="#" className="text-black lg:hover:text-gray-500 line-through">
                New Arrivals
              </a>
              <a href="#" className="text-black lg:hover:text-gray-500 line-through">
                Brands
              </a>
            </nav>
          </div>

          <div className="flex gap-3 max-h-6">
            <Image
              src={searchImage}
              width={24}
              height={24}
              alt="Search"
              className=" md:hover:cursor-pointer md:hidden"
            />
            <Link href={"/cart"}>
              <Image
                src={cartImage}
                width={24}
                height={24}
                alt="Cart"
                className=" md:hover:cursor-pointer"
              />
            </Link>
            <SignedOut>
            <SignInButton mode="modal">
              <button className="md:hover:cursor-pointer">
                <Image
                  src={accountImage}
                  width={24}
                  height={24}
                  alt="Account"
                />
                </button>
                </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
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
              <a href="/" className="text-black">
                Home
              </a>
              <a href="/shop" className="text-black">
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
