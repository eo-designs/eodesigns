'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PolicyModal } from './PolicyModal';
import { PrivacyPolicyContent, TermsAndConditionsContent } from './PolicyContent';

export function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-[#f7fafc]">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft">
                  <img src="/assets/logo.png" alt="EO Designs" className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-semibold">EO Designs</div>
                  <div className="text-xs text-slate-500">Web • Automation • Tech Support • Media Ops</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-700">
                Engineer-minded digital services for small businesses: fast sites, clean systems, automated workflows, and reliable ongoing support.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="grid gap-2">
                <div className="text-xs font-semibold tracking-wide text-[#1d4ed8]">Site</div>
                <Link className="text-slate-700 hover:text-[#1d4ed8] transition" href="/services">Services</Link>
                <Link className="text-slate-700 hover:text-[#1d4ed8] transition" href="/subscriptions">Subscriptions</Link>
                <Link className="text-slate-700 hover:text-[#1d4ed8] transition" href="/booking">Booking</Link>
                <Link className="text-slate-700 hover:text-[#1d4ed8] transition" href="/contact">Contact</Link>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-semibold tracking-wide text-[#1d4ed8]">Legal</div>
                <div></div>
                <button
                  onClick={() => setIsPrivacyOpen(true)}
                  className="block text-left text-slate-700 hover:text-[#1d4ed8] transition"
                >
                  Privacy Policy
                </button>
                <div></div>
                <div></div>
                <button
                  onClick={() => setIsTermsOpen(true)}
                  className="block text-left text-slate-700 hover:text-[#1d4ed8] transition"
                >
                  Terms & Conditions
                </button>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-wide text-[#1d4ed8]">Get in touch</div>
              <div className="mt-3 text-sm text-slate-700">
                <div>Email: <span className="text-slate-900">inquiry@edgaroregel.com</span></div>
                <div className="mt-1 text-slate-600">Based in CA • Remote-friendly</div>
              </div>
              <div className="mt-4 hr-glow" />
              <div className="mt-4 text-xs text-slate-500">© {new Date().getFullYear()} EO Designs. All rights reserved.</div>
            </div>
          </div>
        </div>
      </footer>

      <PolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </PolicyModal>

      <PolicyModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Terms & Conditions"
      >
        <TermsAndConditionsContent />
      </PolicyModal>
    </>
  );
}
