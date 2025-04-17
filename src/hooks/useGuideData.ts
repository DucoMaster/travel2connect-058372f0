
import { useMemo } from 'react';
import { User, Package } from '@/types';
import { mockPackages, mockUsers } from '@/data/mockData';

export const useGuideData = (
  searchTerm: string,
  selectedLocation: string,
  selectedRanking: string
) => {
  // Get all guides from users array
  const guides = useMemo(() => {
    return mockUsers.filter(user => user.role === 'guide');
  }, []);
  
  // Get all locations from guides
  const locations = useMemo(() => {
    const uniqueLocations = new Set(guides.map(guide => guide.location).filter(Boolean) as string[]);
    return Array.from(uniqueLocations).sort();
  }, [guides]);
  
  // Get guide packages
  const guidePackages = useMemo(() => {
    return mockPackages.filter(pkg => pkg.category === 'guide' || pkg.creatorRole === 'guide');
  }, []);
  
  // Create a map of guides with their packages
  const guidesWithPackages = useMemo(() => {
    return guides.map(guide => {
      const packages = guidePackages.filter(pkg => pkg.createdBy === guide.id);
      return { ...guide, packages };
    });
  }, [guides, guidePackages]);
  
  // Filter guides based on search term, location, and ranking
  const filteredGuides = useMemo(() => {
    return guidesWithPackages.filter(guide => {
      const matchesSearch = 
        (guide.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (guide.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (guide.location?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      
      const matchesLocation = !selectedLocation || guide.location === selectedLocation;
      const matchesRanking = selectedRanking === 'all' || guide.ranking >= parseInt(selectedRanking);
      
      return matchesSearch && matchesLocation && matchesRanking;
    });
  }, [guidesWithPackages, searchTerm, selectedLocation, selectedRanking]);

  return {
    guides,
    locations,
    guidePackages,
    guidesWithPackages,
    filteredGuides
  };
};
