import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middleware";
import { handler, updateData } from "lib/controllers/user";
import * as methods from "micro-method-router";

export default async function corsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await methods({
    async get(req: NextApiRequest, res: NextApiResponse) {
      const userData = await authMiddleware(req, res, async (decodedToken) => {
        const result = await handler(decodedToken);

        return result;
      });

      if (!userData) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.status(200).json(userData);
    },

    async patch(req: NextApiRequest, res: NextApiResponse) {
      const newData = await updateData(req.body);
      res.status(200).json(newData?.userData);
    },
  })(req, res);
}
