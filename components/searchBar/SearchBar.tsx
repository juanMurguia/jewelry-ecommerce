"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

function SearchBar({ onSearch }: { onSearch?: (data: any) => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [isExpanded, setIsExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${query}`);
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={searchRef}
      className="relative flex items-center search-container rounded-full"
    >
      {/* Search Icon Button */}
      <button
        onClick={() => setIsExpanded(true)}
        aria-label="Search products"
        className="text-gray-400 hover:text-amber-200 transition"
      >
        <Search className="w-5 h-5 cursor-pointer" />
      </button>

      {/* Expanding Search Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center transition-all duration-300 overflow-hidden"
      >
        <div
          className={`relative flex items-center bg-transparent border-b border-gray-500 transition-all duration-300 ${
            isExpanded ? "max-w-48 opacity-100 px-2 py-1" : "max-w-0 opacity-0"
          }`}
        >
          <input
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-white focus:outline-none w-full"
            autoFocus={isExpanded}
          />
          {isExpanded && (
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-white ml-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
