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
