import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("A chave secreta do Stripe não está definida.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
  appInfo: {
    name: 'Ignite Shop',
  }
});
