import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { useSearch } from "@/lib/hooks";

export default function FeaturedProducts() {
  const { data } = useSearch({ q: "featured", limit: 3, offset: 0 });
  const products = data?.products?.results[0]?.hits || [];

  return (
    <section className="py-16 my-0 sm:my-16 px-16 min-h-dvh flex ">
      <div className="mx-auto flex justify-start flex-col-reverse sm:flex-row sm:justify-center items-center ">
        <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              href={`/products/${product.objectID}`}
              key={product.id}
              className="bg-transparent overflow-hidden "
            >
              <div className="relative h-64">
                <Image
                  src={
                    product.images[0] || "https://placeholder.pics/svg/300x300"
                  }
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 hover:opacity-90"
                />
              </div>
              <div className="flex flex-col gap-1 pt-2">
                <h3 className="text-md text-gray-300 uppercase">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <h2 className="text-4xl font-serif text-gray-100 font-light text-center sm:text-right mb-12">
          Our Featured Treasures.
        </h2>
      </div>
    </section>
  );
}
