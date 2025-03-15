import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Metadata } from 'next';

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

export default function RootLayout({
  children, title, className
}: Readonly<{
  children: React.ReactNode;
  title: string;
  className?: string;
}>) {
  return (
    <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{title}</title>
        </head>
      <body
        className={`${className ? className : ""} ${geistSans.variable} ${geistMono.variable} antialiased `}
      >
      <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
