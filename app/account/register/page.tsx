'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNote('Account creation requires a connected backend. This form is UI-ready for your API.');
  };

  return (
    <div className="container-px mx-auto max-w-md py-20">
      <h1 className="mb-2 text-center section-title">Create Account</h1>
      <p className="mb-8 text-center text-sm text-slate-500">Join NorthWell Store for faster checkout and order tracking.</p>
      <form onSubmit={handleSubmit} className="card space-y-4 p-6">
        <input required placeholder="Full Name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
        <input required type="email" placeholder="Email Address" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
        <input required type="password" placeholder="Password" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
        <button type="submit" className="btn-primary w-full">Create Account</button>
        {note && <p className="text-xs text-brand-blue">{note}</p>}
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link href="/account/login" className="font-semibold text-brand-blue hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
