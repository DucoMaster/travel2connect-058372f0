import React from "react";
import { Package } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateRange } from "@/utils/PackageUtils";
import { EventPackageDetails } from "@/types/event-packages";

interface GuideApplyDialogProps {
  pkg: EventPackageDetails;
  open: boolean;
  userCredits: number;
  isProcessing: boolean;
  formatDate: (date: Date) => string;
  onOpenChange: (open: boolean) => void;
  // onConfirm: () => void;
  onConfirm: (bookingDates: string[]) => void;
}

const GuideApplyDialog = ({
  pkg,
  open,
  userCredits,
  isProcessing,
  formatDate,
  onOpenChange,
  onConfirm,
}: GuideApplyDialogProps) => {
  const applicationCost = pkg?.price || 0; // Fixed application cost

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply to Guide</DialogTitle>
          <DialogDescription>
            You're applying to guide for {pkg?.title}. This will cost 10
            credits.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Experience</span>
              <span className="font-medium">{pkg?.title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">
                {formatDateRange(
                  new Date(pkg?.start_date || ""),
                  new Date(pkg?.end_date || "")
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Application cost</span>
              <span className="font-medium">{applicationCost} credits</span>
            </div>
            <div className="flex justify-between text-sm border-t pt-2 mt-2">
              <span className="text-gray-600">Your current balance</span>
              <span className="font-medium">{userCredits || 0} credits</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Balance after applying</span>
              <span className="font-medium">
                {(userCredits || 0) - applicationCost} credits
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-coral-500 hover:bg-coral-600"
            disabled={isProcessing || userCredits < applicationCost}
            // onClick={onConfirm}
          >
            {isProcessing ? "Processing..." : "Submit Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GuideApplyDialog;
