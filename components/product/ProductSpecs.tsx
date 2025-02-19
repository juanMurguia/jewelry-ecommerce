export default function ProductSpecs({ product }: { product: any }) {
  return (
    <div className="border-t border-gray-200 py-8">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-100">
        Specifications
      </h2>
      <div className=" prose prose-sm text-gray-300">
        <ul role="list">
          <li>Brand: {product?.brand ?? "Unknown"}</li>
          <li>SKU: {product?.sku ?? "N/A"}</li>
          <li>Weight: {product?.weight ?? "Not specified"}</li>
          <li>
            Dimensions: {product?.dimensions?.width ?? "?"} x{" "}
            {product?.dimensions?.height ?? "?"} x{" "}
            {product?.dimensions?.depth ?? "?"}
          </li>
          <li>
            Materials: {product?.materials?.join(", ") ?? "Not specified"}
          </li>
          <li>
            Gemstone:{" "}
            {product?.gemstone
              ? `${product.gemstone.type ?? "Unknown"}, ${
                  product.gemstone.carat ?? "?"
                } carat, 
         ${product.gemstone.cut ?? "?"} cut, Color: ${
                  product.gemstone.color ?? "?"
                }, 
         Clarity: ${product.gemstone.clarity ?? "?"}`
              : "No gemstone info"}
          </li>
        </ul>
      </div>
    </div>
  );
}
