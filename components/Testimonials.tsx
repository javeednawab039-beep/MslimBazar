import { Star, BadgeCheck } from 'lucide-react';
import { reviews } from '@/data/reviews';

export default function Testimonials() {
  return (
    <section className="bg-brand-bg py-16">
      <div className="container-px mx-auto max-w-7xl">
        <h2 className="mb-10 text-center section-title">
          What Our <span className="text-brand-blue">Customers</span> Say
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="card p-6">
              <div className="mb-3 flex text-brand-gold">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-brand-gold" />
                ))}
              </div>
              <p className="text-sm text-slate-600">&ldquo;{review.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-sm font-bold text-brand-blue">
                  {review.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">{review.name}</p>
                  <p className="flex items-center gap-1 text-xs text-green-600">
                    <BadgeCheck size={12} /> Verified Buyer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
