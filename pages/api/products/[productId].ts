import { findProductById } from "lib/controllers/products";
import type { NextApiRequest, NextApiResponse } from "next";
import * as methods from "micro-method-router";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { productId } = req.query;
    const product = await findProductById(productId as string);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send("Product not found");
    }
  },
});
