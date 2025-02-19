"use client";
import Header from "./Header";
import Footer from "./Footer";
import type React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-grow flex flex-col px-16 py-6 justify-center items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
