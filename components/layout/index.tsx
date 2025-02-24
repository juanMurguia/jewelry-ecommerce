"use client";
import Header from "./Header";
import Footer from "./Footer";
import Image from "next/image";
import type React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-vignette items-center w-full">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
