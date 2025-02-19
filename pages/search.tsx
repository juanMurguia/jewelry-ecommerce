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
      <div className="flex flex-col mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Search Results</h1>

        {/* Barra de Búsqueda */}
        <div className="flex justify-center mb-4">
          <form
            onSubmit={handleSubmit}
            className="flex items-center border gap-3 px-4 border-gray-300 py-3 w-full max-w-md bg-white rounded-lg shadow-sm"
          >
            <Search className="text-gray-500 w-5 h-5" />
            <input
              type="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 text-gray-800 rounded-md focus:outline-none"
            />
          </form>
        </div>

        {/* Resultados */}
        {isLoading ? (
          <div className="flex justify-center mt-6">
            <Loader className="w-6 h-6 animate-spin text-gray-500" />
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
