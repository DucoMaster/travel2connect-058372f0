import Papa from 'papaparse';
import { useEffect, useState } from 'react';

// Type definition for LocationSuggestion
export interface LocationSuggestion {
  id: string;
  name: string;
  type: 'city' | 'country';
}

// Function to load and parse the CSV file (assuming CSV has "City" and "Country" columns)
export const loadCityCountryData = (csvFile: string): Promise<LocationSuggestion[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      complete: (result) => {
        const cityCountryList = result.data.map((row: any, index: number) => ({
          id: index.toString(),
          name: `${row.City}, ${row.Country}`,
          type: 'city',
        }));
        resolve(cityCountryList);
      },
      error: (error) => reject(error),
    });
  });
};

// Filter function to get city-country suggestions
export const filterLocations = (query: string, cityCountryData: LocationSuggestion[]) => {
  return cityCountryData.filter((item) => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
};
