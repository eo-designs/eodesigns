'use client';

import React, { useState } from 'react';
import { Mail, User } from 'lucide-react';

interface CustomerFormProps {
  tier: 'essential' | 'digital-ops' | 'growth-partner';
  onSuccess?: () => void;
}

export function CustomerForm({ tier, onSuccess }: CustomerFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'redirecting'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStatus('submitting');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, tier }),
      });

      const data = await response.json();

      console.log('Checkout response:', { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      if (!data.url) {
        throw new Error('No checkout URL returned');
      }

      // Redirect to Stripe checkout or demo page
      setStatus('redirecting');
      console.log('Redirecting to:', data.url);
      window.location.href = data.url;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Something went wrong';
      console.error('Checkout error:', errorMsg, err);
      setError(errorMsg);
      setStatus('idle');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <div>
        <label className="text-xs text-slate-600">Your name</label>
        <div className="mt-1 relative flex items-center">
          <User size={16} className="absolute left-3 text-slate-400" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
            placeholder="Edgar Oregel"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-slate-600">Email address</label>
        <div className="mt-1 relative flex items-center">
          <Mail size={16} className="absolute left-3 text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-2xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
            placeholder="you@domain.com"
          />
        </div>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button
        type="submit"
        disabled={loading || status === 'redirecting'}
        className="mt-2 inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-[#2563eb] px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-[#1d4ed8] disabled:opacity-50"
      >
        {status === 'redirecting' ? 'Redirecting to checkout...' : status === 'submitting' ? 'Processing...' : 'Proceed to checkout'}
      </button>

      <p className="text-xs text-slate-500">
        We'll create your account and send you a receipt. You can manage your subscription anytime.
      </p>
    </form>
  );
}
