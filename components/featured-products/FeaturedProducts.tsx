import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { useSearch } from "@/lib/hooks";

export default function FeaturedProducts() {
  const { data } = useSearch({ q: "featured", limit: 3, offset: 0 });
  const products = data?.products?.results[0]?.hits || [];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <h2 className="text-2xl text-gray-100 font-light text-center mb-12">
          Featured Treasures
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              href={`/products/${product.objectID}`}
              key={product.id}
              className="bg-transparent overflow-hidden "
            >
              <div className="relative h-64">
                <Image
                  src={product.image || "https://placeholder.pics/svg/300x300"}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 hover:opacity-90"
                />
              </div>
              <div className="flex flex-col gap-1 pt-2">
                <h3 className="text-md text-gray-100 mb-2 uppercase">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-400">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
