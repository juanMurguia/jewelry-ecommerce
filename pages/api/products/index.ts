import type { NextApiRequest, NextApiResponse } from "next";

import { algoliaClient } from "lib/algolia";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const response = await algoliaClient.searchSingleIndex({
    indexName: "products",
    searchParams: { query: req.query.search as string },
  });

  res.send(response);
}
