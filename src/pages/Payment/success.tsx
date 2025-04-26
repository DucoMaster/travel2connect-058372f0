import { Spinner } from "@/components/spinner";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Success = () => {
  const query = useQuery();
  const session_id = query.get("session_id");
  const credits = query.get("credits");
  const user_id = query.get("user_id");
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user_id || !credits || !session_id) {
      console.error("Missing query parameters", {
        user_id,
        credits,
        session_id,
      });
      return;
    }

    const updatePaymentData = async () => {
      setIsLoading(true);

      try {
        // Insert payment record
        const { error: paymentError } = await supabase
          .from("user_payments")
          .insert([
            {
              payment_intent: session_id,
              user_id: user_id,
              credits: parseInt(credits, 10),
            },
          ]);

        if (paymentError) {
          throw new Error(paymentError.message);
        }

        // Fetch current user credits
        const { data: user, error: fetchError } = await supabase
          .from("profiles")
          .select("credits")
          .eq("id", user_id)
          .single();

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        const newCredits = (user?.credits || 0) + parseInt(credits, 10);

        // Update credits in database
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ credits: newCredits })
          .eq("id", user_id);

        if (updateError) {
          throw new Error(updateError.message);
        }

        // Update credits in localStorage if present
        const localProfile = localStorage.getItem("traveler-user");

        if (localProfile) {
          const parsedProfile = JSON.parse(localProfile);
          parsedProfile.credits = newCredits;
          localStorage.setItem("traveler-user", JSON.stringify(parsedProfile));
        }

        history("/");
      } catch (error) {
        console.error("Error updating payment data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    updatePaymentData();
  }, [user_id, credits, session_id, history]);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Spinner />
    </div>
  );
};

export default Success;
