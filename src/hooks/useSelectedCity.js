import { useCallback, useState } from 'react';

const STORAGE_KEY = 'frental_selected_city';

export function useSelectedCity() {
  const [selectedCity, setSelectedCityState] = useState(() => localStorage.getItem(STORAGE_KEY) || '');

  const setSelectedCity = useCallback((city) => {
    setSelectedCityState(city);
    if (city) {
      localStorage.setItem(STORAGE_KEY, city);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return { selectedCity, setSelectedCity };
}
