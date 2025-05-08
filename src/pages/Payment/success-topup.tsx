import { Spinner } from "@/components/spinner";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { EMAIL_SERVER_URL } from "@/utils/constants";
import { useEventPackageById } from "@/actions/package-queries";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SuccessEventPayment = () => {
  const query = useQuery();
  const { user, setUser } = useUser();
  const { toast } = useToast();
  const session_id = query.get("session_id");
  const credits = query.get("credits");
  const user_id = query.get("user_id");
  const pkgId = query.get("pkgId");
  const booking_dates = query.get("booking_dates");
  const {
    data: pkg,
    isLoading: isPackageLoading,
    error,
  } = useEventPackageById(pkgId);
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      !user_id ||
      !credits ||
      !session_id ||
      !pkgId ||
      !booking_dates ||
      !pkg
    ) {
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
        const formattedDates = JSON.parse(booking_dates);
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

        // 3. Create a booking in event_package_booking
        const { error: bookingError } = await supabase
          .from("event_package_booking")
          .insert({
            user_id: user.id,
            event_package_id: pkgId,
            booking_dates: formattedDates,
          });

        if (bookingError) throw new Error(bookingError.message);
        toast({
          title: "Application Submitted",
          description: `You've applied to guide for ${pkg.title}.`,
        });
        await fetch(`${EMAIL_SERVER_URL}/api/email/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: pkg.title,
            start: pkg.start_date,
            end: pkg.end_date,
            booking_dates: formattedDates,
          }),
        });
        history("/");
      } catch (error) {
        console.error("Error updating payment data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    updatePaymentData();
  }, [user_id, credits, session_id, pkgId, booking_dates, pkg, history]);
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Spinner />
    </div>
  );
};

export default SuccessEventPayment;
