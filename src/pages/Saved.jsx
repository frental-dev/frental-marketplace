import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartOff } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { useSavedProperties } from '../hooks/useSavedProperties';
import { getProperty } from '../api/marketplace';

export default function Saved() {
  const { savedIds } = useSavedProperties();
  const [properties, setProperties] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (savedIds.length === 0) {
      setProperties([]);
      setStatus('ready');
      return;
    }

    let cancelled = false;
    setStatus('loading');

    // No batch-fetch-by-ids endpoint exists, so this is one call per saved
    // property. Fine at the scale of a personal saved list (a handful to a
    // few dozen); Promise.allSettled so one removed/unavailable listing
    // doesn't break the whole page.
    Promise.allSettled(savedIds.map((id) => getProperty(id))).then((results) => {
      if (cancelled) return;
      const found = results
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value.property);
      setProperties(found);
      setStatus('ready');
    });

    return () => {
      cancelled = true;
    };
  }, [savedIds]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">Saved properties</h1>
        <p className="mt-1 text-sm text-gray-500">
          Saved on this device — the heart icon on any listing adds it here.
        </p>

        {status === 'loading' && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        )}

        {status === 'ready' && savedIds.length === 0 && (
          <div className="mt-10 flex flex-col items-center rounded-2xl bg-gray-50 p-10 text-center">
            <HeartOff size={28} className="text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">Nothing saved yet.</p>
            <Link to="/properties" className="mt-3 text-sm font-medium text-brand-700 hover:underline">
              Browse properties →
            </Link>
          </div>
        )}

        {status === 'ready' && savedIds.length > 0 && properties.length === 0 && (
          <p className="mt-6 rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500">
            None of your saved listings are available anymore — they may have been rented out.
          </p>
        )}

        {status === 'ready' && properties.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
