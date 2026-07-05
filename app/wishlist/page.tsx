'use client';

import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container-px mx-auto max-w-3xl py-24 text-center">
        <h1 className="section-title">Your Wishlist is Empty</h1>
        <p className="mt-3 text-slate-500">Save products you love to find them here later.</p>
        <Link href="/shop" className="btn-primary mt-6 inline-flex">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-7xl py-10">
      <h1 className="mb-8 section-title">My Wishlist</h1>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
