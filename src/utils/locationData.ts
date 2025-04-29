
// This file contains a list of common cities and countries for autocomplete suggestions

export type LocationSuggestion = {
  id: string;
  name: string;
  type: 'city' | 'country';
};

export const locationSuggestions: LocationSuggestion[] = [
  // Countries
  { id: 'us', name: 'United States', type: 'country' },
  { id: 'ca', name: 'Canada', type: 'country' },
  { id: 'uk', name: 'United Kingdom', type: 'country' },
  { id: 'fr', name: 'France', type: 'country' },
  { id: 'de', name: 'Germany', type: 'country' },
  { id: 'jp', name: 'Japan', type: 'country' },
  { id: 'au', name: 'Australia', type: 'country' },
  { id: 'br', name: 'Brazil', type: 'country' },
  { id: 'cn', name: 'China', type: 'country' },
  { id: 'in', name: 'India', type: 'country' },
  { id: 'it', name: 'Italy', type: 'country' },
  { id: 'es', name: 'Spain', type: 'country' },
  { id: 'mx', name: 'Mexico', type: 'country' },
  { id: 'sg', name: 'Singapore', type: 'country' },
  { id: 'th', name: 'Thailand', type: 'country' },
  
  // Cities
  { id: 'nyc', name: 'New York, USA', type: 'city' },
  { id: 'lon', name: 'London, UK', type: 'city' },
  { id: 'par', name: 'Paris, France', type: 'city' },
  { id: 'tok', name: 'Tokyo, Japan', type: 'city' },
  { id: 'syd', name: 'Sydney, Australia', type: 'city' },
  { id: 'rio', name: 'Rio de Janeiro, Brazil', type: 'city' },
  { id: 'bej', name: 'Beijing, China', type: 'city' },
  { id: 'mum', name: 'Mumbai, India', type: 'city' },
  { id: 'rom', name: 'Rome, Italy', type: 'city' },
  { id: 'mad', name: 'Madrid, Spain', type: 'city' },
  { id: 'cdmx', name: 'Mexico City, Mexico', type: 'city' },
  { id: 'sgp', name: 'Singapore, Singapore', type: 'city' },
  { id: 'bkk', name: 'Bangkok, Thailand', type: 'city' },
  { id: 'tor', name: 'Toronto, Canada', type: 'city' },
  { id: 'ber', name: 'Berlin, Germany', type: 'city' },
  { id: 'sf', name: 'San Francisco, USA', type: 'city' },
  { id: 'la', name: 'Los Angeles, USA', type: 'city' },
  { id: 'chi', name: 'Chicago, USA', type: 'city' },
  { id: 'mia', name: 'Miami, USA', type: 'city' },
  { id: 'van', name: 'Vancouver, Canada', type: 'city' },
  { id: 'syd', name: 'Sydney, Australia', type: 'city' },
  { id: 'mel', name: 'Melbourne, Australia', type: 'city' },
  { id: 'hkg', name: 'Hong Kong', type: 'city' },
  { id: 'dub', name: 'Dubai, UAE', type: 'city' },
  { id: 'ams', name: 'Amsterdam, Netherlands', type: 'city' },
  { id: 'bar', name: 'Barcelona, Spain', type: 'city' },
  { id: 'ist', name: 'Istanbul, Turkey', type: 'city' },
  { id: 'vie', name: 'Vienna, Austria', type: 'city' },
  { id: 'cop', name: 'Copenhagen, Denmark', type: 'city' },
];

export const filterLocations = (query: string): LocationSuggestion[] => {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return locationSuggestions.filter(location => 
    location.name.toLowerCase().includes(normalizedQuery)
  ).slice(0, 8); // Limit to 8 results
};
