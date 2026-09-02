import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, MessageSquare, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    title: 'Search verified listings',
    body: 'Filter by estate, city, house type, and budget to find properties that match what you need — every listing shown is currently available, not stale.',
  },
  {
    icon: MessageSquare,
    title: 'Contact the agent directly',
    body: "Message the listing agent on WhatsApp or send an inquiry right from the listing — you're always talking to the person actually managing that property.",
  },
  {
    icon: ShieldCheck,
    title: 'View, agree, move in',
    body: 'Arrange a viewing with the agent, agree on terms, and move in — Frental connects you, the agent handles the rest.',
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-14">
        <h1 className="text-3xl font-semibold text-gray-900">How Frental works</h1>
        <p className="mt-3 max-w-xl text-gray-600">
          Three steps between you and your next home.
        </p>

        <div className="mt-10 space-y-8">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <div key={title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Icon size={18} />
              </span>
              <div>
                <h2 className="font-medium text-gray-900">
                  {i + 1}. {title}
                </h2>
                <p className="mt-1 text-sm text-gray-600">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
