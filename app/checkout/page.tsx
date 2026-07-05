'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, Check, ShieldCheck, User, Mail, Phone, MapPin, Building2, Hash, Globe2, Landmark } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PAYMENT_ACCOUNTS, PaymentMethodKey } from '@/lib/payment-config';
import { saveOrder, generateOrderId, Order } from '@/lib/orders';
import { sendOrderNotification } from '@/lib/email';

function Field({
  label,
  icon: Icon,
  required = true,
  className = '',
  ...props
}: {
  label: string;
  icon: React.ElementType;
  required?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
        <Icon size={13} className="text-brand-blue" />
        {label} {required && <span className="text-red-400">*</span>}
      </span>
      <input
        required={required}
        {...props}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue"
      />
    </label>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);
  const [method, setMethod] = useState<PaymentMethodKey>('jazzcash');
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    landmark: '',
    payerNumber: '',
    transactionId: '',
  });

  const account = PAYMENT_ACCOUNTS[method];

  const updateField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const copyNumber = () => {
    navigator.clipboard.writeText(account.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);

    const order: Order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      customer: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        country: form.country,
        landmark: form.landmark,
      },
      payment: {
        method,
        payerNumber: form.payerNumber,
        transactionId: form.transactionId,
      },
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
      })),
      total: subtotal,
      status: 'pending_verification',
    };

    saveOrder(order);
    await sendOrderNotification(order);
    clearCart();
    router.push(`/checkout/success?order=${order.id}`);
  };

  if (items.length === 0 && !placing) {
    return (
      <div className="container-px mx-auto max-w-3xl py-24 text-center">
        <h1 className="section-title">Nothing to Checkout</h1>
        <p className="mt-3 text-slate-500">Add products to your cart before checking out.</p>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-7xl py-10">
      <h1 className="mb-8 section-title">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="mb-1 text-lg font-bold text-brand-navy">Shipping Information</h2>
            <p className="mb-5 text-xs text-slate-400">
              This is exactly what your supplier needs to ship the product directly to your
              customer &mdash; fill in every field carefully.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" icon={User} placeholder="e.g. Ali Raza" value={form.fullName} onChange={updateField('fullName')} className="sm:col-span-2" />
              <Field label="Email Address" icon={Mail} type="email" placeholder="e.g. ali@email.com" value={form.email} onChange={updateField('email')} />
              <Field label="Phone Number" icon={Phone} placeholder="e.g. 0300-1234567" value={form.phone} onChange={updateField('phone')} />
              <Field label="Full Street Address" icon={MapPin} placeholder="House #, Street, Area" value={form.address} onChange={updateField('address')} className="sm:col-span-2" />
              <Field label="City" icon={Building2} placeholder="e.g. Lahore" value={form.city} onChange={updateField('city')} />
              <Field label="State / Province" icon={Building2} placeholder="e.g. Punjab" value={form.state} onChange={updateField('state')} />
              <Field label="Postal / ZIP Code" icon={Hash} placeholder="e.g. 54000" value={form.postalCode} onChange={updateField('postalCode')} />
              <Field label="Country" icon={Globe2} placeholder="e.g. Pakistan" value={form.country} onChange={updateField('country')} />
              <Field label="Nearest Landmark (optional)" icon={Landmark} required={false} placeholder="e.g. Near Metro Station" value={form.landmark} onChange={updateField('landmark')} className="sm:col-span-2" />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="mb-4 text-lg font-bold text-brand-navy">Payment Method</h2>
            <div className="mb-5 grid grid-cols-2 gap-3">
              {(Object.keys(PAYMENT_ACCOUNTS) as PaymentMethodKey[]).map((key) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setMethod(key)}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                    method === key ? 'border-brand-blue bg-blue-50 text-brand-blue' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {PAYMENT_ACCOUNTS[key].label}
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-dashed border-brand-blue/40 bg-blue-50/50 p-4">
              <p className="text-sm text-slate-600">
                Send <span className="font-bold text-brand-navy">${subtotal.toFixed(2)}</span> via{' '}
                <span className="font-semibold text-brand-navy">{account.label}</span> to:
              </p>
              <div className="mt-2 flex items-center justify-between rounded-lg bg-white px-4 py-3">
                <div>
                  <p className="text-lg font-bold tracking-wide text-brand-navy">{account.number}</p>
                  <p className="text-xs text-slate-500">Account Name: {account.accountName}</p>
                </div>
                <button
                  type="button"
                  onClick={copyNumber}
                  className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-brand-navy hover:border-brand-blue hover:text-brand-blue"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                After sending the payment, enter the number you paid from and the transaction ID
                below so your order can be verified.
              </p>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Number You Paid From" icon={Phone} placeholder={account.number} value={form.payerNumber} onChange={updateField('payerNumber')} className="sm:col-span-2" />
              <Field label="Transaction ID / TID" icon={Hash} placeholder="e.g. TXN123456789" value={form.transactionId} onChange={updateField('transactionId')} className="sm:col-span-2" />
            </div>

            <p className="mt-4 flex items-start gap-1.5 text-xs text-slate-400">
              <ShieldCheck size={14} className="mt-0.5 shrink-0" /> Your order details will be sent
              to our team by email for payment verification. We&apos;ll confirm your order once the
              payment is matched.
            </p>
          </div>
        </div>

        <div className="card h-fit p-6">
          <h2 className="mb-4 text-lg font-bold text-brand-navy">Order Summary</h2>
          <div className="space-y-2 text-sm">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-slate-600">
                <span className="line-clamp-1">{product.name} &times; {quantity}</span>
                <span>${(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-slate-100 pt-3 font-bold text-brand-navy">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button type="submit" disabled={placing} className="btn-primary mt-6 w-full">
            {placing ? 'Submitting Order...' : 'Submit Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
