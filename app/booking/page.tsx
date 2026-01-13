import Link from 'next/link';
import { Section } from '@/components/Section';
import { Card, Badge } from '@/components/Cards';

export default function BookingPage() {
  return (
    <div className="min-h-[60vh]">
      <Section eyebrow="Booking" title="Book an intro call">
        <div className="grid gap-4 lg:grid-cols-5">
          <Card animated index={0} className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">What we'll cover</div>
              <Badge>15–20 min</Badge>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-600">
              <div>• Your goals + constraints</div>
              <div>• Quick audit of current setup (if any)</div>
              <div>• Recommended path + timeline</div>
              <div>• Pricing: hourly vs subscription</div>
            </div>

            <div className="mt-6 hr-glow" />
            <div className="mt-6 text-sm font-semibold text-slate-900">Before we meet</div>
            <p className="mt-2 text-sm text-slate-600">
              If you have links, examples, or access details, bring them. If not, no worries—this call is to align on direction.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              Prefer email instead? Contact me
            </Link>
          </Card>

          <Card animated index={1} className="p-6 lg:col-span-3">
            <div className="text-sm font-semibold text-slate-900">Scheduler embed (placeholder)</div>
            <p className="mt-2 text-sm text-slate-600">
              Drop your Cal.com or Calendly embed here. Replace the iframe URL with your scheduling link.
            </p>

            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <iframe
                title="Booking"
                src="https://cal.com/your-username/intro"
                className="h-[650px] w-full"
              />
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Tip: If you want availability to sync with Google Calendar, connect it in your scheduler settings.
            </p>
          </Card>
        </div>
      </Section>
    </div>
  );
}
