'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { GenericCard } from '@/components/GenericCard';
import { Badge } from '@/components/Cards';
import { Bot, Camera, Wrench, LayoutTemplate, Rocket, CheckCircle2 } from 'lucide-react';

const servicesPreview = [
  {
    icon: <LayoutTemplate size={18} />,
    title: 'Web design & builds',
    body: 'Modern, fast, SEO-friendly sites. Ready for payments, booking, and scalable features.',
  },
  {
    icon: <Bot size={18} />,
    title: 'Automation & systems',
    body: 'Scripts, integrations, and workflows that remove repetitive work (uploads, forms, CRM, ops).',
  },
  {
    icon: <Camera size={18} />,
    title: 'Media ops (GoPro + shorts)',
    body: 'Organize footage, fix upload pipelines, generate shorts, and build repeatable content systems.',
  },
  {
    icon: <Wrench size={18} />,
    title: 'Tech support & troubleshooting',
    body: 'Fast help for devices, cloud sync, streaming setups, and business tools—without the chaos.',
  },
];

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />

      <Section eyebrow="What I do" title="End-to-end digital execution for small businesses">
        <div className="grid gap-4 md:grid-cols-2">
          {servicesPreview.map((s, i) => (
            <GenericCard key={s.title} index={i} animated padding="p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#2563eb]/30 bg-[#2563eb]/10 text-[#2563eb]">
                  {s.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold">{s.title}</div>
                  <p className="mt-1 text-sm text-slate-600">{s.body}</p>
                </div>
              </div>
            </GenericCard>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl border border-[#a78bfa]/50 bg-[#a78bfa]/10 px-5 py-3 text-sm font-semibold text-[#a78bfa] transition hover:border-[#a78bfa] hover:bg-[#a78bfa]/20 hover:shadow-lg hover:shadow-[#a78bfa]/30"
          >
            View all services
          </Link>
        </div>
      </Section>

      <Section eyebrow="How we work" title="Built like an engineering project">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Discovery → spec',
              body: 'Quick intake, goals, constraints, and a clean plan. No fluff; clear deliverables.',
            },
            {
              title: 'Build → iterate',
              body: 'Ship fast, review, and refine. Modular code and documentation so you can scale.',
            },
            {
              title: 'Launch → support',
              body: 'Deploy, monitor, and maintain. Subscription tiers available for ongoing updates.',
            },
          ].map((x, i) => (
            <GenericCard key={x.title} index={i} animated padding="p-5">
              <div className="text-sm font-semibold">{x.title}</div>
              <p className="mt-1 text-sm text-slate-600">{x.body}</p>
            </GenericCard>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <Badge>Documentation-first</Badge>
          <Badge>Automation-minded</Badge>
          <Badge>Performance + SEO</Badge>
          <Badge>Scalable architecture</Badge>
        </div>
      </Section>

      <Section eyebrow="Subscriptions" title="Ongoing support tiers (so you’re never stuck)">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              name: 'Essential',
              price: '$149/mo',
              points: ['Small updates', 'Basic monitoring', 'Email support', 'Monthly check-in'],
            },
            {
              name: 'Digital Ops + Automation',
              price: '$349/mo',
              points: ['Priority support', 'Automation help', 'Content ops assist', 'Quarterly optimization'],
              featured: true,
            },
            {
              name: 'Growth Partner',
              price: 'Custom',
              points: ['Roadmap + builds', 'Integrations + APIs', 'On-call hours', 'Scaling + analytics'],
            },
          ].map((p, i) => (
            <GenericCard
              key={p.name}
              index={i}
              animated
              padding="p-6"
              className={p.featured ? 'border-[#2563eb]/30 bg-gradient-to-br from-[#e0e7ff] to-white shadow-soft' : ''}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{p.name}</div>
                {p.featured && <Badge>Most popular</Badge>}
              </div>
              <div className="mt-3 text-2xl font-semibold">{p.price}</div>
              <div className="mt-4 grid gap-2">
                {p.points.map((pt) => (
                  <div key={pt} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-[#22c55e]" />
                    {pt}
                  </div>
                ))}
              </div>
              <Link
                href="/subscriptions"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-[#2563eb]/30 bg-white px-4 py-2 text-sm font-semibold text-[#1d4ed8] transition hover:border-[#2563eb]/60 hover:bg-[#e0e7ff]"
              >
                See details
              </Link>
            </GenericCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Results" title="Fast, clean, and built to scale">
        <div className="grid gap-4 md:grid-cols-3">
          {[ 
            { icon: <Rocket size={18} />, title: 'Ship quickly', body: 'From idea to live site without months of overhead.' },
            { icon: <CheckCircle2 size={18} />, title: 'Stay maintainable', body: 'Clean structure so future edits aren’t painful.' },
            { icon: <Bot size={18} />, title: 'Automate the boring', body: 'Turn repeated tasks into one-click workflows.' },
          ].map((k, i) => (
            <GenericCard key={k.title} index={i} animated padding="p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#22c55e]/30 bg-[#22c55e]/10 text-[#15803d]">
                  {k.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold">{k.title}</div>
                  <p className="mt-1 text-sm text-slate-600">{k.body}</p>
                </div>
              </div>
            </GenericCard>
          ))}
        </div>

        <GenericCard className="mt-8 p-6" display="flex" layout="flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold">Ready to build your next system?</div>
            <p className="mt-1 text-sm text-slate-600">Book an intro call and I'll map the quickest path from today → live + scalable.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/booking" className="rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-[#1d4ed8] hover:scale-[1.02]">
              Book intro call
            </Link>
            <Link href="/contact" className="rounded-2xl border-2 border-[#22c55e]/30 bg-white px-5 py-3 text-sm font-semibold text-[#15803d] transition hover:border-[#22c55e]/60 hover:bg-[#ecfdf3]">
              Contact
            </Link>
          </div>
        </GenericCard>
      </Section>
    </div>
  );
}
