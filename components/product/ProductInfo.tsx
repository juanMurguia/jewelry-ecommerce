import { useOrder } from "@/lib/hooks";
import { Star, Truck, RotateCcw } from "lucide-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function ProductInfo({ product }: { product: any }) {
  const discountedPrice = product.price * (1 - product.discount / 100);
  const router = useRouter();

  const [orderResData, setOrderResData] = useState<any>(null);
  const data = useOrder(product, { cantidad: 1 });

  useEffect(() => {
    async function fetchOrder() {
      if (!product) return;
      setOrderResData(data);
    }
    fetchOrder();
  }, [product]);

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderResData?.init_point) {
      router.push(orderResData.init_point);
    } else {
      console.log("No init_point found", orderResData);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-100">
        {product.name}
      </h1>
      <div className="mt-3 gap-2">
        <p className="text-3xl text-gray-100">
          ${discountedPrice.toFixed(2)}
          {product.discount > 0 && (
            <span className="pl-2 text-2xl text-gray-600 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </p>
      </div>

      <div className="mt-3">
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <Star
              key={rating}
              className={`h-5 w-5 flex-shrink-0 ${
                product.rating > rating ? "text-amber-300" : "text-gray-300"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="sr-only">{product.rating} out of 5 stars</p>
        <a
          href="#reviews"
          className=" text-sm font-medium text-indigo-300 hover:text-indigo-200"
        >
          {product.reviews} reviews
        </a>
      </div>

      <div>
        <h3 className="sr-only">Description</h3>
        <div className="text-base text-gray-300 space-y-6">
          {product?.description}
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center space-x-2 text-sm gap-2 text-gray-300">
          <Truck className="h-5 w-5 text-gray-400" />
          <span>
            {product?.shipping?.free_shipping
              ? "Free shipping"
              : "Paid shipping"}
          </span>
        </div>
        <div className="pt-2 flex items-center space-x-2  gap-2 text-sm text-gray-300">
          <RotateCcw className="h-5 w-5 text-gray-400" />
          <span>
            {product?.return_policy?.returnable
              ? `${product?.return_policy?.return_window} return window`
              : "No returns"}
          </span>
        </div>
      </div>

      <button
        onClick={handleClick}
        className="mt-8 w-full cursor-pointer bg-amber-200 border border-transparent rounded-md py-3 px-8 flex items-center justify-center font-bold text-gray-900 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-300"
        disabled={!orderResData}
      >
        {orderResData ? "Buy" : "Loading..."}
      </button>
    </div>
  );
}
