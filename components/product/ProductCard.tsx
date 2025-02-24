import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const discountedPrice = (
    product.price +
    (product.price * product.discount) / 100
  ).toFixed(2);

  return (
    <Link href={`/products/${product.objectID}`}>
      <div className="flex flex-col shadow-lg bg-transparent text-white">
        <div className="relative w-full h-64 overflow-hidden rounded-lg">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <h2 className="text-xl font-semibold tracking-wide">
            {product.name}
          </h2>
          <p className="text-gray-400 text-sm">{product.description}</p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold text-amber-200">
              ${product.price.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${discountedPrice}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center text-gold-400">
          <Star className="w-5 h-5" />
          <span className="text-sm ml-1 text-gray-300">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>
      </div>
    </Link>
  );
}
