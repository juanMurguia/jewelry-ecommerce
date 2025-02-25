import type { NextApiRequest, NextApiResponse } from "next";
import * as methods from "micro-method-router";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    res.send("soy POST users/cart");
  },
});
