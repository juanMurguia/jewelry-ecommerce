import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import RootLayout from "@/components/layout";
import { useGetAllProducts } from "@/lib/hooks";
import Link from "next/link";
import { FilterIcon } from "lucide-react";

const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];

export default function ProductListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const { products, isLoading } = useGetAllProducts();
  console.log(products);

  // Filtrar productos según la categoría seleccionada
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products?.filter((product) => product.category === selectedCategory);

  return (
    <RootLayout>
      <div className="h-full w-full py-16 my-16 px-16">
        <main>
          <div className="flex flex-col md:flex-row gap-8">
            <aside
              className={`w-full md:w-64 ${
                showFilters ? "flex" : "hidden md:block"
              }`}
            >
              <div className="sticky top-8 flex flex-col h-full w-full">
                <h2 className="text-xl font-semibold pb-5">Categories</h2>
                <ul className="space-y-2 w-full">
                  {categories.map((category) => (
                    <li key={category} className="w-full">
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left py-2 px-4 rounded-none cursor-pointer  ${
                          selectedCategory === category
                            ? "bg-white text-black"
                            : "hover:bg-gray-900"
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Botón para mostrar/ocultar filtros en dispositivos móviles */}

            {/* Product grid */}
            <div className="flex-1">
              <div className="flex flex-row justify-between items-center pb-5">
                <h1 className="text-xl font-bold ">Our Collection</h1>
                <div className="md:hidden flex">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="cursor-pointer border-1 border-gray-600 flex"
                  >
                    <FilterIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                  <p>Loading products...</p>
                ) : (
                  filteredProducts?.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.objectID}`}
                      className="bg-transparent border-1 border-gray-600  rounded-none overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                    >
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-400 mb-4">{product.category}</p>
                        <div className="flex flex-col justify-between items-start gap-2">
                          <span className="text-xl font-bold">
                            ${product.price}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </RootLayout>
  );
}
