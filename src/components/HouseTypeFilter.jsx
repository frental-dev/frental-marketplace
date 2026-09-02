import { Home } from 'lucide-react';
import { HOUSE_TYPE_OPTIONS } from '../constants';

export default function HouseTypeFilter({ active, onSelect }) {
  const items = [{ value: '', label: 'All', sublabel: 'All properties', icon: Home }, ...HOUSE_TYPE_OPTIONS];

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Browse by house type</h2>
        <button className="text-sm font-medium text-brand-700 hover:underline">View all types →</button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-9">
        {items.map(({ value, label, sublabel, icon: Icon }) => {
          const isActive = active === value;
          return (
            <button
              key={value || 'all'}
              onClick={() => onSelect(value)}
              className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center transition ${
                isActive
                  ? 'border-brand-600 bg-brand-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-brand-700' : 'text-gray-500'} />
              <span className="text-xs font-medium text-gray-900">{label}</span>
              {sublabel && <span className="text-[11px] text-gray-500">{sublabel}</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
