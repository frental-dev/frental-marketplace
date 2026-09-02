import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Smartphone, MessageCircle } from "lucide-react";

/**
 * The marketplace website is public/read-only by design — there's no agent
 * login here (that's the mobile CRM app's job, see /api/agents/signup).
 * This page directs interested agents to get set up via the app instead of
 * pretending to onboard them here.
 */
export default function ListProperty() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-14 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <Smartphone size={24} />
        </span>
        <h1 className="mt-5 text-3xl font-semibold text-gray-900">
          List your property on Frental
        </h1>
        <p className="mt-3 text-gray-600">
          Listings are managed by agents through the Frental app — it's where
          you add photos, set rent and deposit, track clients, and mark a place
          as taken the moment it's rented. Once you're set up, your listings
          appear here automatically.
        </p>

        <a
          href="https://wa.me/254704188946?text=Hi%2C%20I%27d%20like%20to%20list%20properties%20on%20Frental"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3 text-sm font-medium text-white hover:bg-brand-800"
        >
          <MessageCircle size={16} /> Get set up as an agent
        </a>
      </div>
      <Footer />
    </div>
  );
}
