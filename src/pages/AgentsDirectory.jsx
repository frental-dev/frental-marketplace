import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { searchProperties } from '../api/marketplace';

/**
 * IMPORTANT LIMITATION: the backend has no "list all agents" endpoint —
 * only GET /api/agents/public/:slug (lookup by known slug). This page works
 * around that by pulling a large page of properties and deduping the agents
 * embedded in each result. That means:
 *   - only agents with at least one AVAILABLE listing show up here
 *   - if there are more than ~100 distinct agents, some won't appear on one page
 * If a real agent directory becomes important, the clean fix is a backend
 * endpoint (e.g. GET /api/marketplace/agents) rather than this workaround —
 * flag that to the backend owner rather than growing this page's page-size
 * indefinitely.
 */
export default function AgentsDirectory() {
  const [agents, setAgents] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    searchProperties({ pageSize: 50 })
      .then((data) => {
        const seen = new Map();
        for (const property of data.results) {
          if (property.agent?.publicSlug && !seen.has(property.agent.publicSlug)) {
            seen.set(property.agent.publicSlug, property.agent);
          }
        }
        setAgents([...seen.values()]);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">Agents</h1>
        <p className="mt-1 text-sm text-gray-500">Agents currently listing available properties on Frental.</p>

        {status === 'loading' && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        )}

        {status === 'error' && (
          <p className="mt-6 rounded-xl bg-gray-50 p-8 text-center text-sm text-gray-500">
            Couldn't load agents right now — try again in a moment.
          </p>
        )}

        {status === 'ready' && agents.length === 0 && (
          <p className="mt-6 rounded-xl bg-gray-50 p-8 text-center text-sm text-gray-500">
            No agents with active listings yet.
          </p>
        )}

        {status === 'ready' && agents.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => (
              <Link
                key={agent.publicSlug}
                to={`/agents/${agent.publicSlug}`}
                className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 hover:border-gray-300"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
                  {agent.name?.[0]?.toUpperCase()}
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-gray-900">
                  {agent.name}
                  {agent.isVerified && <BadgeCheck size={14} className="text-brand-600" />}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
