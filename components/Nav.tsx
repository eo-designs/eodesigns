'use client';

import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';
import { LogoMark } from '@/components/LogoMark';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/subscriptions', label: 'Subscriptions' },
  { href: '/booking', label: 'Booking' },
  { href: '/contact', label: 'Contact' },
];

export function Nav() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10 bg-[#05060a]/60">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide text-slate-900">EO Designs</div>
              <div className="text-xs text-slate-600">Engineering-grade digital systems</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-slate-700 hover:text-slate-900 transition">
                {l.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="rounded-full bg-white text-slate-900 px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
            >
              Book Intro Call
            </Link>
          </nav>

          <button
            className="md:hidden rounded-lg border border-white/15 px-3 py-2 text-sm"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            Menu
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="grid gap-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/booking"
                className="rounded-lg bg-white text-black px-3 py-2 text-sm font-semibold hover:bg-white/90 transition"
                onClick={() => setOpen(false)}
              >
                Book Intro Call
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
