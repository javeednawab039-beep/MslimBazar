import { Gem, Globe2, Users, Award } from 'lucide-react';

export const metadata = { title: 'About Us | NorthWell Store' };

const stats = [
  { icon: Users, value: '50,000+', label: 'Happy Customers' },
  { icon: Globe2, value: '30+', label: 'Countries Served' },
  { icon: Gem, value: '500+', label: 'Premium Products' },
  { icon: Award, value: '4.8/5', label: 'Average Rating' },
];

export default function AboutPage() {
  return (
    <div className="container-px mx-auto max-w-5xl py-16">
      <h1 className="mb-4 text-center section-title">About NorthWell Store</h1>
      <p className="mx-auto max-w-2xl text-center text-slate-600">
        NorthWell Store was founded on a simple idea: everyday products deserve premium quality,
        fair prices, and a shopping experience you can trust. We partner with vetted global
        suppliers to bring curated, high-quality goods straight to your door.
      </p>

      <div id="story" className="mt-14 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="mb-3 text-xl font-bold text-brand-navy">Our Story</h2>
          <p className="text-slate-600">
            What started as a small team obsessed with product quality has grown into a trusted
            destination for home, electronics, beauty, and fitness essentials. Every item in our
            catalog is chosen for durability, design, and value &mdash; not just trend appeal.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-bold text-brand-navy">Our Promise</h2>
          <p className="text-slate-600">
            Secure payments, transparent pricing, and responsive support are non-negotiable. If
            something isn&apos;t right, our 30-day return policy and 24/7 support team have you
            covered.
          </p>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="card flex flex-col items-center gap-2 p-6 text-center">
            <Icon size={24} className="text-brand-blue" />
            <span className="text-2xl font-bold text-brand-navy">{value}</span>
            <span className="text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
