import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import PropertyCard from '../components/PropertyCard';
import Pagination from '../components/Pagination';
import { searchProperties } from '../api/marketplace';

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    estate: searchParams.get('estate') || undefined,
    city: searchParams.get('city') || undefined,
    houseType: searchParams.get('houseType') || undefined,
    minRent: searchParams.get('minRent') || undefined,
    maxRent: searchParams.get('maxRent') || undefined,
    minBedrooms: searchParams.get('minBedrooms') || undefined,
    minBathrooms: searchParams.get('minBathrooms') || undefined,
  });
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [data, setData] = useState({ results: [], pagination: null });
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    searchProperties({ ...filters, page, pageSize: 12 })
      .then((res) => {
        if (cancelled) return;
        setData(res);
        setStatus('ready');
      })
      .catch(() => !cancelled && setStatus('error'));

    // Keep the URL shareable — reflects exactly what's currently applied.
    const params = Object.fromEntries(
      Object.entries({ ...filters, page }).filter(([, v]) => v !== undefined && v !== '')
    );
    setSearchParams(params, { replace: true });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
        <p className="mt-1 text-sm text-gray-500">
          {status === 'ready' && data.pagination
            ? `${data.pagination.total} listing${data.pagination.total === 1 ? '' : 's'} found`
            : 'Searching listings…'}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
          <FilterSidebar filters={filters} onChange={setFilters} onSubmit={() => setPage(1)} />

          <div>
            {status === 'loading' && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-72 animate-pulse rounded-2xl bg-gray-100" />
                ))}
              </div>
            )}

            {status === 'error' && (
              <p className="rounded-xl bg-gray-50 p-8 text-center text-sm text-gray-500">
                Couldn't load listings right now — the API may be waking up from idle
                (Render free tier). Try again in a moment.
              </p>
            )}

            {status === 'ready' && data.results.length === 0 && (
              <p className="rounded-xl bg-gray-50 p-8 text-center text-sm text-gray-500">
                No listings match these filters. Try widening your search.
              </p>
            )}

            {status === 'ready' && data.results.length > 0 && (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {data.results.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
                <Pagination pagination={data.pagination} onPageChange={setPage} />
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
