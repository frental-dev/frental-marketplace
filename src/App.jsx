import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import AgentsDirectory from './pages/AgentsDirectory';
import AgentProfile from './pages/AgentProfile';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import ListProperty from './pages/ListProperty';
import Saved from './pages/Saved';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:propertyId" element={<PropertyDetail />} />
      <Route path="/agents" element={<AgentsDirectory />} />
      <Route path="/agents/:slug" element={<AgentProfile />} />
      <Route path="/about" element={<About />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/list-your-property" element={<ListProperty />} />
      <Route path="/saved" element={<Saved />} />
    </Routes>
  );
}
