import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// This will fetch all user payments for a specific user
export function useUserPayments(userId: string | undefined) {
    return useQuery({
        queryKey: ["user-payments", userId],
        queryFn: async () => {
            if (!userId) throw new Error("User ID is required");

            const { data, error } = await supabase
                .from("user_payments")
                .select("*")
                .eq("user_id", userId)
                .order("created_at", { ascending: false }); // newest first

            if (error) {
                throw new Error(error.message);
            }

            return data; // returns array of user payments
        },
        enabled: !!userId, // only run if userId exists
    });
}
