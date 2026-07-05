import { notFound } from 'next/navigation';

const POLICIES: Record<string, { title: string; body: string[] }> = {
  shipping: {
    title: 'Shipping Policy',
    body: [
      'NorthWell Store offers free worldwide shipping on all orders, with delivery typically taking 7-14 business days depending on destination.',
      'Once your order ships, you will receive a tracking number by email so you can follow its progress on the Track Order page.',
      'Delays can occur due to customs processing in certain regions; we appreciate your patience and are here to help if your order is taking longer than expected.',
    ],
  },
  returns: {
    title: 'Return Policy',
    body: [
      'You may return most unused items in their original packaging within 30 days of delivery for a full refund or exchange.',
      'To start a return, contact our support team with your order number and reason for return.',
      'Personalized or final-sale items are not eligible for return unless defective.',
    ],
  },
  refunds: {
    title: 'Refund Policy',
    body: [
      'Approved refunds are processed to your original payment method within 5-10 business days of us receiving the returned item.',
      'Shipping fees are non-refundable except in cases where the item arrived damaged or incorrect.',
      'You will receive an email confirmation once your refund has been issued.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    body: [
      'We collect only the information necessary to process your orders and improve your shopping experience, such as your name, shipping address, and payment details.',
      'Your data is never sold to third parties. It is shared only with trusted partners required to fulfill your order, such as payment processors and shipping carriers.',
      'You can request access to or deletion of your personal data at any time by contacting our support team.',
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    body: [
      'By using NorthWell Store, you agree to provide accurate information when placing orders and to use the site for lawful purposes only.',
      'All product descriptions and pricing are accurate to the best of our knowledge but may be updated without prior notice.',
      'NorthWell Store reserves the right to refuse or cancel orders suspected of fraud or abuse of our policies.',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = POLICIES[slug];
  return { title: policy ? `${policy.title} | NorthWell Store` : 'Policy | NorthWell Store' };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = POLICIES[slug];
  if (!policy) notFound();

  return (
    <div className="container-px mx-auto max-w-3xl py-16">
      <h1 className="mb-8 section-title">{policy.title}</h1>
      <div className="space-y-5 text-slate-600">
        {policy.body.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </div>
  );
}
