import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_PRICES } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email, name, tier } = await req.json();

    if (!email || !name || !tier) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!STRIPE_PRICES[tier as keyof typeof STRIPE_PRICES]) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Check if customer exists in Supabase
    let customer = await supabase.from('customers').select('*').eq('email', email).single();

    // Create Stripe customer
    let stripeCustomer = null;
    if (!customer.data) {
      // New customer - create in Stripe first
      stripeCustomer = await stripe.customers.create({
        email,
        name,
      });

      // Then create in Supabase
      const { data: newCustomer, error } = await supabase.from('customers').insert([
        {
          email,
          name,
          stripe_customer_id: stripeCustomer.id,
        },
      ]).select().single();

      if (error) throw error;
      customer.data = newCustomer;
    } else {
      // Existing customer - use their Stripe ID
      stripeCustomer = { id: customer.data.stripe_customer_id };
    }

    // Create checkout session
    const priceId = STRIPE_PRICES[tier as keyof typeof STRIPE_PRICES];
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscriptions?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscriptions?canceled=true`,
      metadata: {
        customer_id: customer.data.id,
        tier,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    );
  }
}
