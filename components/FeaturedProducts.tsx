import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const featured = products.slice(0, 8);

  return (
    <section className="bg-brand-bg py-16">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="section-title">
              Featured <span className="text-brand-blue">Products</span>
            </h2>
            <p className="mt-2 text-slate-500">Hand-picked bestsellers our customers love.</p>
          </div>
          <Link href="/shop" className="hidden text-sm font-semibold text-brand-blue hover:underline sm:block">
            View All Products &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop" className="text-sm font-semibold text-brand-blue hover:underline">
            View All Products &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
