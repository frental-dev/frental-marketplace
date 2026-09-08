import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MediaGallery from '../components/MediaGallery';
import AgentCard from '../components/AgentCard';
import InquiryForm from '../components/InquiryForm';
import { getProperty } from '../api/marketplace';
import { HOUSE_TYPE_LABELS } from '../constants';

export default function PropertyDetail() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    getProperty(propertyId)
      .then((data) => {
        if (cancelled) return;
        setProperty(data.property);
        setStatus('ready');
      })
      .catch(() => !cancelled && setStatus('error'));

    return () => {
      cancelled = true;
    };
  }, [propertyId]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Link to="/properties" className="text-sm text-brand-700 hover:underline">
          ← Back to properties
        </Link>

        {status === 'loading' && (
          <div className="mt-6 h-96 animate-pulse rounded-2xl bg-gray-100" />
        )}

        {status === 'error' && (
          <p className="mt-6 rounded-xl bg-gray-50 p-8 text-center text-sm text-gray-500">
            This listing couldn't be loaded — it may no longer be available, or the
            API is waking up from idle. Try again in a moment.
          </p>
        )}

        {status === 'ready' && property && (
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <MediaGallery media={property.media} />

              <div className="mt-6">
                <p className="text-2xl font-semibold text-gray-900">
                  KSh {property.rent.toLocaleString()}{' '}
                  <span className="text-base font-normal text-gray-500">/month</span>
                </p>
                <h1 className="mt-1 text-lg font-medium text-gray-900">{property.title}</h1>
                <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                  <MapPin size={14} /> {property.estate}, {property.city}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
                    {HOUSE_TYPE_LABELS[property.houseType]}
                  </span>
                  {property.bedrooms != null && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                      {property.bedrooms} bed{property.bedrooms === 1 ? '' : 's'}
                    </span>
                  )}
                  {property.bathrooms != null && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                      {property.bathrooms} bath{property.bathrooms === 1 ? '' : 's'}
                    </span>
                  )}
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                    Deposit: KSh {property.deposit.toLocaleString()}
                  </span>
                </div>

                {property.description && (
                  <p className="mt-5 text-sm leading-relaxed text-gray-700">{property.description}</p>
                )}

                {property.features?.length > 0 && (
                  <div className="mt-5">
                    <h3 className="text-sm font-semibold text-gray-900">Features</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {property.features.map((f) => (
                        <span
                          key={f}
                          className="rounded-lg border border-gray-200 px-3 py-1 text-xs capitalize text-gray-600"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <AgentCard agent={property.agent} propertyTitle={property.title} />
              <InquiryForm propertyId={property.id} />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
