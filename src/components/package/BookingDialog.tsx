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

interface BookingDialogProps {
  pkg: EventPackageDetails;
  open: boolean;
  userCredits: number;
  isProcessing: boolean;
  formatDate: (date: Date) => string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const BookingDialog = ({
  pkg,
  open,
  userCredits,
  isProcessing,
  formatDate,
  onOpenChange,
  onConfirm,
}: BookingDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Your Booking</DialogTitle>
          <DialogDescription>
            You're about to book {pkg?.title} for {pkg?.price} credits.
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
                  new Date(pkg?.start_date),
                  new Date(pkg?.end_date)
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Price</span>
              <span className="font-medium">{pkg?.price} credits</span>
            </div>
            <div className="flex justify-between text-sm border-t pt-2 mt-2">
              <span className="text-gray-600">Your current balance</span>
              <span className="font-medium">{userCredits || 0} credits</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Balance after booking</span>
              <span className="font-medium">
                {(userCredits || 0) - pkg?.price} credits
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-travel-500 hover:bg-travel-600"
            disabled={isProcessing || userCredits < pkg?.price}
            onClick={onConfirm}
          >
            {isProcessing ? "Processing..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
