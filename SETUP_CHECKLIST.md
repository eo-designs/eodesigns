# Payment System Setup Checklist

## ✅ Already Done
- [x] Stripe + Supabase packages installed
- [x] Supabase client setup (`lib/supabase.ts`)
- [x] Stripe client setup (`lib/stripe.ts`)
- [x] API route for checkout (`app/api/checkout.ts`)
- [x] Webhook handler (`app/api/webhooks/stripe.ts`)
- [x] Customer form component (`components/CustomerForm.tsx`)
- [x] Subscriptions page updated with payment flow
- [x] Environment variable template (`.env.local.example`)

## 🚀 Your Setup Steps

### 1. Create Supabase Project (5 min)
- [ ] Go to https://supabase.com → Sign up
- [ ] Create project named "eo-designs"
- [ ] Go to **Settings > API**
- [ ] Copy `Project URL` → add to `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Copy `anon public` key → add to `.env.local` as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Create Database Tables (2 min)
- [ ] In Supabase, go to **SQL Editor**
- [ ] Copy the SQL from `PAYMENT_SETUP.md` (Step 2)
- [ ] Run the SQL query
- [ ] Verify 3 tables created: `customers`, `subscriptions`, `invoices`

### 3. Create Stripe Account (5 min)
- [ ] Go to https://stripe.com → Sign up
- [ ] Go to **Developers > API Keys**
- [ ] Copy `Publishable Key` → add to `.env.local` as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] Copy `Secret Key` → add to `.env.local` as `STRIPE_SECRET_KEY`

### 4. Create Stripe Products (10 min)
- [ ] In Stripe Dashboard, go to **Products > Create Product**
- [ ] Create 3 products:
  - **Essential**: $149/month
  - **Digital Ops + Automation**: $349/month
  - **Growth Partner**: Custom (no price)
- [ ] Copy each **Price ID** (format: `price_123abc...`)
- [ ] Add to `.env.local`:
  - `NEXT_PUBLIC_STRIPE_PRICE_ESSENTIAL=price_...`
  - `NEXT_PUBLIC_STRIPE_PRICE_DIGITAL_OPS=price_...`
  - `NEXT_PUBLIC_STRIPE_PRICE_GROWTH=price_...`

### 5. Create Stripe Webhook (5 min)
- [ ] In Stripe Dashboard, go to **Developers > Webhooks**
- [ ] Click "Add endpoint"
- [ ] Endpoint URL: `http://localhost:3000/api/webhooks/stripe`
- [ ] Select events:
  - [ ] `checkout.session.completed`
  - [ ] `customer.subscription.updated`
  - [ ] `customer.subscription.deleted`
  - [ ] `invoice.payment_succeeded`
- [ ] Click "Add endpoint"
- [ ] Copy **Signing Secret** → add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

### 6. Test Locally (10 min)
- [ ] Create `.env.local` with all values from steps 1-5
- [ ] Run `npm run dev`
- [ ] Go to http://localhost:3000/subscriptions
- [ ] Click on a tier card (should highlight)
- [ ] Fill in the form with test email/name
- [ ] Click "Proceed to checkout"
- [ ] You should be taken to Stripe test checkout
- [ ] Use test card: `4242 4242 4242 4242`, any future date, any CVC
- [ ] Complete payment
- [ ] Should redirect to `/subscriptions?success=true`
- [ ] Check Supabase: new customer and subscription should appear in `customers` and `subscriptions` tables

### 7. Deploy to Vercel (10 min)
- [ ] Push latest code to GitHub (should already be done)
- [ ] Go to your Vercel project settings
- [ ] Go to **Settings > Environment Variables**
- [ ] Add all variables from `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_SECRET_KEY`
  - `NEXT_PUBLIC_STRIPE_PRICE_ESSENTIAL`
  - `NEXT_PUBLIC_STRIPE_PRICE_DIGITAL_OPS`
  - `NEXT_PUBLIC_STRIPE_PRICE_GROWTH`
  - `STRIPE_WEBHOOK_SECRET`
  - `NEXT_PUBLIC_APP_URL=https://yourdomain.vercel.app`
- [ ] Trigger redeploy
- [ ] Go to Stripe Dashboard → **Developers > Webhooks**
- [ ] Edit webhook endpoint, change URL to: `https://yourdomain.vercel.app/api/webhooks/stripe`
- [ ] Test live payment (use test card again)

## 📝 Notes

- **Test Mode**: Stripe test cards don't charge real money
- **Production Switch**: When ready, go to Stripe Settings and switch from Test to Live mode
- **Customers**: Automatically created in Supabase on first payment
- **Subscriptions**: Stored in database with status tracking
- **Recurring Billing**: Stripe handles automatically
- **Emails**: Stripe sends receipts automatically; customize in Stripe Dashboard

## 🆘 Troubleshooting

**Webhook not firing?**
- Check Stripe Dashboard → Developers > Webhooks → look for failed attempts
- Make sure `STRIPE_WEBHOOK_SECRET` matches your webhook signing secret
- Verify endpoint URL is correct

**Checkout redirecting wrong?**
- Check `NEXT_PUBLIC_APP_URL` is set correctly
- Local: `http://localhost:3000`
- Vercel: `https://yourdomain.vercel.app`

**Customer not appearing in database?**
- Check Supabase logs (SQL Editor)
- Check Stripe logs (Developers > Events)
- Ensure webhook handler is receiving events

**Form not submitting?**
- Check browser console for errors
- Verify all price IDs are set in `.env.local`
- Check Stripe keys are correct
