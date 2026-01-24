'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function DemoSuccessPage() {
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier');
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const isDemo = searchParams.get('demo') === 'true';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">
          ✨ Demo Flow Complete!
        </h1>

        <p className="text-slate-600 text-center mb-6">
          Here is what the payment confirmation looks like:
        </p>

        <div className="space-y-4 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Name</p>
            <p className="text-sm font-semibold text-slate-900 mt-1">{name || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Email</p>
            <p className="text-sm font-semibold text-slate-900 mt-1 break-all">{email || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Tier</p>
            <p className="text-sm font-semibold text-slate-900 mt-1">{tier || 'Not selected'}</p>
          </div>
        </div>

        {isDemo && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Demo Mode:</strong> This is the simulated checkout flow. When you set up real Stripe + Supabase, payments will process here.
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Link
            href="/subscriptions"
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-slate-900 text-white px-4 py-3 text-sm font-semibold hover:bg-slate-800 transition"
          >
            Back to Subscriptions
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full rounded-2xl border border-slate-300 bg-white text-slate-900 px-4 py-3 text-sm font-semibold hover:bg-slate-50 transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
