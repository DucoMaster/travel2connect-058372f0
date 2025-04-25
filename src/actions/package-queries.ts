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