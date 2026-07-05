'use client';

import { useState } from 'react';
import { Package, Truck, CheckCircle2, Search } from 'lucide-react';

const STEPS = [
  { icon: Package, label: 'Order Placed' },
  { icon: Package, label: 'Processing' },
  { icon: Truck, label: 'Shipped' },
  { icon: CheckCircle2, label: 'Delivered' },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState<null | number>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    // Deterministic demo status based on the order id string
    const step = (orderId.trim().length % 4) + 1;
    setResult(step);
  };

  return (
    <div className="container-px mx-auto max-w-2xl py-16">
      <h1 className="mb-3 text-center section-title">Track Your Order</h1>
      <p className="mb-8 text-center text-slate-500">
        Enter your order number to see the latest status.
      </p>
      <form onSubmit={handleTrack} className="mx-auto flex max-w-md gap-2">
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="e.g. NW-123456"
          className="w-full rounded-full border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
        />
        <button type="submit" className="btn-primary shrink-0">
          <Search size={16} /> Track
        </button>
      </form>

      {result && (
        <div className="mt-12">
          <div className="flex items-center justify-between">
            {STEPS.map((step, idx) => {
              const active = idx < result;
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex flex-1 flex-col items-center text-center">
                  <span
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                      active ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <Icon size={16} />
                  </span>
                  <span className={`text-xs font-medium ${active ? 'text-brand-navy' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">
            Order <span className="font-semibold text-brand-navy">{orderId}</span> is currently at
            the <span className="font-semibold text-brand-blue">{STEPS[result - 1].label}</span> stage.
          </p>
        </div>
      )}
    </div>
  );
}
