import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types';
import { EventPackageDetails } from '@/types/event-packages';

export function useGuides() {
    return useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('role', 'guide');
            if (error) throw new Error('Error fetching guides');
            return data as User[];
        },
    });
}
export function useGuideById(id: string) {
    return useQuery({
        queryKey: ['guide', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', id)
                .eq('role', 'guide')
                .single();

            if (error) throw new Error('Guide not found');
            return data as User;
        },
        enabled: !!id,
    });
}
export function useGuidePackages() {
    return useQuery({
        queryKey: ['guide-packages'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('event_packages')
                .select('*')
                .eq('category', 'guide');
            if (error) throw new Error('Error fetching guide packages');
            return data as EventPackageDetails[];
        },
    });
}

export function useEventPackagesByGuides(guideIds: string[]) {
    return useQuery({
        queryKey: ['event-packages-by-guides', guideIds],
        queryFn: async () => {
            if (!guideIds.length) return {};
            const { data, error } = await supabase
                .from('event_packages')
                .select('*')
                .in('creator_id', guideIds);
            if (error) throw new Error('Error fetching event packages');

            const map: Record<string, any[]> = {};
            data.forEach(pkg => {
                if (!map[pkg.creator_id]) map[pkg.creator_id] = [];
                map[pkg.creator_id].push(pkg);
            });

            return map;
        },
        enabled: !!guideIds.length,
    });
}