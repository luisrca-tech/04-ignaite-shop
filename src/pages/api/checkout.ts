import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";
import { ProductProps } from "@/contexts/BagContext";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { line_items } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!line_items || !Array.isArray(line_items)) {
    return res.status(400).json({ error: 'Invalid line items data.' });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const items = line_items.map((item: ProductProps) => ({
    price: item.product.defaultPriceId,
    quantity: item.product.quantity
  }));

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: items
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  });
}