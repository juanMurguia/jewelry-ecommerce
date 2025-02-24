import type { NextApiRequest, NextApiResponse } from "next";
import { algoliaClient } from "lib/algolia";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await algoliaClient.searchSingleIndex({
      indexName: "products",
    });

    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
