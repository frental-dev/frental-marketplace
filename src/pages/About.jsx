import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-3xl font-semibold text-gray-900">About Frental</h1>
        <p className="mt-4 text-gray-600">
          Frental brings Kenya's rental market into one place. Instead of scrolling
          through scattered WhatsApp groups, Facebook posts, and TikTok videos to
          find a house, renters can search verified listings from trusted agents —
          all in one marketplace.
        </p>
        <p className="mt-4 text-gray-600">
          Every listing on Frental comes from a real agent actively managing it
          through the Frental app — updated when a house is taken, so you're never
          chasing a listing that's already gone.
        </p>
        <p className="mt-4 text-gray-600">
          We built Frental because house-hunting in Nairobi shouldn't mean
          juggling five apps and a dozen phone calls. It should mean opening one
          page and finding your next home.
        </p>
      </div>
      <Footer />
    </div>
  );
}
