'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How long does shipping take?', a: 'Most orders arrive within 7-14 business days worldwide, with express options available at checkout.' },
  { q: 'What is your return policy?', a: 'We offer 30-day easy returns on unused items in original packaging. See our Return Policy page for details.' },
  { q: 'Which payment methods do you accept?', a: 'We accept Visa, MasterCard, PayPal, Stripe, Apple Pay, Google Pay, and Cash on Delivery in select regions.' },
  { q: 'How do I track my order?', a: 'Use the Track Order page with your order number to see real-time shipping status.' },
  { q: 'Do you ship internationally?', a: 'Yes, we offer free worldwide shipping on all orders.' },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="container-px mx-auto max-w-3xl py-16">
      <h1 className="mb-10 text-center section-title">Frequently Asked Questions</h1>
      <div className="space-y-3">
        {faqs.map((item, idx) => (
          <div key={item.q} className="card overflow-hidden">
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-brand-navy"
            >
              {item.q}
              <ChevronDown size={16} className={`transition-transform ${open === idx ? 'rotate-180 text-brand-blue' : ''}`} />
            </button>
            {open === idx && <p className="px-5 pb-4 text-sm text-slate-600">{item.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
