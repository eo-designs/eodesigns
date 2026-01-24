'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import React from 'react';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/subscriptions', label: 'Subscriptions' },
  { href: '/booking', label: 'Booking' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="relative h-24 w-24 overflow-hidden">
            {/* Logo displayed at public/assets/logo.png */}
            <img
              src="/assets/logo.png"
              alt="EO Designs"
              className="h-full w-full object-cover origin-center"
              style={{ transform: 'scale(1.7)' }}
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">EO Designs</div>
            <div className="text-xs text-slate-500">Engineering-grade web + automation</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm transition",
                  active ? "bg-[#e0e7ff] text-[#1d4ed8] border border-[#c7d2fe]" : "text-slate-700 hover:text-[#1d4ed8] hover:bg-[#e0e7ff]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/booking"
            className="ml-2 rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-[#1d4ed8]"
          >
            Book intro call
          </Link>
        </nav>

        <button
          className="md:hidden rounded-xl border border-slate-200 bg-white p-2 text-slate-800"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 grid gap-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm transition hover:bg-[#e0e7ff]",
                    active ? "bg-[#e0e7ff] text-[#1d4ed8]" : "text-slate-700"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-[#2563eb] px-4 py-2 text-center text-sm font-semibold text-white shadow-glow"
            >
              Book intro call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
