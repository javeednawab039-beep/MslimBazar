'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Heart, Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const stockLabel: Record<Product['stock'], { text: string; className: string }> = {
  'in-stock': { text: 'In Stock', className: 'text-green-600' },
  'low-stock': { text: 'Low Stock', className: 'text-brand-gold' },
  'out-of-stock': { text: 'Out of Stock', className: 'text-red-500' },
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const router = useRouter();
  const wishlisted = isWishlisted(product.id);
  const stock = stockLabel[product.stock];

  return (
    <div className="card group relative flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
        {product.discountPercent > 0 && (
          <span className="absolute left-3 top-3 z-10 rounded-md bg-brand-blue px-2 py-1 text-xs font-bold text-white">
            -{product.discountPercent}%
          </span>
        )}
        <button
          aria-label="Toggle wishlist"
          onClick={() => toggleWishlist(product)}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-red-500 text-red-500' : 'text-slate-500'}
          />
        </button>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <button
          onClick={() => router.push(`/product/${product.slug}`)}
          className="absolute inset-x-3 bottom-3 z-10 flex translate-y-2 items-center justify-center gap-1.5 rounded-full bg-white/95 py-2 text-xs font-semibold text-brand-navy opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye size={14} /> Quick View
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <Link href={`/product/${product.slug}`} className="line-clamp-1 font-semibold text-brand-navy hover:text-brand-blue">
          {product.name}
        </Link>
        <p className="line-clamp-1 text-xs text-slate-500">{product.description}</p>

        <div className="flex items-center gap-1 text-xs">
          <div className="flex items-center text-brand-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.round(product.rating) ? 'fill-brand-gold' : 'fill-slate-200 text-slate-200'}
              />
            ))}
          </div>
          <span className="text-slate-400">({product.reviewCount})</span>
        </div>

        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-lg font-bold text-brand-navy">${product.price.toFixed(2)}</span>
          <span className="text-sm text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
        </div>
        <span className={`text-xs font-medium ${stock.className}`}>{stock.text}</span>

        <div className="mt-2 flex gap-2">
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 'out-of-stock'}
            className="flex-1 rounded-full bg-brand-blue px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-blueDark disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Add to Cart
          </button>
          <button
            onClick={() => {
              addToCart(product);
              router.push('/cart');
            }}
            disabled={product.stock === 'out-of-stock'}
            className="flex-1 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-brand-navy transition-colors hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-50"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
