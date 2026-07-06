'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, ShoppingBag as Logo } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Best Sellers', href: '/shop?filter=best-sellers' },
  { label: 'New Arrivals', href: '/shop?filter=new-arrivals' },
  { label: 'Deals', href: '/shop?filter=deals' },
  { label: 'Track Order', href: '/track-order' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="container-px mx-auto flex max-w-7xl items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
         <img src="/image/8_1189087434536.jpg" alt="Logo" className="h-9 w-9 rounded-lg object-cover" />
          <span className="text-lg font-extrabold tracking-tight text-brand-navy">
            Muslim<span className="text-brand-blue">Bazaar</span>
            <span className="block -mt-1 text-[10px] font-semibold tracking-[0.2em] text-slate-500">
              Agent store
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-brand-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className="rounded-full p-2 text-slate-700 transition-colors hover:bg-slate-100 hover:text-brand-blue"
          >
            <Search size={19} />
          </button>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative rounded-full p-2 text-slate-700 transition-colors hover:bg-slate-100 hover:text-brand-blue"
          >
            <Heart size={19} />
            {wishlistItems.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-brand-navy">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative rounded-full p-2 text-slate-700 transition-colors hover:bg-slate-100 hover:text-brand-blue"
          >
            <ShoppingBag size={19} />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
          <Link href="/shop" className="btn-primary hidden sm:inline-flex">
            Shop Now
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen((s) => !s)}
            className="rounded-full p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-slate-100 bg-white">
          <form onSubmit={handleSearch} className="container-px mx-auto max-w-7xl py-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2">
              <Search size={16} className="text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </form>
        </div>
      )}

      {menuOpen && (
        <nav className="border-t border-slate-100 bg-white lg:hidden">
          <div className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
