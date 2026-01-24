import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Allow missing env vars for demo mode - create a dummy client if needed
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({ select: () => ({ eq: () => ({ single: () => ({ data: null, error: null }) }) }) }),
    } as any;

export type Customer = {
  id: string;
  email: string;
  name: string;
  stripe_customer_id: string | null;
  created_at: string;
};

export type Subscription = {
  id: string;
  customer_id: string;
  stripe_subscription_id: string;
  tier: 'essential' | 'digital-ops' | 'growth-partner';
  status: 'active' | 'canceled' | 'past_due';
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  stripe_invoice_id: string;
  amount_paid: number | null;
  invoice_url: string | null;
  paid_at: string | null;
  created_at: string;
};
