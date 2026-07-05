import Link from 'next/link';
import * as Icons from 'lucide-react';
import { categories } from '@/data/categories';
import { LucideIcon } from 'lucide-react';

export default function Categories() {
  return (
    <section className="container-px mx-auto max-w-7xl py-16">
      <div className="mb-10 text-center">
        <h2 className="section-title">
          Shop By <span className="text-brand-blue">Categories</span>
        </h2>
        <p className="mt-2 text-slate-500">Find exactly what you need, curated by category.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((cat) => {
          const Icon = (Icons as unknown as Record<string, LucideIcon>)[cat.icon];
          return (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className={`card group flex flex-col items-center gap-3 p-5 text-center hover:-translate-y-1 ${cat.bg}`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                {Icon && <Icon size={22} className={cat.iconColor} />}
              </span>
              <span className="text-sm font-semibold text-brand-navy">{cat.name}</span>
              <span className="text-xs font-medium text-brand-blue opacity-0 transition-opacity group-hover:opacity-100">
                View All &rarr;
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
