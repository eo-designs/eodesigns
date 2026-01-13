import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

export const STRIPE_PRICES = {
  essential: process.env.NEXT_PUBLIC_STRIPE_PRICE_ESSENTIAL,
  digitalOps: process.env.NEXT_PUBLIC_STRIPE_PRICE_DIGITAL_OPS,
  growth: process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH,
};
