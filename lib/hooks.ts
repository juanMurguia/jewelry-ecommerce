import useSWR from "swr";
import { fetchAPI, fetchApiAuth, getSavedToken } from "./api";

type Order = {
  cantidad?: number;
};

export function useMe() {
  const { data, error } = useSWR("/me", fetchAPI);

  if (error) {
    return error;
  }

  return data;
}

export function useGetProduct(id: string) {
  const { data, error } = useSWR(
    () => (id ? "products/" + id : null),
    fetchAPI
  );

  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useGetAllProducts() {
  const { data, error } = useSWR("/products/all", fetchAPI);
  return {
    products: data?.hits,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useSearch(searchParams: any) {
  const api = `/search?q=${searchParams.q}&limit=${searchParams.limit}&offset=${searchParams.offset}`;
  const { data, error, isLoading } = useSWR(
    searchParams ? api : null,
    fetchAPI
  );
  return { data, isLoading };
}

export async function useOrder(product: any, options: { cantidad: number }) {
  if (!product?.objectID) return null;

  const api = `/api/order?productId=${product.objectID}`;
  const token = await getSavedToken();

  const option: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include", // Ensure the credentials are correctly set
    body: JSON.stringify({
      productId: product.objectID,
      productName: product.name,
      productDescription: product.description,
      productPrice: product.price,
      quantity: options.cantidad,
    }),
  };

  try {
    const data = await fetchApiAuth([api, option]);
    return data;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}
