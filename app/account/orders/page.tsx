import Link from 'next/link';
import { PackageSearch } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div className="container-px mx-auto max-w-2xl py-24 text-center">
      <PackageSearch size={48} className="mx-auto mb-4 text-brand-blue" />
      <h1 className="section-title">Your Orders</h1>
      <p className="mx-auto mt-3 max-w-md text-slate-500">
        Log in to see your order history. Once connected to a backend, this page will list past
        orders with status, tracking, and reorder options.
      </p>
      <Link href="/account/login" className="btn-primary mt-6 inline-flex">
        Log In
      </Link>
    </div>
  );
}
