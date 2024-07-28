import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PromoBaner from "./components/ui/sign-up-promo-baner";
import Header from "./components/ui/header";

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
    <html lang="en">
      <body className={inter.className}>
        <PromoBaner/>
        <Header/>
        {children}
      </body>
    </html>
  );
}
