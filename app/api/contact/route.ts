import { NextResponse } from 'next/server';
import { sendSlackDM } from '@/lib/slack';

export async function POST(req: Request) {
  const formData = await req.formData();

  // Honeypot: bots often fill hidden fields
  const honeypot = String(formData.get('company_website') || '');
  if (honeypot) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const topic = String(formData.get('topic') || '').trim();
  const message = String(formData.get('message') || '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  // For this starter: log the message server-side.
  // When you’re ready, replace this with an email provider:
  // - Resend / SendGrid / Mailgun / Postmark
  // - Or store in DB (Postgres) and add admin view
  console.log('[CONTACT]', {
    at: new Date().toISOString(),
    name,
    email,
    topic,
    message: message.slice(0, 2000),
  });

  // Notify via Slack (channel if configured, else DM)
  try {
    await sendSlackDM({ name, email, topic, message });
  } catch (e) {
    console.warn('[CONTACT] Slack notification failed', e);
  }

  return NextResponse.json({ ok: true });
}
