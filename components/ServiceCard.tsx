'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { cn } from '@/lib/utils';

export function ServiceCard({
  title,
  description,
  bullets,
  icon,
  className,
}: {
  title: string;
  description: string;
  bullets: string[];
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={cn('rounded-2xl border border-white/12 bg-white/5 p-6 shadow-glow backdrop-blur', className)}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl border border-white/12 bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          <div className="text-sm text-slate-600">{description}</div>
        </div>
      </div>
      <ul className="mt-5 grid gap-2 text-sm text-slate-700">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="text-slate-700">{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
