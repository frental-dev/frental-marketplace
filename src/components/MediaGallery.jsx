import { useState } from 'react';

export default function MediaGallery({ media = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[activeIndex];

  if (media.length === 0) {
    return (
      <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-400">
        No photos uploaded yet for this listing
      </div>
    );
  }

  return (
    <div>
      <div className="h-80 w-full overflow-hidden rounded-2xl bg-gray-100 sm:h-96">
        {active.type === 'VIDEO' ? (
          <video src={active.url} controls className="h-full w-full object-cover" />
        ) : (
          <img src={active.url} alt="Property" className="h-full w-full object-cover" />
        )}
      </div>

      {media.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {media.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(i)}
              className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${
                i === activeIndex ? 'border-brand-700' : 'border-transparent'
              }`}
            >
              <img
                src={item.thumbnailUrl || item.url}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
