import { Search } from 'lucide-react';
import { HOUSE_TYPE_OPTIONS } from '../constants';

const POPULAR_SEARCHES = ['Kilimani', 'Lavington', 'Westlands', 'Ruiru', 'South B'];

export default function Hero({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    onSearch?.({
      estate: form.get('estate') || undefined,
      houseType: form.get('houseType') || undefined,
      minRent: form.get('minRent') || undefined,
      maxRent: form.get('maxRent') || undefined,
    });
  };

  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-semibold leading-tight text-gray-900 md:text-5xl">
            Find your next home with <span className="text-brand-700">Frental</span>
          </h1>
          <p className="mt-4 max-w-md text-gray-600">
            Explore verified properties from trusted agents. Rent smarter. Live better.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 items-center gap-2 px-2">
              <Search size={18} className="text-gray-400" />
              <input
                name="estate"
                type="text"
                placeholder="Search by estate (e.g. Kilimani, Lavington)"
                className="w-full border-none py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0"
              />
            </div>

            <label className="flex flex-col border-t border-gray-100 px-2 pt-2 text-xs text-gray-500 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
              House Type
              <select name="houseType" className="mt-0.5 bg-transparent text-sm text-gray-800 focus:outline-none">
                <option value="">Any</option>
                {HOUSE_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col border-t border-gray-100 px-2 pt-2 text-xs text-gray-500 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
              Min Price
              <input
                name="minRent"
                type="number"
                placeholder="Any"
                className="mt-0.5 w-20 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
            </label>

            <label className="flex flex-col border-t border-gray-100 px-2 pt-2 text-xs text-gray-500 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
              Max Price
              <input
                name="maxRent"
                type="number"
                placeholder="Any"
                className="mt-0.5 w-20 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
            </label>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-sm font-medium text-white hover:bg-brand-800"
            >
              <Search size={16} /> Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-gray-500">Popular searches:</span>
            {POPULAR_SEARCHES.map((estate) => (
              <button
                key={estate}
                onClick={() => onSearch?.({ estate })}
                className="text-brand-700 hover:underline"
              >
                {estate}
              </button>
            ))}
          </div>
        </div>

        <div className="relative hidden h-80 overflow-hidden rounded-3xl md:block lg:h-96">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
            alt="Living room interior"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
