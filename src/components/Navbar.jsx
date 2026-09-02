import { useState } from 'react';
import { Home, ChevronDown, Heart, Check } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCities } from '../hooks/useCities';
import { useSelectedCity } from '../hooks/useSelectedCity';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'Agents', href: '/agents' },
  { label: 'About Us', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cities, status } = useCities();
  const { selectedCity, setSelectedCity } = useSelectedCity();
  const [cityMenuOpen, setCityMenuOpen] = useState(false);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCityMenuOpen(false);
    navigate(city ? `/properties?city=${encodeURIComponent(city)}` : '/properties');
  };

  return (
    <header className="relative border-b border-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-white">
            <Home size={18} />
          </span>
          <span>
            <span className="block text-lg font-semibold leading-tight text-gray-900">Frental</span>
            <span className="block text-xs leading-tight text-gray-500">Marketplace</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={
                  isActive
                    ? 'border-b-2 border-brand-700 pb-1 text-sm font-medium text-brand-700'
                    : 'text-sm text-gray-600 hover:text-gray-900'
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <button
              onClick={() => setCityMenuOpen((open) => !open)}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-gray-300"
            >
              {selectedCity || 'All Cities'} <ChevronDown size={14} />
            </button>

            {cityMenuOpen && (
              <>
                {/* Click-away layer */}
                <div className="fixed inset-0 z-10" onClick={() => setCityMenuOpen(false)} />
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                  <button
                    onClick={() => handleCitySelect('')}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    All Cities
                    {!selectedCity && <Check size={14} className="text-brand-700" />}
                  </button>

                  {status === 'loading' && (
                    <p className="px-3 py-2 text-xs text-gray-400">Loading cities…</p>
                  )}
                  {status === 'error' && (
                    <p className="px-3 py-2 text-xs text-gray-400">Couldn't load cities</p>
                  )}
                  {status === 'ready' && cities.length === 0 && (
                    <p className="px-3 py-2 text-xs text-gray-400">No cities yet</p>
                  )}

                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {city}
                      {selectedCity === city && <Check size={14} className="text-brand-700" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <Link to="/saved" className="hidden items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 sm:flex">
            <Heart size={16} /> Saved
          </Link>

          <Link
            to="/list-your-property"
            className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800"
          >
            List Your Property
          </Link>
        </div>
      </div>
    </header>
  );
}
