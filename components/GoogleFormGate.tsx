'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GenericCard } from './GenericCard';

const FORM_COMPLETION_KEY = 'eo_booking_form_completed';
const FORM_COMPLETION_TIME_KEY = 'eo_booking_form_completed_time';

export function GoogleFormGate({ children }: { children: React.ReactNode }) {
  const [formCompleted, setFormCompleted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const markCompleted = () => {
    localStorage.setItem(FORM_COMPLETION_KEY, 'true');
    localStorage.setItem(FORM_COMPLETION_TIME_KEY, Date.now().toString());
    setFormCompleted(true);
  };

  useEffect(() => {
    // If redirected back with ?form_submitted=true, mark complete and clean URL
    if (searchParams.get('form_submitted') === 'true') {
      markCompleted();
      router.replace('/booking');
      return;
    }

    // Otherwise, honor completion for 24h
    const completed = localStorage.getItem(FORM_COMPLETION_KEY) === 'true';
    const completedTime = localStorage.getItem(FORM_COMPLETION_TIME_KEY);
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    if (completed && completedTime && now - parseInt(completedTime) < dayMs) {
      setFormCompleted(true);
    } else if (completed) {
      localStorage.removeItem(FORM_COMPLETION_KEY);
      localStorage.removeItem(FORM_COMPLETION_TIME_KEY);
      setFormCompleted(false);
    }

    setIsMounted(true);
  }, [searchParams, router]);

  if (!isMounted) return null;

  if (!formCompleted) {
    return (
      <GenericCard padding="p-6" display="flex" layout="flex-col">
        <div className="text-sm font-semibold text-slate-900">Complete this quick form first</div>
        <p className="mt-2 text-sm text-slate-600">
          We need a quick intake before booking. Submit the form to unlock the calendar.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-semibold">How to proceed:</p>
          <ol className="mt-2 list-decimal pl-5 space-y-1">
            <li>Open the form in a new tab.</li>
            <li>Submit it fully.</li>
            <li>On the confirmation page, click the link that returns you here (it should point to /booking?form_submitted=true).</li>
          </ol>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScfKCfcLI9J2q5gJHBRAB0YG_Glmm23TDEhpbe3kI9mSeRnrQ/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Open the form
          </a>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          After you submit, you'll be sent back here automatically. No manual bypass.
        </p>
      </GenericCard>
    );
  }

  return <>{children}</>;
}
