import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import HouseTypeFilter from '../components/HouseTypeFilter';
import PropertyGrid from '../components/PropertyGrid';

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (filters) => {
    const params = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
    );
    navigate(`/properties?${params}`);
  };

  const handleHouseTypeSelect = (houseType) => {
    navigate(houseType ? `/properties?houseType=${houseType}` : '/properties');
  };

  return (
    <div>
      <Navbar />
      <Hero onSearch={handleSearch} />
      <TrustBadges />
      <HouseTypeFilter active="" onSelect={handleHouseTypeSelect} />
      {/* The backend's Property model has no "featured" boolean — both grids
          pull from the same newest-first query. Recent uses page 2 so it
          isn't a literal duplicate of Featured. If true curated "featured"
          listings are wanted later, that needs a new field on Property. */}
      <PropertyGrid title="Featured Properties" filters={{}} featured viewAllHref="/properties" />
      <PropertyGrid title="Recent Properties" filters={{ page: '2' }} viewAllHref="/properties" />
      <Footer />
    </div>
  );
}
