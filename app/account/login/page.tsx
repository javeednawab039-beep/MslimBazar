'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('Account login requires a connected backend. This form is UI-ready for your API.');
  };

  return (
    <div className="container-px mx-auto max-w-md py-20">
      <h1 className="mb-2 text-center section-title">Welcome Back</h1>
      <p className="mb-8 text-center text-sm text-slate-500">Log in to view orders and manage your account.</p>
      <form onSubmit={handleSubmit} className="card space-y-4 p-6">
        <input required type="email" placeholder="Email Address" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
        <input required type="password" placeholder="Password" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
        <button type="submit" className="btn-primary w-full">Log In</button>
        {error && <p className="text-xs text-brand-blue">{error}</p>}
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link href="/account/register" className="font-semibold text-brand-blue hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
