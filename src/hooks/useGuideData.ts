import { useMemo } from 'react';
import {
  useEventPackagesByGuides,
  useGuidePackages,
  useGuides
} from '@/actions/guide-quries';

export const useGuideData = (
  searchTerm: string,
  selectedLocation: string,
  selectedRanking: string
) => {
  // Fetch all guides
  const {
    data: guides,
    isLoading: isGuidesLoading,
    isError: isGuidesError,
    error: guidesError,
  } = useGuides();

  // Fetch all guide packages
  const {
    data: guidePackages,
    isLoading: isGuidePackagesLoading,
    isError: isGuidePackagesError,
    error: guidePackagesError,
  } = useGuidePackages();

  // Fetch event packages by guide IDs (only if guides are available)
  const {
    data: eventPackagesMap = {},
    isLoading: isEventPackagesLoading,
    isError: isEventPackagesError,
    error: eventPackagesError,
  } = useEventPackagesByGuides(guides?.map((guide: any) => guide.id) || []);

  const isLoading = isGuidesLoading || isGuidePackagesLoading || isEventPackagesLoading;
  const isError = isGuidesError || isGuidePackagesError || isEventPackagesError;

  const error =
    guidesError?.message ||
    guidePackagesError?.message ||
    eventPackagesError?.message ||
    null;

  // 🔽 Get unique locations
  const locations: string[] = useMemo(() => {
    if (!guides) return [];
    const uniqueLocations = new Set(guides.map(g => g.location).filter(Boolean));
    return Array.from(uniqueLocations).sort();
  }, [guides]);

  // 🔽 Attach packages and event packages to each guide
  const guidesWithPackages = useMemo(() => {
    if (!guides) return [];
    return guides.map((guide) => {
      const packages = guidePackages?.filter((pkg) => pkg?.creator_id === guide.id) || [];
      const eventPackages = eventPackagesMap[guide.id] || [];
      return { ...guide, packages, eventPackages };
    });
  }, [guides, guidePackages, eventPackagesMap]);

  // 🔽 Apply filtering
  const filteredGuides = useMemo(() => {
    return guidesWithPackages?.filter((guide) => {
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
    isLoading,
    isError,
    error,
    guides,
    locations,
    guidePackages,
    guidesWithPackages,
    filteredGuides
  };
};
