# Payment System Setup Guide (Stripe + Supabase)

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up (free)
3. Create a new project (name it "eo-designs")
4. Wait for it to initialize (~2 min)
5. Go to **Settings > API** and copy:
   - `Project URL` (your NEXT_PUBLIC_SUPABASE_URL)
   - `anon public` key (your NEXT_PUBLIC_SUPABASE_ANON_KEY)

## Step 2: Create Database Tables

In Supabase, go to **SQL Editor** and run this:

```sql
-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  tier TEXT NOT NULL, -- 'essential', 'digital-ops', 'growth-partner'
  status TEXT NOT NULL, -- 'active', 'canceled', 'past_due'
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Invoices table (for receipts)
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  stripe_invoice_id TEXT UNIQUE NOT NULL,
  amount_paid INT, -- in cents
  invoice_url TEXT,
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
```

## Step 3: Create Stripe Account & Keys

1. Go to https://stripe.com
2. Sign up (free)
3. Go to **Developers > API Keys**
4. Copy your:
   - `Publishable Key` (your NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
   - `Secret Key` (your STRIPE_SECRET_KEY - keep private!)

## Step 4: Create Stripe Products

In Stripe Dashboard, go to **Products** and create 3 products:

1. **Essential** - $149/month
2. **Digital Ops + Automation** - $349/month  
3. **Growth Partner** - Custom (don't set price, will be manual)

Copy the **Price IDs** from each product (looks like `price_123abc...`)

## Step 5: Set Environment Variables

Create/update `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Stripe Price IDs
NEXT_PUBLIC_STRIPE_PRICE_ESSENTIAL=price_...
NEXT_PUBLIC_STRIPE_PRICE_DIGITAL_OPS=price_...
NEXT_PUBLIC_STRIPE_PRICE_GROWTH=price_...

# Webhook Secret (set after creating webhook)
STRIPE_WEBHOOK_SECRET=whsec_...

# Your domain for success redirects
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 6: Create Stripe Webhook

1. In Stripe Dashboard, go to **Developers > Webhooks**
2. Click "Add endpoint"
3. Endpoint URL: `https://yoursite.vercel.app/api/webhooks/stripe` (or localhost:3000/api/webhooks/stripe for testing)
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
5. Copy the **Signing Secret** → `STRIPE_WEBHOOK_SECRET` in `.env.local`

## Step 7: Test Locally

1. Run `npm run dev`
2. Go to subscriptions page
3. Click "Start with intro call" → should go through checkout
4. Use Stripe test card: `4242 4242 4242 4242`, any future date, any CVC

## Deployment to Vercel

1. Push to GitHub
2. In Vercel dashboard, go to **Settings > Environment Variables**
3. Add all the `.env.local` variables
4. Update webhook URL in Stripe to point to production domain
5. Deploy!

---

## File Structure

```
lib/
  stripe.ts          # Stripe client setup
  supabase.ts        # Supabase client setup
  
app/
  api/
    checkout.ts              # Create checkout session
    webhooks/
      stripe.ts              # Handle webhook events
  
components/
  CustomerForm.tsx           # Sign up & select tier
  SubscriptionStatus.tsx     # Show active subscription (optional)
```
