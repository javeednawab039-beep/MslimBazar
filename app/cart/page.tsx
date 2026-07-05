'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const VALID_COUPONS: Record<string, number> = {
  WELCOME10: 0.1,
  NORTHWELL20: 0.2,
};

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setAppliedDiscount(VALID_COUPONS[code]);
      setCouponMessage(`Coupon applied: ${Math.round(VALID_COUPONS[code] * 100)}% off`);
    } else {
      setAppliedDiscount(0);
      setCouponMessage('Invalid coupon code');
    }
  };

  const shipping = items.length > 0 ? 0 : 0;
  const discountAmount = subtotal * appliedDiscount;
  const total = subtotal - discountAmount + shipping;

  if (items.length === 0) {
    return (
      <div className="container-px mx-auto max-w-3xl py-24 text-center">
        <h1 className="section-title">Your Cart is Empty</h1>
        <p className="mt-3 text-slate-500">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/shop" className="btn-primary mt-6 inline-flex">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-7xl py-10">
      <h1 className="mb-8 section-title">Shopping Cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="card flex items-center gap-4 p-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50">
                <Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/product/${product.slug}`} className="line-clamp-1 font-semibold text-brand-navy hover:text-brand-blue">
                  {product.name}
                </Link>
                <p className="mt-1 text-sm font-semibold text-brand-blue">${product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center rounded-full border border-slate-200">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="p-2 text-slate-500 hover:text-brand-blue"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="p-2 text-slate-500 hover:text-brand-blue"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
              <p className="w-20 text-right font-semibold text-brand-navy">
                ${(product.price * quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(product.id)}
                aria-label="Remove item"
                className="text-slate-400 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm font-medium text-slate-400 hover:text-red-500">
            Clear cart
          </button>
        </div>

        <div className="card h-fit p-6">
          <h2 className="mb-4 text-lg font-bold text-brand-navy">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-brand-navy">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <Tag size={12} /> Coupon Code
            </label>
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="e.g. WELCOME10"
                className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm outline-none focus:border-brand-blue"
              />
              <button onClick={applyCoupon} className="btn-secondary shrink-0 px-4 py-2 text-xs">
                Apply
              </button>
            </div>
            {couponMessage && (
              <p className={`mt-2 text-xs ${appliedDiscount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {couponMessage}
              </p>
            )}
          </div>

          <Link href="/checkout" className="btn-primary mt-6 w-full">
            Proceed to Checkout
          </Link>
          <Link href="/shop" className="mt-3 block text-center text-sm font-medium text-slate-500 hover:text-brand-blue">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
