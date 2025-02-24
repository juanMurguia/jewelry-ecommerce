"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images }: { images: string[] }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="flex flex-col">
      {/* Main image */}
      <div className="aspect-w-1 aspect-h-1 w-full">
        <Image
          src={images[currentImage] || "https://placeholder.pics/svg/300x300"}
          alt="Product image"
          width={600}
          height={600}
          className="w-full h-full object-center object-cover rounded-none shadow-lg"
        />
      </div>

      {/* Image selector */}
      <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
        <div className="grid grid-cols-4 gap-6">
          {images.map((image, index) => (
            <button
              key={image}
              className="relative h-24 bg-white rounded-none flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
              onClick={() => setCurrentImage(index)}
            >
              <span className="sr-only">View image {index + 1}</span>
              <Image
                src={image || "https://placeholder.pics/svg/300x300"}
                alt=""
                width={96}
                height={96}
                className="w-full h-full object-center object-cover rounded-none"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
