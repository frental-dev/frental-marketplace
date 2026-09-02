import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import { searchProperties } from '../api/marketplace';

export default function PropertyGrid({ title, filters, featured = false, viewAllHref }) {
  const [properties, setProperties] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    searchProperties({ ...filters, pageSize: 4 })
      .then((data) => {
        if (cancelled) return;
        setProperties(data.results);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(filters)]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {viewAllHref && (
          <Link to={viewAllHref} className="text-sm font-medium text-brand-700 hover:underline">
            View all →
          </Link>
        )}
      </div>

      {status === 'loading' && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      )}

      {status === 'error' && (
        <p className="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500">
          Couldn't load listings right now — the API may be waking up from idle. Try refreshing in a moment.
        </p>
      )}

      {status === 'ready' && properties.length === 0 && (
        <p className="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500">
          No listings match this search yet.
        </p>
      )}

      {status === 'ready' && properties.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} featured={featured} />
          ))}
        </div>
      )}
    </section>
  );
}
