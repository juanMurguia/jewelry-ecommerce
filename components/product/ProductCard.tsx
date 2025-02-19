import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="flex flex-col gap-4 border border-gray-800 rounded-lg shadow-lg p-4 bg-transparent text-white transition-transform transform hover:scale-105">
      {/* Product Image */}
      <div className="relative w-full h-64 overflow-hidden rounded-lg">
        <Image
          src={product.images[0]}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold tracking-wide">{product.name}</h2>
        <p className="text-gray-400 text-sm">{product.description}</p>

        {/* Price & Discount */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-2xl font-bold text-gold-400">
            ${product.price}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-red-500 line-through">
              ${product.price + (product.price * product.discount) / 100}
            </span>
          )}
        </div>
      </div>

      {/* Ratings */}
      <div className="flex items-center mt-2 text-gold-400">
        <Star className="w-5 h-5" />
        <span className="text-sm ml-1 text-gray-300">
          {product.rating} ({product.reviews} reviews)
        </span>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between">
        <button className="px-6 py-3 bg-amber-200 text-gray-900 font-semibold shadow hover:bg-amber-100 transition-all">
          <Link href={`/products/${product.objectID}`}>Buy</Link>{" "}
          <ShoppingCart className="w-5 h-5 inline-block ml-2" />
        </button>
      </div>
    </div>
  );
}
