import { MessageCircle, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AgentCard({ agent, propertyTitle }) {
  if (!agent) return null;

  const whatsappHref = agent.whatsapp
    ? `https://wa.me/${agent.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
        `Hi ${agent.name}, I'm interested in "${propertyTitle}" I saw on Frental.`
      )}`
    : null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
          {agent.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
            {agent.name}
            {agent.isVerified && <BadgeCheck size={14} className="text-brand-600" />}
          </p>
          <Link to={`/agents/${agent.publicSlug}`} className="text-xs text-brand-700 hover:underline">
            View all their listings
          </Link>
        </div>
      </div>

      {whatsappHref && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-700 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
        >
          <MessageCircle size={16} /> Chat on WhatsApp
        </a>
      )}
    </div>
  );
}
