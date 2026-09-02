const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://frental-backend.onrender.com/api';

/**
 * Public, unauthenticated marketplace search — matches GET /api/marketplace/properties
 * on the backend. Accepts the same filter keys: estate, city, houseType,
 * minRent, maxRent, page, pageSize.
 */
export async function searchProperties(filters = {}) {
  const params = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== undefined && v !== null && v !== ''))
  );
  const res = await fetch(`${API_BASE}/marketplace/properties?${params}`);
  if (!res.ok) throw new Error(`Failed to load properties (${res.status})`);
  return res.json(); // { results, pagination }
}

export async function getProperty(propertyId) {
  const res = await fetch(`${API_BASE}/marketplace/properties/${propertyId}`);
  if (!res.ok) throw new Error(`Failed to load property (${res.status})`);
  return res.json(); // { property }
}

/**
 * Public agent page — matches GET /api/agents/public/:slug. Returns the
 * agent plus every AVAILABLE property they have listed, each with media.
 * Powers both the individual agent page and (best-effort, see AgentsDirectory)
 * the agents directory, since there's no "list all agents" endpoint on the
 * backend — only lookup-by-slug.
 */
export async function getAgentPublicProfile(slug) {
  const res = await fetch(`${API_BASE}/agents/public/${slug}`);
  if (!res.ok) throw new Error(`Failed to load agent (${res.status})`);
  return res.json(); // { agent }
}

/**
 * Public agent profile — matches GET /api/agents/public/:slug (not under
 * /marketplace, but still fully public/unauthenticated). Includes the
 * agent's available properties with media.
 */
export async function getPublicAgent(slug) {
  const res = await fetch(`${API_BASE}/agents/public/${slug}`);
  if (!res.ok) throw new Error(`Failed to load agent (${res.status})`);
  return res.json(); // { agent }
}

/**
 * Public inquiry — matches POST /api/leads/public. Used by a "Contact agent"
 * or "Request viewing" form on a property detail page.
 */
export async function submitInquiry({ propertyId, name, phone, message }) {
  const res = await fetch(`${API_BASE}/leads/public`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ propertyId, source: 'MARKETPLACE', name, phone, message }),
  });
  if (!res.ok) throw new Error(`Failed to submit inquiry (${res.status})`);
  return res.json();
}
