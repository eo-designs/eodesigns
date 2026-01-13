'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export function PricingCard({
  name,
  price,
  blurb,
  features,
  cta,
  highlighted = false,
}: {
  name: string;
  price: string;
  blurb: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={cn(
        'relative rounded-2xl border border-white/12 bg-white/5 p-6 shadow-glow backdrop-blur',
        highlighted && 'border-white/25 bg-white/8'
      )}
    >
      {highlighted && (
        <div className="absolute -top-3 left-6 rounded-full border border-white/20 bg-[#05060a] px-3 py-1 text-xs text-white/80">
          Most popular
        </div>
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold tracking-wide text-slate-900">{name}</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">{price}</div>
          <div className="mt-2 text-sm text-slate-600">{blurb}</div>
        </div>
      </div>
      <div className="mt-6 hr-glow" />
      <ul className="mt-6 grid gap-3 text-sm text-slate-700">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <Check className="h-4 w-4 mt-0.5 text-slate-600" />
            <span className="text-slate-700">{f}</span>
          </li>
        ))}
      </ul>
      <a
        href="/booking"
        className={cn(
          'mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition',
          highlighted ? 'bg-white text-black hover:bg-white/90' : 'border border-white/15 bg-white/5 hover:bg-white/10'
        )}
      >
        {cta}
      </a>
    </motion.div>
  );
}
