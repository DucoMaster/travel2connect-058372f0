import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TabType } from '@/types';
import { EventPackageDetails } from '@/types/event-packages';

export const useFilteredPackages = (
    searchTerm: string,
    activeTab: TabType,
    fromDate?: Date,
    toDate?: Date
) => {
    return useQuery({
        queryKey: ['filtered-packages', searchTerm, activeTab, fromDate?.toISOString(), toDate?.toISOString()],
        queryFn: async () => {
            let query = supabase
                .from('event_packages')
                .select('*')
                .ilike('title', `%${searchTerm}%`)
                .or(`location.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
                .eq('category', activeTab);

            if (fromDate) {
                query = query.gte('start_date', fromDate.toISOString());
            }

            if (toDate) {
                query = query.lte('end_date', toDate.toISOString());
            }

            const { data, error } = await query;

            if (error) throw new Error(error.message);
            return data as EventPackageDetails[];
        },
        enabled: !!activeTab,
    });
};

export function usePackagesByGuideId(guideId: string) {
    return useQuery({
        queryKey: ['packages-by-guide', guideId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('event_packages')
                .select('*')
                .eq('creator_id', guideId);

            if (error) throw new Error('Error fetching packages for this guide');
            return data as EventPackageDetails[];
        },
        enabled: !!guideId,
    });
}
export function useEventPackageById(id: string | undefined) {
    return useQuery({
        queryKey: ['event-package', id],
        enabled: !!id,
        queryFn: async () => {
            const { data, error } = await supabase
                .from('event_packages')
                .select('*')
                .eq('id', id)
                .single(); // since we're fetching a single package

            if (error) throw new Error('Error fetching package');
            return data as EventPackageDetails;
        },
    });
}
export const useVisitorsByPackage = (packageId: string | undefined) => {
    return useQuery({
        queryKey: ['visitors', packageId],
        queryFn: async () => {
            if (!packageId) throw new Error('No package ID provided');
            const { data, error } = await supabase
                .from('event_package_visitors')
                .select(`
          id,
          created_at,
          user_id,
          user:profiles (
            id,
            name,
            profile_image
          )
        `)
                .eq('event_package_id', packageId);

            if (error) throw new Error(error.message);
            return data;
        },
        enabled: !!packageId,
        staleTime: 1000 * 60 * 5,
    });
};
export const useIsPackageBooked = (packageId: string) => {
    return useQuery(
        {
            queryKey: ['package-booked', packageId],
            queryFn: async () => {
                const { data, error } = await supabase
                    .from('event_package_booking')
                    .select('id')
                    .eq('event_package_id', packageId)
                    .single();
                if (error) throw new Error(error.message);
                return !!data;
            },
            enabled: !!packageId,
            staleTime: 1000 * 60 * 5,
        }
    );
};