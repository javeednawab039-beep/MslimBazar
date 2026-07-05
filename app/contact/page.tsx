'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="container-px mx-auto max-w-5xl py-16">
      <h1 className="mb-4 text-center section-title">Contact Us</h1>
      <p className="mx-auto mb-12 max-w-xl text-center text-slate-600">
        Questions about an order, a product, or a partnership? Our team responds within 24 hours.
      </p>

      <div className="grid gap-10 sm:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-0.5 text-brand-blue" />
            <div>
              <p className="font-semibold text-brand-navy">Email</p>
              <p className="text-sm text-slate-500">support@northwellstore.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} className="mt-0.5 text-brand-blue" />
            <div>
              <p className="font-semibold text-brand-navy">Phone</p>
              <p className="text-sm text-slate-500">+1 (800) 555-0134</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 text-brand-blue" />
            <div>
              <p className="font-semibold text-brand-navy">Support Hours</p>
              <p className="text-sm text-slate-500">24/7, worldwide</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Your Name" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
            <input required type="email" placeholder="Your Email" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
          </div>
          <input placeholder="Subject" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
          <textarea required rows={5} placeholder="Your Message" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
          <button type="submit" className="btn-primary w-full">Send Message</button>
          {sent && <p className="text-sm font-medium text-green-600">Message sent! We&apos;ll be in touch soon.</p>}
        </form>
      </div>
    </div>
  );
}
