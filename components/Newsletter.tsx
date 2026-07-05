'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="container-px mx-auto max-w-7xl py-16">
      <div className="flex flex-col items-center gap-6 rounded-3xl bg-blue-50 px-6 py-10 sm:flex-row sm:justify-between sm:px-12">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-brand-blue shadow-soft sm:flex">
            <Send size={20} />
          </span>
          <div>
            <h3 className="text-xl font-bold text-brand-navy">Stay Updated</h3>
            <p className="text-sm text-slate-500">
              Subscribe to get exclusive discounts, new products, flash sales, and special offers.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2 sm:w-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-blue"
          />
          <button type="submit" className="btn-primary shrink-0">
            Subscribe
          </button>
        </form>
        {submitted && (
          <p className="w-full text-center text-sm font-medium text-green-600 sm:absolute">
            Thanks for subscribing! Check your inbox soon.
          </p>
        )}
      </div>
    </section>
  );
}
