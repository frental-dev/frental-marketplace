import { useEffect, useState } from 'react';
import { searchProperties } from '../api/marketplace';

/**
 * IMPORTANT LIMITATION: same situation as AgentsDirectory — the backend has
 * no "list distinct cities" endpoint, only property search. This derives
 * cities by sampling a page of properties and deduping the `city` field.
 * Fine for a handful of cities (Nairobi, Mombasa, Kisumu, etc.) at current
 * scale. If listings ever span dozens of cities, a real
 * GET /api/marketplace/cities endpoint would be the clean fix.
 */
export function useCities() {
  const [cities, setCities] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    searchProperties({ pageSize: 50 })
      .then((data) => {
        const unique = [...new Set(data.results.map((p) => p.city).filter(Boolean))].sort();
        setCities(unique);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return { cities, status };
}
