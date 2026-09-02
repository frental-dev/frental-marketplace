import { useState } from 'react';
import { submitInquiry } from '../api/marketplace';

export default function InquiryForm({ propertyId }) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await submitInquiry({ propertyId, ...form });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5 text-sm text-brand-800">
        Your inquiry was sent — the agent will reach out to you directly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-900">Request more info</h3>

      <input
        type="text"
        required
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
      />
      <input
        type="tel"
        required
        placeholder="Phone number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
      />
      <textarea
        rows={3}
        placeholder="I'm interested in this property, is it still available?"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
      />

      {status === 'error' && (
        <p className="text-xs text-red-600">Something went wrong sending that — please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-lg bg-brand-700 py-2.5 text-sm font-medium text-white hover:bg-brand-800 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send inquiry'}
      </button>
    </form>
  );
}
