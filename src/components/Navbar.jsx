import { useEffect, useState } from 'react';
import { Home, ChevronDown, Heart, Check, Menu, X } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close the mobile menu automatically on navigation — otherwise it stays
  // open over the new page, which reads as broken.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Escape closes either open panel — standard keyboard expectation.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setCityMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCityMenuOpen(false);
    setMobileMenuOpen(false);
    navigate(city ? `/properties?city=${encodeURIComponent(city)}` : '/properties');
  };

  return (
    <header className="relative border-b border-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-white">
            <Home size={18} />
          </span>
          <span>
            <span className="block text-lg font-semibold leading-tight text-gray-900">Frental</span>
            <span className="block text-xs leading-tight text-gray-500">Marketplace</span>
          </span>
        </Link>

        {/* Desktop nav — unchanged, md and up */}
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

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden sm:block">
            <button
              onClick={() => setCityMenuOpen((open) => !open)}
              className="flex min-h-[44px] items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-gray-300"
              aria-expanded={cityMenuOpen}
              aria-haspopup="listbox"
            >
              {selectedCity || 'All Cities'} <ChevronDown size={14} />
            </button>

            {cityMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setCityMenuOpen(false)} />
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                  <button
                    onClick={() => handleCitySelect('')}
                    className="flex min-h-[44px] w-full items-center justify-between px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
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
                      className="flex min-h-[44px] w-full items-center justify-between px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {city}
                      {selectedCity === city && <Check size={14} className="text-brand-700" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <Link to="/saved" className="hidden min-h-[44px] items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 sm:flex">
            <Heart size={16} /> Saved
          </Link>

          <Link
            to="/list-your-property"
            className="hidden min-h-[44px] items-center rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800 sm:flex"
          >
            List Your Property
          </Link>

          {/* Mobile menu toggle — everything above sm is hidden on small
              screens, this is the only way in below that breakpoint. */}
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-50 sm:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel — everything the desktop header offers, reachable
          below the sm breakpoint where it would otherwise be completely
          inaccessible. */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white sm:hidden">
          <nav className="flex flex-col px-4 py-2">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex min-h-[48px] items-center rounded-lg px-2 text-base ${
                    isActive ? 'font-medium text-brand-700' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link to="/saved" className="flex min-h-[48px] items-center gap-2 rounded-lg px-2 text-base text-gray-700">
              <Heart size={18} /> Saved
            </Link>
          </nav>

          <div className="border-t border-gray-100 px-4 py-3">
            <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-gray-400">City</p>
            <button
              onClick={() => handleCitySelect('')}
              className={`flex min-h-[44px] w-full items-center justify-between rounded-lg px-2 text-base ${
                !selectedCity ? 'font-medium text-brand-700' : 'text-gray-700'
              }`}
            >
              All Cities
              {!selectedCity && <Check size={16} />}
            </button>
            {status === 'ready' &&
              cities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className={`flex min-h-[44px] w-full items-center justify-between rounded-lg px-2 text-base ${
                    selectedCity === city ? 'font-medium text-brand-700' : 'text-gray-700'
                  }`}
                >
                  {city}
                  {selectedCity === city && <Check size={16} />}
                </button>
              ))}
          </div>

          <div className="px-4 pb-4 pt-1">
            <Link
              to="/list-your-property"
              className="flex min-h-[48px] w-full items-center justify-center rounded-lg bg-brand-700 text-base font-medium text-white"
            >
              List Your Property
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
