import React from "react";
import styled from "styled-components";
import { useGetProduct } from "@/lib/hooks";

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
`;

const ProductData = styled.div`
  font-size: 18px;
  color: #333;
  margin-top: 10px;
`;

function Product({ productId }) {
  const productData = useGetProduct(productId);
  return (
    <ProductContainer>
      <h1>Product Details</h1>
      <ProductData>{JSON.stringify(productData)}</ProductData>
    </ProductContainer>
  );
}

export default Product;
