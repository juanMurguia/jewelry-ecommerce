import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductSpecs from "@/components/product/ProductSpecs";
import ProductReviews from "@/components/product/ProductReviews";
import RelatedProducts from "@/components/product/RelatedProducts";
import { useGetProduct } from "@/lib/hooks";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import RootLayout from "@/components/layout";

export default function ProductPage() {
  const router = useRouter();
  const { productId } = router.query;

  const { product, isLoading, isError } = useGetProduct(productId as string);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (isError || !product) {
    return <p className="text-center text-gray-500">Product not found.</p>;
  }

  return (
    <RootLayout>
      <div className="max-w-7xl mx-auto px-16 py-16 my-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Left column */}
          <ProductGallery images={product.images} />

          {/* Right column */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <ProductInfo product={product} />
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <ProductSpecs product={product} />
        </div>

        <div className="mt-16 lg:mt-24">
          <ProductReviews rating={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-16 lg:mt-24">
          <RelatedProducts tags={product.tags} currentProductId={product.id} />
        </div>
      </div>
    </RootLayout>
  );
}
