'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { products as staticProducts } from '@/data/products';
import { categories } from '@/data/categories';
import { getCustomProducts } from '@/lib/custom-products';
import ProductCard from '@/components/ProductCard';

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $30', min: 0, max: 30 },
  { label: '$30 - $60', min: 30, max: 60 },
  { label: '$60 - $100', min: 60, max: 100 },
  { label: 'Over $100', min: 100, max: Infinity },
];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const initialCategory = searchParams.get('category') ?? 'all';
  const initialFilter = searchParams.get('filter') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [priceRangeIdx, setPriceRangeIdx] = useState(0);
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [allProducts, setAllProducts] = useState(staticProducts);

  useEffect(() => {
    setAllProducts([...getCustomProducts(), ...staticProducts]);
  }, []);

  const filtered = useMemo(() => {
    let list = [...allProducts];

    if (initialFilter === 'best-sellers') list = list.filter((p) => p.isBestSeller);
    if (initialFilter === 'new-arrivals') list = list.filter((p) => p.isNewArrival);
    if (initialFilter === 'deals') list = list.filter((p) => p.discountPercent >= 25);

    if (category !== 'all') {
      list = list.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    const range = PRICE_RANGES[priceRangeIdx];
    list = list.filter((p) => p.price >= range.min && p.price <= range.max);

    if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [query, category, priceRangeIdx, sort, initialFilter, allProducts]);

  return (
    <div className="container-px mx-auto max-w-7xl py-10">
      <div className="mb-8">
        <h1 className="section-title">
          Shop <span className="text-brand-blue">All Products</span>
        </h1>
        <p className="mt-2 text-slate-500">{filtered.length} products found</p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-sm rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand-blue"
        />
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen((s) => !s)}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium sm:hidden"
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className={`space-y-8 ${filtersOpen ? 'block' : 'hidden'} lg:block`}>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-brand-navy">Category</h3>
            <div className="space-y-2 text-sm">
              <button
                onClick={() => setCategory('all')}
                className={`block w-full text-left ${category === 'all' ? 'font-semibold text-brand-blue' : 'text-slate-600'}`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.slug)}
                  className={`block w-full text-left ${category === cat.slug ? 'font-semibold text-brand-blue' : 'text-slate-600'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-brand-navy">Price Range</h3>
            <div className="space-y-2 text-sm">
              {PRICE_RANGES.map((range, idx) => (
                <button
                  key={range.label}
                  onClick={() => setPriceRangeIdx(idx)}
                  className={`block w-full text-left ${priceRangeIdx === idx ? 'font-semibold text-brand-blue' : 'text-slate-600'}`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 py-20 text-center text-slate-500">
              No products match your filters. Try adjusting your search.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
