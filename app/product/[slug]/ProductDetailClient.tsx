'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Heart, Minus, Plus, ShieldCheck, Truck, RotateCcw, Share2 } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { getCustomProductBySlug } from '@/lib/custom-products';
import ProductCard from '@/components/ProductCard';
import ShareButtons from '@/components/ShareButtons';

export default function ProductDetailClient({
  product: initialProduct,
  related,
  slug,
}: {
  product: Product | null;
  related: Product[];
  slug: string;
}) {
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [checkedLocal, setCheckedLocal] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [shareOpen, setShareOpen] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    if (!product) {
      const local = getCustomProductBySlug(slug);
      if (local) setProduct(local);
    }
    setCheckedLocal(true);
  }, [product, slug]);

  if (!product && checkedLocal) {
    return (
      <div className="container-px mx-auto max-w-2xl py-24 text-center">
        <h1 className="section-title">Product Not Found</h1>
        <p className="mt-3 text-slate-500">This product link is invalid or no longer available.</p>
        <Link href="/shop" className="btn-primary mt-6 inline-flex">Browse Products</Link>
      </div>
    );
  }

  if (!product) {
    return <div className="container-px mx-auto max-w-7xl py-24 text-center text-slate-400">Loading...</div>;
  }

  const wishlisted = isWishlisted(product.id);
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/product/${product.slug}` : '';

  return (
    <div className="container-px mx-auto max-w-7xl py-10">
      <nav className="mb-6 text-xs text-slate-400">
        <Link href="/" className="hover:text-brand-blue">Home</Link> /{' '}
        <Link href="/shop" className="hover:text-brand-blue">Shop</Link> /{' '}
        <span className="text-slate-600">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-slate-50">
            {product.discountPercent > 0 && (
              <span className="absolute left-4 top-4 z-10 rounded-md bg-brand-blue px-2.5 py-1 text-xs font-bold text-white">
                -{product.discountPercent}%
              </span>
            )}
            <Image
              src={product.images[activeImage] ?? product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(idx)}
                  className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 ${
                    activeImage === idx ? 'border-brand-blue' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-brand-navy">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="flex text-brand-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className={i < Math.round(product.rating) ? 'fill-brand-gold' : 'fill-slate-200 text-slate-200'} />
              ))}
            </div>
            <span className="text-slate-400">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-brand-navy">${product.price.toFixed(2)}</span>
            <span className="text-lg text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
            <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </span>
          </div>

          <p className="mt-5 text-slate-600">{product.longDescription}</p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-slate-200">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 text-slate-500 hover:text-brand-blue"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-3 text-slate-500 hover:text-brand-blue"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
            <span className="text-sm font-medium text-green-600 capitalize">
              {product.stock.replace('-', ' ')}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => addToCart(product, quantity)}
              disabled={product.stock === 'out-of-stock'}
              className="btn-primary flex-1 sm:flex-none sm:px-10"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product, quantity);
                router.push('/cart');
              }}
              disabled={product.stock === 'out-of-stock'}
              className="btn-gold flex-1 sm:flex-none sm:px-10"
            >
              Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 hover:border-brand-blue"
            >
              <Heart size={18} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-slate-500'} />
            </button>
            <button
              onClick={() => setShareOpen((s) => !s)}
              aria-label="Share product"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 hover:border-brand-blue"
            >
              <Share2 size={18} className="text-slate-500" />
            </button>
          </div>

          {shareOpen && (
            <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="mb-3 text-xs font-semibold text-slate-500">Share this product</p>
              <ShareButtons url={shareUrl} title={product.name} />
            </div>
          )}

          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6 text-xs text-slate-500">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Truck size={18} className="text-brand-blue" /> Free Shipping
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <ShieldCheck size={18} className="text-brand-blue" /> Secure Payment
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <RotateCcw size={18} className="text-brand-blue" /> 30-Day Returns
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-8 section-title">
            Related <span className="text-brand-blue">Products</span>
          </h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
