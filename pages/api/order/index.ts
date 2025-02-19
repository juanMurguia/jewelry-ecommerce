import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddleware } from "lib/middleware";
import { createPreference } from "lib/mercadopago";
import { createNewOrder } from "lib/controllers/order";
import { handler } from "lib/controllers/user";
import Cors from "cors";
import { algoliaClient } from "lib/algolia";

const cors = Cors({
  methods: ["GET", "POST", "PATCH", "OPTIONS", "HEAD"],
  allowedHeaders: ["Authorization", "Content-Type"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function corsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  await methods({
    async post(req: NextApiRequest, res: NextApiResponse) {
      try {
        const {
          productId,
          productName,
          productDescription,
          productPrice,
          quantity,
        } = req.body;

        if (!productId || !productName || !productPrice) {
          return res.status(400).json({ error: "Missing product information" });
        }

        const { userID } = await authMiddleware(req, res, handler);

        console.log("User ID:", userID);

        const foundProduct = await algoliaClient.getObject({
          indexName: "products",
          objectID: productId.toString(),
        });

        // Crear nueva orden en la base de datos
        const { aditional_info, orderData, orderID } = await createNewOrder(
          foundProduct,
          productId,
          userID
        );

        // Crear preferencia de pago en MercadoPago
        const preference = await createPreference({
          productId,
          productName,
          productDescription,
          productPrice,
          quantity,
          transactionId: orderID, // Usamos el orderID como transactionId
        });

        res
          .status(200)
          .json({ init_point: preference.init_point, orderData, orderID });
      } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    },
  })(req, res);
}
