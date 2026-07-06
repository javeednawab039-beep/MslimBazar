import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Truck, Lock, RotateCcw, Gem } from 'lucide-react';

const badges = [
  { icon: ShieldCheck, label: 'Premium Quality' },
  { icon: Truck, label: 'Fast Shipping' },
  { icon: Lock, label: 'Secure Payments' },
  { icon: RotateCcw, label: '30 Days Returns' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-bg via-blue-50 to-white">
      <div className="container-px mx-auto grid max-w-7xl items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div className="animate-fadeUp">
          <span className="mb-4 inline-block rounded-full bg-brand-blue/10 px-4 py-1.5 text-xs font-semibold text-brand-blue">
            Premium Products
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-5xl">
            Premium Products <br className="hidden sm:block" />
            For <span className="text-brand-blue">Everyday Living</span>
          </h1>
          <p className="mt-5 max-w-md text-slate-600">
            Welcome to NorthWell Store. We offer premium-quality products sourced from trusted
            global suppliers. Enjoy secure shopping, affordable prices, fast worldwide shipping,
            and outstanding customer service.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn-primary">
              Shop Now &rarr;
            </Link>
            <Link href="/shop" className="btn-secondary">
              Explore Collection
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {badges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <Icon size={16} className="text-brand-blue" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex h-80 w-80 items-center justify-center sm:h-96 sm:w-96">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-blue/20 to-blue-200/40 blur-2xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white/60 shadow-soft backdrop-blur">
            <div className="relative h-56 w-56 animate-floatSlow sm:h-64 sm:w-64">
              <Image
                src="/images/8_1189087434536.jpg"
                alt="Premium lifestyle products"
                fill
                sizes="300px"
                className="rounded-2xl object-cover shadow-lift"
              />
            </div>
          </div>

          <span className="absolute -left-2 top-6 flex items-center gap-1 rounded-full bg-brand-gold px-3 py-1.5 text-xs font-bold text-brand-navy shadow-soft">
            50% OFF
          </span>
          <span className="absolute -right-2 top-1/3 flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-brand-navy shadow-soft">
            <Gem size={14} className="text-brand-blue" /> Best Quality
          </span>
          <span className="absolute -bottom-2 left-1/4 flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-brand-navy shadow-soft">
            <Truck size={14} className="text-brand-blue" /> Fast &amp; Free Shipping
          </span>
        </div>
      </div>
    </section>
  );
}
