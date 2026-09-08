import { HOUSE_TYPE_OPTIONS } from '../constants';

export default function FilterSidebar({ filters, onChange, onSubmit }) {
  const set = (key, value) => onChange({ ...filters, [key]: value || undefined });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-5 rounded-2xl border border-gray-100 bg-white p-5"
    >
      <h3 className="text-sm font-semibold text-gray-900">Filter properties</h3>

      <div>
        <label className="text-xs font-medium text-gray-600">Estate</label>
        <input
          type="text"
          value={filters.estate || ''}
          onChange={(e) => set('estate', e.target.value)}
          placeholder="e.g. Kilimani"
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600">City</label>
        <input
          type="text"
          value={filters.city || ''}
          onChange={(e) => set('city', e.target.value)}
          placeholder="e.g. Nairobi"
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600">House type</label>
        <select
          value={filters.houseType || ''}
          onChange={(e) => set('houseType', e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
        >
          <option value="">Any</option>
          {HOUSE_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-600">Min bedrooms</label>
          <input
            type="number"
            min="0"
            value={filters.minBedrooms || ''}
            onChange={(e) => set('minBedrooms', e.target.value)}
            placeholder="Any"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Min bathrooms</label>
          <input
            type="number"
            min="0"
            value={filters.minBathrooms || ''}
            onChange={(e) => set('minBathrooms', e.target.value)}
            placeholder="Any"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-600">Min rent</label>
          <input
            type="number"
            value={filters.minRent || ''}
            onChange={(e) => set('minRent', e.target.value)}
            placeholder="0"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600">Max rent</label>
          <input
            type="number"
            value={filters.maxRent || ''}
            onChange={(e) => set('maxRent', e.target.value)}
            placeholder="Any"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-brand-700 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
      >
        Apply filters
      </button>
    </form>
  );
}
