import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MessageCircle } from 'lucide-react';

/**
 * NOTE: this page is intentionally static, not a form that posts anywhere.
 * The backend's only public inquiry endpoint (POST /api/leads/public)
 * requires a propertyId — it's designed for "ask about this listing", not
 * a general contact form. Rather than change the backend to add a generic
 * contact endpoint, this page just gives people direct channels instead.
 * If a real "contact us" inbox is wanted later, that's a small backend
 * addition worth doing deliberately rather than working around here.
 */
export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-14">
        <h1 className="text-3xl font-semibold text-gray-900">Contact us</h1>
        <p className="mt-3 text-gray-600">
          Have a question about a listing, an agent, or Frental itself? Reach us
          directly through any of these:
        </p>

        <div className="mt-8 space-y-4">
          <a
            href="mailto:hello@frental.co.ke"
            className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 hover:border-gray-300"
          >
            <Mail size={18} className="text-brand-700" />
            <span className="text-sm text-gray-800">hello@frental.co.ke</span>
          </a>
          <a
            href="tel:+254700000000"
            className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 hover:border-gray-300"
          >
            <Phone size={18} className="text-brand-700" />
            <span className="text-sm text-gray-800">+254 700 000 000</span>
          </a>
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 hover:border-gray-300"
          >
            <MessageCircle size={18} className="text-brand-700" />
            <span className="text-sm text-gray-800">Chat with us on WhatsApp</span>
          </a>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Looking for a specific property? Contact the listing agent directly from
          that property's page instead — they'll respond fastest.
        </p>
      </div>
      <Footer />
    </div>
  );
}
