import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockPackages } from "@/data";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import PackageHeader from "@/components/package/PackageHeader";
import PackageDescription from "@/components/package/PackageDescription";
import CheckInSection from "@/components/package/CheckInSection";
import BookingSection from "@/components/package/BookingSection";
import BookingDialog from "@/components/package/BookingDialog";
import GuideApplyDialog from "@/components/package/GuideApplyDialog";
import QRCodeDialog from "@/components/package/QRCodeDialog";
import PackageNotFound from "@/components/package/PackageNotFound";
import PackageOwnerStats from "@/components/package/PackageOwnerStats";
import PackageOwnerActions from "@/components/package/PackageOwnerActions";
import { formatDate } from "@/utils/PackageUtils";
import {
  useEventPackageById,
  useVisitorsByPackage,
} from "@/actions/package-queries";
import { Spinner } from "@/components/spinner";
import { supabase } from "@/integrations/supabase/client";
import { UserRoundIcon } from "lucide-react";

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, setUser } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: packageVisitors, isLoading: isPackageVisitorLoading } =
    useVisitorsByPackage(id);
  const [packages, setPackages] = useState(mockPackages);
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [showQRCodeDialog, setShowQRCodeDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // const pkg = packages.find((p) => p.id === id);
  const { data: pkg, isLoading, error } = useEventPackageById(id);
  const isOwner = user && user?.id === pkg?.creator_id;

  const handleApply = async () => {
    if (!user || !pkg?.id) return;

    setIsProcessing(true);

    try {
      // 1. Check if the booking already exists
      const { data: existingBooking, error: bookingCheckError } = await supabase
        .from("event_package_booking")
        .select("id")
        .eq("user_id", user.id)
        .eq("event_package_id", pkg.id)
        .single();

      if (existingBooking) {
        throw new Error(`You've already applied to guide for ${pkg.title}.`);
      }

      // 2. Check if the user has enough credits
      if (user.credits >= pkg.price) {
        // Update the user's credits
        const { error: creditError } = await supabase
          .from("profiles")
          .update({ credits: user.credits - pkg.price })
          .eq("id", user.id);

        if (creditError) throw new Error(creditError.message);

        // 3. Create a booking in event_package_booking
        const { error: bookingError } = await supabase
          .from("event_package_booking")
          .insert({
            user_id: user.id,
            event_package_id: pkg.id,
          });

        if (bookingError) throw new Error(bookingError.message);

        // Update the user state after booking
        const updatedUser = {
          ...user,
          credits: user.credits - pkg.price,
        };
        setUser(updatedUser);
        localStorage.setItem("traveler-user", JSON.stringify(updatedUser));

        // Show success notification
        toast({
          title: "Application Submitted",
          description: `You've applied to guide for ${pkg.title}.`,
        });

        setShowApplyDialog(false);
        navigate("/");
      } else {
        toast({
          title: "Application Failed",
          description: `You don't have enough credits to apply (${pkg.price} credits required).`,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err.message || "Unable to apply for this package.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  const handleDeletePackageBooking = async (packageId: string) => {
    try {
      // 1. Delete bookings related to the package
      const { error: bookingError } = await supabase
        .from("event_package_booking")
        .delete()
        .eq("event_package_id", packageId);

      if (bookingError) {
        throw new Error(bookingError.message);
      }
      const updatedPackages = packages.filter((p) => p.id !== packageId);
      setPackages(updatedPackages);
      toast({
        title: "Cancelled Booking",
        description: `You've cancelled the booking for ${pkg.title}.`,
      });
    } catch (err: any) {
      toast({
        title: "Deletion Failed",
        description: err.message || "Failed to delete package or its bookings.",
        variant: "destructive",
      });
    }
  };
  const handleDeletePackage = async (packageId: string) => {
    try {
      const { error: packageError } = await supabase
        .from("event_packages")
        .delete()
        .eq("id", packageId);

      if (packageError) {
        throw new Error(packageError.message);
      }
      const updatedPackages = packages.filter((p) => p.id !== packageId);
      setPackages(updatedPackages);
      toast({
        title: "Package Deleted",
        description: "The package and its bookings were successfully deleted.",
      });
    } catch (err: any) {
      // Error Toast
      toast({
        title: "Deletion Failed",
        description:
          err.message || "Failed to delete the package and its bookings.",
        variant: "destructive",
      });
    }
  };
  const addEventPackageVisitor = async (userId: string, packageId: string) => {
    try {
      // Check if already exists
      const { data: existing, error: checkError } = await supabase
        .from("event_package_visitors")
        .select("id")
        .eq("user_id", userId)
        .eq("event_package_id", packageId)
        .maybeSingle();

      if (checkError) throw checkError;

      // Only insert if not already exists
      if (!existing) {
        const { error: insertError } = await supabase
          .from("event_package_visitors")
          .insert({ user_id: userId, event_package_id: packageId });

        if (insertError) throw insertError;
      }

      return { success: true };
    } catch (error) {
      console.error("Failed to add visitor:", error);
      return { success: false, error };
    }
  };
  useEffect(() => {
    if (user && id) {
      addEventPackageVisitor(user?.id, id);
    }
  }, [user, id]);
  if (isLoading || isPackageVisitorLoading) {
    <div className="flex items-center justify-center h-screen w-full">
      <Spinner />
    </div>;
  }
  if (error) {
    return <PackageNotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <PackageHeader pkg={pkg} />

          <div className="p-6 bg-white rounded-b-xl shadow-sm">
            {isOwner && (
              <PackageOwnerActions pkg={pkg} onDelete={handleDeletePackage} />
            )}

            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex-1">
                <PackageDescription pkg={pkg} formatDate={formatDate} />

                {isOwner && <PackageOwnerStats pkg={pkg} />}

                <CheckInSection
                  pkg={pkg}
                  user={user}
                  onShowQRCode={() => setShowQRCodeDialog(true)}
                />
              </div>

              {!isOwner && (
                <BookingSection
                  pkg={pkg}
                  user={user}
                  onBookNow={() => setShowBookDialog(true)}
                  onApplyToGuide={() => setShowApplyDialog(true)}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <BookingDialog
        pkg={pkg}
        open={showBookDialog}
        userCredits={user?.credits || 0}
        isProcessing={isProcessing}
        formatDate={formatDate}
        onOpenChange={setShowBookDialog}
        onConfirm={handleApply}
      />

      <GuideApplyDialog
        pkg={pkg}
        open={showApplyDialog}
        userCredits={user?.credits || 0}
        isProcessing={isProcessing}
        formatDate={formatDate}
        onOpenChange={setShowApplyDialog}
        onConfirm={handleApply}
      />

      <QRCodeDialog
        pkg={pkg}
        user={user}
        open={showQRCodeDialog}
        onOpenChange={setShowQRCodeDialog}
      />
    </div>
  );
};

export default PackageDetail;
