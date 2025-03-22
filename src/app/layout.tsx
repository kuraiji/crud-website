import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Metadata } from 'next';
import {getShoppingCart, putShoppingCart} from "@/app/actions";
import {ShoppingCartRequestType} from "@/lib/definitions";

export const metadata: Metadata = {
    title: "Default",
    description: "Default page",
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children, title, className
}: Readonly<{
  children: React.ReactNode;
  title: string;
  className?: string;
}>) {
    let shoppingcart: ShoppingCartRequestType | null;
    try {
        shoppingcart = await getShoppingCart();
        if(!shoppingcart) {
            await putShoppingCart();
        }
    }
    catch (_) {
        shoppingcart = null;
    }
  return (
    <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{title}</title>
        </head>
      <body
        className={`${className ? className : ""} ${geistSans.variable} ${geistMono.variable} antialiased `}
      >
      <Header shoppingcart={shoppingcart}/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
