import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BadgeCheck, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { getAgentPublicProfile } from '../api/marketplace';

export default function AgentProfile() {
  const { slug } = useParams();
  const [agent, setAgent] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    getAgentPublicProfile(slug)
      .then((data) => {
        if (cancelled) return;
        setAgent(data.agent);
        setStatus('ready');
      })
      .catch(() => !cancelled && setStatus('error'));

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const whatsappHref =
    agent?.whatsapp &&
    `https://wa.me/${agent.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
      `Hi ${agent.name}, I found your listings on Frental.`
    )}`;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        {status === 'loading' && <div className="h-40 animate-pulse rounded-2xl bg-gray-100" />}

        {status === 'error' && (
          <p className="rounded-xl bg-gray-50 p-8 text-center text-sm text-gray-500">
            Couldn't find this agent page — check the link, or the API may be waking up
            from idle.
          </p>
        )}

        {status === 'ready' && agent && (
          <>
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-xl font-semibold text-brand-700">
                  {agent.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <h1 className="flex items-center gap-1.5 text-xl font-semibold text-gray-900">
                    {agent.name}
                    {agent.isVerified && <BadgeCheck size={18} className="text-brand-600" />}
                  </h1>
                  {agent.bio && <p className="mt-1 max-w-md text-sm text-gray-600">{agent.bio}</p>}
                </div>
              </div>

              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
                >
                  <MessageCircle size={16} /> Message on WhatsApp
                </a>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">
                {agent.properties?.length || 0} available listing
                {agent.properties?.length === 1 ? '' : 's'}
              </h2>

              {(!agent.properties || agent.properties.length === 0) && (
                <p className="mt-4 rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500">
                  This agent has no available listings right now.
                </p>
              )}

              {agent.properties?.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {agent.properties.map((property) => (
                    <PropertyCard key={property.id} property={{ ...property, agent }} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
