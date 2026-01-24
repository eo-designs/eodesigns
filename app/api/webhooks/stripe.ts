import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.metadata?.customer_id;
        const tier = session.metadata?.tier;

        if (!customerId || !tier) {
          console.error('Missing metadata in checkout session');
          break;
        }

        // Get subscription details from Stripe
        const subscription = await stripe.subscriptions.list({
          customer: session.customer as string,
          limit: 1,
        });

        if (subscription.data.length > 0) {
          const stripeSubscription = subscription.data[0];

          // Create subscription record in Supabase
          const { error } = await supabase.from('subscriptions').insert([
            {
              customer_id: customerId,
              stripe_subscription_id: stripeSubscription.id,
              tier,
              status: stripeSubscription.status,
              current_period_start: (stripeSubscription as any).current_period_start ? new Date((stripeSubscription as any).current_period_start * 1000).toISOString() : null,
              current_period_end: (stripeSubscription as any).current_period_end ? new Date((stripeSubscription as any).current_period_end * 1000).toISOString() : null,
            },
          ]);

          if (error) {
            console.error('Error saving subscription:', error);
          } else {
            console.log(`✅ Subscription created for customer ${customerId} (${tier})`);
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;

        // Update subscription status in Supabase
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: subscription.status,
            current_period_start: (subscription as any).current_period_start ? new Date((subscription as any).current_period_start * 1000).toISOString() : null,
            current_period_end: (subscription as any).current_period_end ? new Date((subscription as any).current_period_end * 1000).toISOString() : null,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        if (error) {
          console.error('Error updating subscription:', error);
        } else {
          console.log(`✅ Subscription updated: ${subscription.id} (${subscription.status})`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;

        // Mark subscription as canceled in Supabase
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        if (error) {
          console.error('Error deleting subscription:', error);
        } else {
          console.log(`✅ Subscription canceled: ${subscription.id}`);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;

        // Create invoice record in Supabase
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('customer_id')
          .eq('stripe_subscription_id', (invoice as any).subscription as string)
          .single();

        if (subscription) {
          const { error } = await supabase.from('invoices').insert([
            {
              customer_id: subscription.customer_id,
              stripe_invoice_id: invoice.id,
              amount_paid: invoice.amount_paid,
              invoice_url: invoice.hosted_invoice_url,
              paid_at: invoice.status_transitions?.paid_at ? new Date(invoice.status_transitions.paid_at * 1000).toISOString() : new Date().toISOString(),
            },
          ]);

          if (error) {
            console.error('Error saving invoice:', error);
          } else {
            console.log(`✅ Invoice recorded: ${invoice.id}`);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook failed' },
      { status: 500 }
    );
  }
}
