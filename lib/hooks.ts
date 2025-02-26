import useSWR, { mutate } from "swr";
import { fetchAPI, fetchApiAuth, getSavedToken } from "./api";
import { useAtom } from "jotai";
import { userAtom } from "./Atoms/userAtom";

export function useMe() {
  const [user, setUser] = useAtom(userAtom);
  const { data, error } = useSWR("/me", fetchAPI, {
    revalidateOnFocus: false,
  });

  // Only update the atom if the user is logged in
  if (data && !error && data !== user) {
    setUser(data);
  }

  return data;
}

// Helper function to force refetch
export function refreshUser() {
  mutate("/me");
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
