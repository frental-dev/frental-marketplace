import { Heart, BedDouble, Bath, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HOUSE_TYPE_LABELS } from '../constants';
import { useSavedProperties } from '../hooks/useSavedProperties';

function formatRent(rent) {
  return `KSh ${rent.toLocaleString()}`;
}

export default function PropertyCard({ property, featured = false }) {
  const coverImage = property.media?.[0]?.thumbnailUrl || property.media?.[0]?.url;
  const { isSaved, toggleSaved } = useSavedProperties();
  const saved = isSaved(property.id);

  return (
    <Link
      to={`/properties/${property.id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-44 w-full overflow-hidden bg-gray-100">
        {coverImage ? (
          <img
            src={coverImage}
            alt={property.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            No photo yet
          </div>
        )}

        {featured && (
          <span className="absolute left-3 top-3 rounded-md bg-brand-700 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
            Featured
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleSaved(property.id);
          }}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 hover:text-brand-700 ${
            saved ? 'text-brand-700' : 'text-gray-500'
          }`}
          aria-label={saved ? 'Remove from saved' : 'Save property'}
        >
          <Heart size={15} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-base font-semibold text-gray-900">
          {formatRent(property.rent)} <span className="text-sm font-normal text-gray-500">/month</span>
        </p>
        <p className="mt-1 text-sm font-medium text-gray-800">
          {HOUSE_TYPE_LABELS[property.houseType] || property.title}
        </p>
        <p className="mt-0.5 text-xs text-gray-500">
          {property.estate}, {property.city}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <BedDouble size={14} /> {property.bedrooms}
            </span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath size={14} /> {property.bathrooms}
            </span>
          )}
          {property.features?.includes('parking') && (
            <span className="flex items-center gap-1">
              <Car size={14} /> Parking
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
