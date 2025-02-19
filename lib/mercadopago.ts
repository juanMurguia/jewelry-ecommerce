import {
  MercadoPagoConfig,
  MerchantOrder,
  Payment,
  Preference,
} from "mercadopago";

type CreatePrefOptions = {
  productName: string;
  productDescription: string;
  productId: string;
  productPrice: number;
  transactionId: string;
  quantity?: number;
};

const BASE_URL = process.env.VERCEL_URL || "localhost:3000";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_TOKEN ?? process.env.MP_TOKEN ?? "",
  options: { timeout: 5000, idempotencyKey: "abc" },
});

const preference = new Preference(client);

export async function createPreference(options: CreatePrefOptions) {
  return preference.create({
    body: {
      items: [
        {
          id: options.productId,
          title: options.productName,
          description: options.productDescription,
          quantity: 1,
          currency_id: "ARS",
          unit_price: options.productPrice,
        },
      ],
      back_urls: {
        success: "https://" + BASE_URL + "/thank_you",
        failure: "https://" + BASE_URL + "/failure",
        pending: "https://" + BASE_URL + "/pending",
      },
      external_reference: options.transactionId,
    },
  });
}

export async function getMerchantOrder(merchantOrderID) {
  const merchantOrder = new MerchantOrder(client);
  return merchantOrder.get(merchantOrderID);
}

export async function getPayment(paymentID) {
  const payment = new Payment(client);
  return payment.get(paymentID);
}
