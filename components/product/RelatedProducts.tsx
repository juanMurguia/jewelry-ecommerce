import { useSearch } from "@/lib/hooks";
import Image from "next/image";

export default function RelatedProducts({}: {
  tags: string[];
  currentProductId: string;
}) {
  const { data } = useSearch({ q: "featured", limit: 3, offset: 0 });
  const relatedProducts = data?.products?.results[0]?.hits || [];

  return (
    <div className="border-t border-gray-200 py-8">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-100">
        Related Products
      </h2>
      <div className="grid pt-4 grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {relatedProducts.map((product) => (
          <div key={product.id} className="group relative">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="pt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-300">
                  <a href={`/product/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-100">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
