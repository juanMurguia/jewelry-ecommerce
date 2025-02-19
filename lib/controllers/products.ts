import { algoliaClient } from "lib/algolia";

export async function findProductById(productId: string) {
  const response = await algoliaClient.getObject({
    indexName: "products",
    objectID: productId,
  });

  return response;
}
