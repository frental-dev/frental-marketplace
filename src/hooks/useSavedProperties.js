import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'frental_saved_properties';

function readSavedIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * "Saved" properties for anonymous marketplace visitors, kept entirely in
 * localStorage — there's no backend concept of favorites for unauthenticated
 * users, and adding one would mean either accounts for visitors or a
 * device-bound identifier server-side. Local-only is the right scope for
 * this feature right now: it works per-browser, needs no auth, and needs
 * no backend change.
 */
export function useSavedProperties() {
  const [savedIds, setSavedIds] = useState(readSavedIds);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

  const isSaved = useCallback((propertyId) => savedIds.includes(propertyId), [savedIds]);

  const toggleSaved = useCallback((propertyId) => {
    setSavedIds((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  }, []);

  return { savedIds, isSaved, toggleSaved };
}
