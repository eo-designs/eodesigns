import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/Section';
import { Badge } from '@/components/Cards';
import { GenericCard } from '@/components/GenericCard';
import { CheckCircle2, Sparkles, Clock, ShieldCheck, Wand2 } from 'lucide-react';

type Tier = {
  name: string;
  price: string;
  tagline: string;
  featured?: boolean;
  bullets: string[];
  bestFor: string[];
};

const tiers: Tier[] = [
  {
    name: 'Essential',
    price: '$250/mo',
    tagline: 'Keep your site healthy with small updates and quick help.',
    bullets: ['Minor content updates', 'Basic monitoring', 'Email support', 'Monthly check-in'],
    bestFor: ['Small business sites', 'Basic maintenance', 'Light ongoing tweaks'],
  },
  {
    name: 'Digital Ops + Automation',
    price: '$600/mo',
    featured: true,
    tagline: 'Priority support + automation-minded improvements.',
    bullets: ['Priority support window', 'Automation help (workflows/scripts)', 'Content ops assist', 'Quarterly optimization pass'],
    bestFor: ['Teams losing time to manual work', 'Content pipelines', 'Growing services'],
  },
  {
    name: 'Growth Partner',
    price: 'Custom',
    tagline: 'Roadmap, builds, integrations, and scaling support.',
    bullets: ['Feature roadmap + implementation', 'Integrations + APIs', 'On-call hours', 'Analytics + conversion improvements'],
    bestFor: ['Businesses ready to scale', 'Client portals + payments', 'Complex automations'],
  },
];

export default function SubscriptionsPage() {
  return (
    <div className="min-h-[60vh]">
      <Section eyebrow="Subscriptions" title="Support tiers that feel like having an engineer on call">
        <div className="grid gap-4 lg:grid-cols-3">
          {tiers.map((t, i) => {
            return (
              <GenericCard
                key={t.name}
                index={i}
                padding="p-6"
                className={t.featured ? 'border-[#2563eb]/30 bg-[#e0e7ff]' : ''}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                  {t.featured ? <Badge>Most popular</Badge> : <Badge>Monthly</Badge>}
                </div>
                <div className="mt-3 text-3xl font-semibold text-slate-900">{t.price}</div>
                <p className="mt-2 text-sm text-slate-600">{t.tagline}</p>

                <div className="mt-5 grid gap-2">
                  {t.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="mt-0.5 text-slate-500" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 hr-glow" />

                <div className="mt-4 text-xs font-semibold tracking-wide text-slate-700">Best for</div>
                <div className="mt-2 grid gap-2">
                  {t.bestFor.map((x) => (
                    <div key={x} className="text-sm text-slate-600">
                      • {x}
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold transition bg-slate-100 text-slate-900 hover:bg-slate-200"
                >
                  Contact to get started
                </Link>
              </GenericCard>
            );
          })}
        </div>

        {/* Payment Form */}
        <GenericCard padding="p-6" className="mt-10 border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="flex items-start gap-4">
            <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700">
              <Clock size={20} />
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-slate-900">Prefer hourly for one-off work?</div>
              <p className="mt-1 text-sm text-slate-600">Small fixes, quick projects, and ad-hoc items work great on an hourly basis.</p>
              <div className="mt-4 text-2xl font-semibold text-slate-900">$75/hr</div>
              <p className="mt-2 text-sm text-slate-600">Perfect for quick tweaks, small bug fixes, and adhoc requests that don't need a subscription.</p>
              <Link
                href="/booking"
                className="mt-4 inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Get started
              </Link>
            </div>
          </div>
        </GenericCard>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { icon: <Clock size={18} />, title: 'Predictable help', body: 'No more scrambling when something breaks—support is already in place.' },
            { icon: <Wand2 size={18} />, title: 'Continuous improvement', body: 'We keep optimizing: speed, SEO, content, workflows, and the tech stack.' },
            { icon: <ShieldCheck size={18} />, title: 'Stability first', body: 'Changes get tracked, documented, and deployed cleanly—like real engineering.' },
          ].map((x, i) => (
            <GenericCard key={x.title} index={i} padding="p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700">
                  {x.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{x.title}</div>
                  <p className="mt-1 text-sm text-slate-600">{x.body}</p>
                </div>
              </div>
            </GenericCard>
          ))}
        </div>

        <GenericCard padding="p-6" className="mt-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700">
                <Sparkles size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">Want subscriptions + payments on the site?</div>
                <p className="mt-1 text-sm text-slate-600">
                  This starter includes placeholders for Stripe (Apple Pay) and booking—ready for the next phase when you're ready.
                </p>
              </div>
            </div>
            <Link href="/services" className="rounded-2xl border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
              See services
            </Link>
          </div>
        </GenericCard>
      </Section>
    </div>
  );
}
