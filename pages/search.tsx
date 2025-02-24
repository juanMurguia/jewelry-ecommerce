"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearch } from "@/lib/hooks"; // Hook de búsqueda
import { Loader, Search } from "lucide-react";
import RootLayout from "@/components/layout";
import ProductCard from "@/components/product/ProductCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") || "";
  const limit = searchParams.get("limit") || "5";
  const offset = searchParams.get("offset") || "0";

  const [searchState, setSearchState] = useState({
    q: query,
    limit,
    offset,
  });

  const [inputValue, setInputValue] = useState(query);

  const { data, isLoading } = useSearch(searchState);

  useEffect(() => {
    setSearchState({ q: query, limit, offset });
    setInputValue(query);
  }, [query, limit, offset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    router.push(
      `/search?q=${encodeURIComponent(inputValue)}&limit=${limit}&offset=0`
    );
  };

  return (
    <RootLayout>
      <div className="flex flex-col mx-auto py-16 my-16 px-16 w-full">
        <h1 className="text-2xl font-serif text-left mb-8">Search Results</h1>
        {/* Resultados */}
        {isLoading ? (
          <div className="flex justify-center mt-6">
            <Loader className="w-6 h-6 animate-spin text-gray-500" />
          </div>
        ) : (
          <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {data?.products?.results?.[0]?.hits?.length > 0 ? (
              data.products.results[0].hits.map((product: any) => (
                <li key={product.objectID}>
                  <ProductCard product={product} />
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No results found.
              </p>
            )}
          </ul>
        )}
      </div>
    </RootLayout>
  );
}
