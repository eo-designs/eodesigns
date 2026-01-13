'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Card({
  className,
  children,
  index = 0,
  animated = false,
}: {
  className?: string;
  children: React.ReactNode;
  index?: number;
  animated?: boolean;
}) {
  if (!animated) {
    return (
      <div className={cn('rounded-2xl border border-slate-200 bg-white shadow-soft hover:shadow-glow transition-all duration-300', className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      className={cn('rounded-2xl border border-slate-200 bg-white shadow-soft hover:shadow-glow transition-all duration-300', className)}
    >
      {children}
    </motion.div>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#2563eb]/20 bg-[#2563eb]/10 px-3 py-1 text-xs text-[#1d4ed8] font-semibold">
      {children}
    </span>
  );
}
