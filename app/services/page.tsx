import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/Section';
import { Badge } from '@/components/Cards';
import { GenericCard } from '@/components/GenericCard';
import { Bot, Camera, ClipboardList, Cloud, Code2, Gauge, Headphones, Paintbrush, ShieldCheck, Workflow, Database, Video } from 'lucide-react';

type Item = { icon: React.ReactNode; title: string; body: string };
type Bucket = { name: string; badge: string; items: Item[] };

const buckets: Bucket[] = [
  {
    name: 'Web & product builds',
    badge: 'Modern code, full control',
    items: [
      { icon: <Code2 size={18} />, title: 'Custom websites (no Wix)', body: 'Fast, SEO-friendly sites with clean code you own. Built to scale with payments, booking, and portals.' },
      { icon: <Gauge size={18} />, title: 'Performance tuning', body: 'Speed, Core Web Vitals, SEO foundations, analytics, and conversion-focused UX.' },
      { icon: <Paintbrush size={18} />, title: 'Brand + UI polish', body: 'Design systems, landing pages, digital business cards, and print-ready assets.' },
    ],
  },
  {
    name: 'Automation & ops',
    badge: 'Reduce manual work',
    items: [
      { icon: <Workflow size={18} />, title: 'Workflow automation', body: 'Repeatable scripts and integrations (uploads, intake forms, notifications, file organization, reporting).' },
      { icon: <Cloud size={18} />, title: 'Cloud + sync troubleshooting', body: 'Google Drive, Dropbox, backups, permissions, and reliability fixes.' },
      { icon: <ClipboardList size={18} />, title: 'SOPs & documentation', body: 'Clear step-by-step docs for you or your team so systems stay consistent.' },
    ],
  },
  {
    name: 'Media & content systems',
    badge: 'GoPro + short-form pipeline',
    items: [
      { icon: <Camera size={18} />, title: 'GoPro pipelines', body: 'Organize footage, prevent duplicate uploads, fix format issues, and keep projects structured.' },
      { icon: <Video size={18} />, title: 'Shorts creation workflow', body: 'Tooling + templates for cutting highlight reels, captions, and content production routines.' },
      { icon: <Bot size={18} />, title: 'AI-assisted editing', body: 'Set up AI tools (Descript, Opus, etc.) and a repeatable workflow that your team can run.' },
    ],
  },
  {
    name: 'Web backends (when you’re ready)',
    badge: 'APIs, auth, payments',
    items: [
      { icon: <Database size={18} />, title: 'Backend APIs', body: 'Add secure server-side APIs for forms, client portals, admin tools, and integrations.' },
      { icon: <ShieldCheck size={18} />, title: 'Payments + subscriptions', body: 'Stripe + Apple Pay setup, subscription tiers, invoicing flows, and webhook reliability.' },
      { icon: <Headphones size={18} />, title: 'Ongoing support', body: 'Subscription support tiers so you’re never blocked by tech issues.' },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-[60vh]">
      <Section eyebrow="Services" title="Engineer-minded services that scale with you">
        <div className="grid gap-4">
          {buckets.map((b, i) => (
            <GenericCard key={b.name} index={i} padding="p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-lg font-semibold text-slate-900">{b.name}</div>
                  <div className="mt-1 text-sm text-slate-600">{b.badge}</div>
                </div>
                <Badge>EO Designs</Badge>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {b.items.map((i) => (
                  <GenericCard key={i.title} padding="p-4" backgroundColor="bg-slate-50">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700">
                        {i.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{i.title}</div>
                        <p className="mt-1 text-sm text-slate-600">{i.body}</p>
                      </div>
                    </div>
                  </GenericCard>
                ))}
              </div>
            </GenericCard>
          ))}
        </div>

        <GenericCard padding="p-6" className="mt-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">Not sure which bucket you need?</div>
              <p className="mt-1 text-sm text-slate-600">Book a 15–20 minute intro call and I'll propose the fastest path.</p>
            </div>
            <div className="flex gap-2">
              <Link href="/booking" className="rounded-2xl border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 shadow-glow transition hover:bg-slate-200">
                Book intro call
              </Link>
              <Link href="/subscriptions" className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                View subscriptions
              </Link>
            </div>
          </div>
        </GenericCard>
      </Section>
    </div>
  );
}
