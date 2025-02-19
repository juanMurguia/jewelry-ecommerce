"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

function SearchBar({ onSearch }: { onSearch?: (data: any) => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [limit] = useState(searchParams.get("limit") || "5");
  const [offset, setOffset] = useState(searchParams.get("offset") || "0");

  useEffect(() => {
    if (onSearch) {
      // You may use onSearch to trigger external data updates
      onSearch({ q: query, limit, offset });
    }
  }, [query, offset, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${query}&limit=${limit}&offset=0`);
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex items-center border gap-3 px-4 border-gray-500 w-50 max-w-md bg-transparent rounded-none shadow-sm"
      >
        <Search className="text-gray-500 w-5 h-5" />
        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-3 py-1 text-gray-200 rounded-none focus:outline-none"
          required
        />
        <button type="submit" className="hidden" aria-label="Search" />
      </form>
    </div>
  );
}

export default SearchBar;
