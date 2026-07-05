import { Suspense } from 'react';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'Shop All Products | NorthWell Store',
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-px mx-auto max-w-7xl py-16">Loading products...</div>}>
      <ShopClient />
    </Suspense>
  );
}
