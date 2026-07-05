import Link from 'next/link';
import { Facebook, Instagram, Youtube, ShoppingBag } from 'lucide-react';

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/about#story' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'Shipping Policy', href: '/policies/shipping' },
      { label: 'Return Policy', href: '/policies/returns' },
      { label: 'Refund Policy', href: '/policies/refunds' },
      { label: 'Privacy Policy', href: '/policies/privacy' },
      { label: 'Terms & Conditions', href: '/policies/terms' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'My Account',
    links: [
      { label: 'Login', href: '/account/login' },
      { label: 'Register', href: '/account/register' },
      { label: 'Orders', href: '/account/orders' },
      { label: 'Wishlist', href: '/wishlist' },
      { label: 'Track Order', href: '/track-order' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy pt-16 text-white/80">
      <div className="container-px mx-auto grid max-w-7xl gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue text-white">
              <ShoppingBag size={18} />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-white">
              NORTH<span className="text-brand-blue">WELL</span>{' '}
              <span className="block -mt-1 text-[10px] font-semibold tracking-[0.2em] text-white/50">
                STORE
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-white/50">
            Your trusted online shopping destination for premium products at the best prices.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-brand-blue"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-semibold text-white">{col.title}</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-brand-blue">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Secure Payments</h4>
          <p className="mb-4 text-sm text-white/50">
            We accept all major credit cards and secure payment methods.
          </p>
          <div className="flex flex-wrap gap-2">
            {['VISA', 'MasterCard', 'PayPal', 'Stripe', 'Apple Pay', 'Google Pay'].map((p) => (
              <span
                key={p}
                className="rounded-md bg-white/5 px-2.5 py-1.5 text-[11px] font-semibold text-white/70"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-px mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} NorthWell Store. All Rights Reserved.</p>
          <p>Designed for our customers.</p>
        </div>
      </div>
    </footer>
  );
}
