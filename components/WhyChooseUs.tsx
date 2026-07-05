import { Gem, Truck, ShieldCheck, Headset, Globe2 } from 'lucide-react';

const points = [
  { icon: Gem, title: 'Premium Quality', desc: 'Carefully selected products from trusted suppliers.' },
  { icon: Truck, title: 'Fast Shipping', desc: 'Worldwide shipping with real-time order tracking.' },
  { icon: ShieldCheck, title: 'Secure Payments', desc: 'Safe and secure payment methods you can trust.' },
  { icon: Headset, title: '24/7 Support', desc: 'Our support team is always here to help you.' },
  { icon: Globe2, title: 'Verified Suppliers', desc: 'Every partner is vetted for quality and reliability.' },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-navy py-16 text-white">
      <div className="container-px mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
          Why Choose <span className="text-brand-gold">NorthWell Store</span>?
        </h2>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {points.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Icon size={24} className="text-brand-gold" />
              </span>
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="text-xs text-white/60">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
