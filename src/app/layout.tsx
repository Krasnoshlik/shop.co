import {
  ClerkProvider
} from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/header";
import Footer from "../components/ui/footer";

import { CartProvider } from '@/context/cart-context';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "shop.co",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <ToastContainer />
        <CartProvider>
        {children}
        </CartProvider>
        <Footer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
