'use client';

import React from 'react';
import { Section } from '@/components/Section';
import { Badge } from '@/components/Cards';
import { GenericCard } from '@/components/GenericCard';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = React.useState<string>('');
  const formRef = React.useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setMessage('');
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Request failed');
      setStatus('sent');
      setMessage("Got it — I'll reply within 1 business day.");
      formRef.current?.reset();
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.message || 'Something went wrong. Try again.');
    }
  }

  return (
    <div className="min-h-[60vh]">
      <Section eyebrow="Contact" title="Reach out—let’s build something clean and scalable">
        <div className="grid gap-4 lg:grid-cols-5">
          <GenericCard padding="p-6" colSpan="lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">Direct</div>
              <Badge>Replies in <span className="font-semibold">~1 business day</span></Badge>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-700">
              <div className="flex items-center gap-2"><Mail size={16} className="text-slate-500" /> inquiry@edgaroregel.com</div>
              <div className="flex items-center gap-2"><Phone size={16} className="text-slate-500" /> 209-366-8194</div>
              <div className="flex items-center gap-2"><MapPin size={16} className="text-slate-500" /> California • Remote-friendly</div>
            </div>

            <div className="mt-6 hr-glow" />

            <p className="mt-6 text-sm text-slate-600">
              Typical projects: modern websites, booking + payments, automation, media pipelines, and ongoing support tiers.
            </p>
          </GenericCard>

          <GenericCard padding="p-6" colSpan="lg:col-span-3" display="flex" layout="flex-col">
            <div className="text-sm font-semibold text-slate-900">Send a message</div>
            <p className="mt-2 text-sm text-slate-600">
              I read every message personally. Once you submit, I get a Slack notification and will respond within 1 business day.
            </p>

            <form onSubmit={onSubmit} ref={formRef} className="mt-6 grid gap-4">
              {/* Honeypot (bots fill this) */}
              <input name="company_website" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs text-slate-600">Name</label>
                  <input
                    name="name"
                    required
                    className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
                    placeholder="you@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-600">What do you need help with?</label>
                <select
                  name="topic"
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
                  defaultValue="Website"
                >
                  <option>Website</option>
                  <option>Automation</option>
                  <option>Tech Support</option>
                  <option>Media Ops</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-600">Message</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
                  placeholder="Tell me about your project, timeline, and any links."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-[#2563eb] px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-[#1d4ed8] disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'} <Send size={16} />
              </button>

              {message && (
                <div className={`text-sm ${status === 'error' ? 'text-red-600' : 'text-slate-700'}`}>{message}</div>
              )}
            </form>
          </GenericCard>
        </div>
      </Section>
    </div>
  );
}
