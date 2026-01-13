'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Section({
  title,
  eyebrow,
  children,
  className,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, amount: 0.2 }}
      className={cn('py-8 md:py-12', className)}
    >
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {eyebrow && (
            <motion.div
              className="text-xs font-semibold tracking-[0.2em] text-[#2563eb] uppercase"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {eyebrow}
            </motion.div>
          )}
          <motion.h2
            className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-[#0f172a]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {title}
          </motion.h2>
        </motion.div>
        <div className="mt-8">
          {children}
        </div>
      </div>
    </motion.section>
  );
}
