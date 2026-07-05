import Link from 'next/link';
import Image from 'next/image';

export default function FlashSale() {
  return (
    <section className="container-px mx-auto max-w-7xl py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-blue to-brand-blueDark px-8 py-12 sm:px-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="relative z-10 text-white">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/70">
              Summer Sale
            </p>
            <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Up to <span className="text-brand-gold">50% OFF</span>
            </h2>
            <p className="mt-3 text-white/80">Limited time only &mdash; while supplies last.</p>
            <Link href="/shop?filter=deals" className="btn-gold mt-6 inline-flex">
              Shop Now &rarr;
            </Link>
          </div>
          <div className="relative mx-auto h-48 w-full max-w-sm overflow-hidden rounded-2xl shadow-lift lg:h-56">
            <Image
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
              alt="Summer sale collection"
              fill
              sizes="400px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-white/5" />
      </div>
    </section>
  );
}
