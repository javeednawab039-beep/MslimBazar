'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ExternalLink, PackagePlus } from 'lucide-react';
import { categories } from '@/data/categories';
import {
  addCustomProduct,
  deleteCustomProduct,
  getCustomProducts,
  getSupplierLink,
} from '@/lib/custom-products';
import { Product } from '@/lib/types';
import ShareButtons from '@/components/ShareButtons';

const emptyForm = {
  name: '',
  description: '',
  price: '',
  originalPrice: '',
  image: '',
  category: categories[0].slug,
  supplierLink: '',
};

export default function AdminProductsPage() {
  const [form, setForm] = useState(emptyForm);
  const [products, setProducts] = useState<Product[]>([]);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setProducts(getCustomProducts());
    setOrigin(window.location.origin);
  }, []);

  const updateField = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomProduct({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      originalPrice: parseFloat(form.originalPrice || form.price),
      image: form.image,
      category: form.category,
      supplierLink: form.supplierLink,
    });
    setProducts(getCustomProducts());
    setForm(emptyForm);
  };

  const handleDelete = (id: string) => {
    deleteCustomProduct(id);
    setProducts(getCustomProducts());
  };

  return (
    <div className="container-px mx-auto max-w-5xl py-10">
      <h1 className="mb-2 section-title">Add Supplier Product</h1>
      <p className="mb-6 text-sm text-slate-500">
        Paste your supplier product link and fill in the details below. A shareable NorthWell
        Store link is generated instantly for Facebook, Instagram, YouTube, and LinkedIn.
      </p>

      <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
        <strong>Important:</strong> products added here are saved in this browser only. They will
        show up for you on this device, but a customer opening the shared link on their own phone
        won&apos;t see the product yet &mdash; that requires connecting a small shared database
        (see the README for the easiest free option). This screen is fully working for testing the
        whole flow right now.
      </div>

      <form onSubmit={handleSubmit} className="card mb-10 space-y-4 p-6">
        <input required placeholder="Product Name" value={form.name} onChange={updateField('name')} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
        <textarea required rows={3} placeholder="Product Description" value={form.description} onChange={updateField('description')} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
        <div className="grid gap-4 sm:grid-cols-2">
          <input required type="number" step="0.01" placeholder="Sale Price (e.g. 24.99)" value={form.price} onChange={updateField('price')} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
          <input type="number" step="0.01" placeholder="Original Price (optional)" value={form.originalPrice} onChange={updateField('originalPrice')} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
        </div>
        <input required placeholder="Product Image URL" value={form.image} onChange={updateField('image')} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
        <select value={form.category} onChange={updateField('category')} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue">
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <input required placeholder="Supplier Product Link (e.g. from CJ Dropshipping)" value={form.supplierLink} onChange={updateField('supplierLink')} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-blue" />
        <button type="submit" className="btn-primary w-full">
          <PackagePlus size={16} /> Add Product
        </button>
      </form>

      <h2 className="mb-4 text-lg font-bold text-brand-navy">Your Added Products</h2>
      {products.length === 0 ? (
        <p className="text-sm text-slate-400">No products added yet.</p>
      ) : (
        <div className="space-y-4">
          {products.map((p) => {
            const shareUrl = origin ? `${origin}/product/${p.slug}` : '';
            const supplierLink = getSupplierLink(p.id);
            return (
              <div key={p.id} className="card p-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                    {p.image && <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-brand-navy">{p.name}</p>
                    <p className="text-xs text-slate-500">${p.price.toFixed(2)}</p>
                  </div>
                  <Link href={`/product/${p.slug}`} className="flex items-center gap-1 text-xs font-semibold text-brand-blue hover:underline">
                    View <ExternalLink size={12} />
                  </Link>
                  <button onClick={() => handleDelete(p.id)} aria-label="Delete product" className="text-slate-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                  <ShareButtons url={shareUrl} title={p.name} />
                  {supplierLink && (
                    <a href={supplierLink} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-brand-blue">
                      Supplier link &rarr;
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
