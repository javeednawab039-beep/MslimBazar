import { Truck, RotateCcw, ShieldCheck, Headset } from 'lucide-react';

const items = [
  { icon: Truck, label: 'Free Worldwide Shipping' },
  { icon: RotateCcw, label: '30-Day Easy Returns' },
  { icon: ShieldCheck, label: '100% Secure Payments' },
  { icon: Headset, label: '24/7 Customer Support' },
];

export default function AnnouncementBar() {
  return (
    <div className="hidden bg-brand-navy text-white md:block">
      <div className="container-px mx-auto flex max-w-7xl items-center justify-center gap-8 py-2 text-xs font-medium tracking-wide">
        {items.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-1.5 text-white/85">
            <Icon size={13} strokeWidth={2} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
