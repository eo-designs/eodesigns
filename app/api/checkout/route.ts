import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, name, tier } = await req.json();

    console.log('Checkout request:', { email, name, tier });

    // Basic validation
    if (!email || !name || !tier) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if Stripe/Supabase are configured
    const hasStripe = !!process.env.STRIPE_SECRET_KEY;
    const hasSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

    console.log('Configuration:', { hasStripe, hasSupabase });

    // DEMO MODE - no Stripe/Supabase setup yet
    if (!hasStripe || !hasSupabase) {
      console.log('🎬 DEMO MODE - Simulating checkout');
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const demoUrl = `${appUrl}/demo/success?demo=true&tier=${tier}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
      console.log('Redirecting to:', demoUrl);
      return NextResponse.json({ url: demoUrl });
    }

    // REAL MODE - use actual Stripe/Supabase
    console.log('✅ REAL MODE - Using Stripe and Supabase');
    
    const { stripe, STRIPE_PRICES } = await import('@/lib/stripe');
    const { supabase } = await import('@/lib/supabase');

    if (!STRIPE_PRICES[tier as keyof typeof STRIPE_PRICES]) {
      return NextResponse.json(
        { error: `Invalid tier: ${tier}` },
        { status: 400 }
      );
    }

    // Check if customer exists
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single();

    let stripeCustomer: any;
    let customer = existingCustomer;

    if (!customer) {
      // Create Stripe customer
      stripeCustomer = await stripe.customers.create({ email, name });

      // Create in Supabase
      const { data: newCustomer, error } = await supabase
        .from('customers')
        .insert([
          {
            email,
            name,
            stripe_customer_id: stripeCustomer.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      customer = newCustomer;
    } else {
      stripeCustomer = { id: customer.stripe_customer_id };
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      line_items: [
        {
          price: STRIPE_PRICES[tier as keyof typeof STRIPE_PRICES],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscriptions?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscriptions?canceled=true`,
      metadata: { customer_id: customer.id, tier },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('❌ Checkout error:', error);
    const message = error instanceof Error ? error.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
