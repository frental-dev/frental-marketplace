import { ShieldCheck, UserCheck, Lock, Headset } from 'lucide-react';

const BADGES = [
  { icon: ShieldCheck, title: 'Verified Properties', subtitle: 'All listings are verified' },
  { icon: UserCheck, title: 'Trusted Agents', subtitle: 'Professional & reliable' },
  { icon: Lock, title: 'Secure & Easy', subtitle: 'Safe communication' },
  { icon: Headset, title: 'Support', subtitle: "We're here to help" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-6 md:grid-cols-4">
        {BADGES.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Icon size={18} />
            </span>
            <div>
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
