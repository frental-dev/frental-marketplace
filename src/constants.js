import { Building2, Bed, Sofa, BedDouble, Home, Warehouse, MapPin, Building } from 'lucide-react';

// Mirrors the backend's HouseType enum exactly (prisma/schema.prisma) —
// keep these values in sync with the API, only the labels/icons are presentational.
export const HOUSE_TYPE_OPTIONS = [
  { value: 'BEDSITTER', label: 'Bedsitter', icon: Bed },
  { value: 'ONE_BEDROOM', label: '1 Bedroom', icon: Sofa },
  { value: 'TWO_BEDROOM', label: '2 Bedroom', icon: Sofa },
  { value: 'THREE_BEDROOM', label: '3 Bedroom', icon: BedDouble },
  { value: 'MAISONETTE', label: 'Maisonette', icon: Home },
  { value: 'BUNGALOW', label: 'Bungalow', icon: Warehouse },
  { value: 'PLOT', label: 'Plot', icon: MapPin },
  { value: 'COMMERCIAL', label: 'Commercial', icon: Building },
];

export const HOUSE_TYPE_LABELS = Object.fromEntries(
  HOUSE_TYPE_OPTIONS.map((opt) => [opt.value, opt.label])
);
