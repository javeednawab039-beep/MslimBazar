export const metadata = { title: 'Careers | NorthWell Store' };

const openings = [
  { title: 'Customer Support Specialist', location: 'Remote', type: 'Full-time' },
  { title: 'Supply Chain Coordinator', location: 'Remote', type: 'Full-time' },
  { title: 'Performance Marketing Manager', location: 'Remote', type: 'Contract' },
];

export default function CareersPage() {
  return (
    <div className="container-px mx-auto max-w-4xl py-16">
      <h1 className="mb-4 text-center section-title">Careers at NorthWell</h1>
      <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
        We&apos;re a small, remote-first team building a premium shopping experience. Here&apos;s
        what we&apos;re hiring for right now.
      </p>
      <div className="space-y-4">
        {openings.map((job) => (
          <div key={job.title} className="card flex items-center justify-between p-5">
            <div>
              <h2 className="font-semibold text-brand-navy">{job.title}</h2>
              <p className="text-sm text-slate-500">{job.location} &middot; {job.type}</p>
            </div>
            <a href="mailto:careers@northwellstore.com" className="btn-secondary text-xs">
              Apply
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
