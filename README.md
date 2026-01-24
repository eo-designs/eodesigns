# EO Designs — Website Starter (Next.js)

This is a trendy, tech-forward **Next.js + Tailwind** starter for your EO Designs website:
- Home (hero with background video + subtle motion)
- Services
- Subscriptions
- Booking (Cal.com/Calendly iframe placeholder)
- Contact form (posts to a server-side API route)

## 1) Run locally
```bash
npm install
npm run dev
```
Then open: http://localhost:3000

## 2) Replace placeholders
### Hero background video
Replace:
- `public/video/hero.mp4`
- `public/assets/hero-poster.jpg` (optional poster image)

### Contact email + phone
Edit placeholders in:
- `components/Footer.tsx`
- `app/contact/page.tsx`

### Booking embed
Replace the iframe URL in:
- `app/booking/page.tsx`

## 3) Contact form behavior
The contact form posts to:
- `app/api/contact/route.ts`

Right now it **logs** submissions server-side. When you're ready:
- send email via Resend/SendGrid/Mailgun, or
- store in a database (Postgres) + build an admin view.

## 4) Deploy (future)
This is designed to deploy cleanly on Vercel:
- push to GitHub
- import into Vercel
- add env vars for email provider / Stripe later

## Notes
- Keep secrets server-side only (never in `NEXT_PUBLIC_*`).
- Stripe + Apple Pay can be added later via server routes and webhooks.
