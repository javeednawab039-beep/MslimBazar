'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Clock } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') ?? 'NW-000000';

  return (
    <div className="container-px mx-auto max-w-2xl py-24 text-center">
      <CheckCircle2 size={56} className="mx-auto mb-4 text-green-500" />
      <h1 className="section-title">Order Submitted Successfully</h1>
      <p className="mt-3 text-slate-500">
        Thank you for your order at NorthWell Store. Your order number is{' '}
        <span className="font-semibold text-brand-navy">{orderNumber}</span>.
      </p>

      <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
        <Clock size={16} />
        We are verifying your payment. You will receive a confirmation once it&apos;s matched.
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Link href="/track-order" className="btn-primary">Track Order</Link>
        <Link href="/shop" className="btn-secondary">Continue Shopping</Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="container-px mx-auto max-w-2xl py-24 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
