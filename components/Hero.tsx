'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Zap, ShieldCheck } from 'lucide-react';
import { Badge, Card } from '@/components/Cards';
import { AnimatedGrid } from '@/components/AnimatedGrid';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <AnimatedGrid />

      {/* Background video (replace public/video/hero.mp4) */}
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover opacity-10"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/hero-poster.jpg"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Engineer-built systems</Badge>
            <Badge>Automation-first</Badge>
            <Badge>Fast deployment</Badge>
          </div>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-[#0f172a]">
            Web design, automation, and support that stay clear and fast.
          </h1>
          <p className="mt-6 text-lg text-[#1f2937]">
            I build bright, usable websites, automate the repetitive work, and keep your tools running smoothly. Clear docs, clean handoffs, and measurable results.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2563eb] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/30 transition hover:bg-[#1d4ed8] hover:shadow-xl hover:shadow-[#2563eb]/40 hover:scale-[1.02]"
            >
              Book an intro call <ArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#2563eb]/20 bg-white px-5 py-3 text-sm font-semibold text-[#2563eb] transition hover:border-[#2563eb]/60 hover:bg-[#e0e7ff]"
            >
              Explore services
            </Link>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: <Cpu size={18} />,
              title: 'Engineering mindset',
              body: 'Architecture that stays clean as you add features: payments, booking, portals, automation, and more.',
            },
            {
              icon: <Zap size={18} />,
              title: 'Automation + ops',
              body: 'Reduce manual work with scripts, integrations, and repeatable SOPs—built for real-world teams.',
            },
            {
              icon: <ShieldCheck size={18} />,
              title: 'Reliable support',
              body: 'Ongoing help via monthly subscription tiers: updates, monitoring, content ops, and tech troubleshooting.',
            },
          ].map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Card className="p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#2563eb]/30 bg-[#2563eb]/10 text-[#2563eb]">
                    {f.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{f.title}</div>
                    <p className="mt-1 text-sm text-slate-600">{f.body}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
