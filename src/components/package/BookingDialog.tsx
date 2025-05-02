import React, { useState } from "react";
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

import DateSelectionDialog from "./DateSelectionDialog";

interface BookingDialogProps {
  pkg: EventPackageDetails;
  open: boolean;
  userCredits: number;
  isProcessing: boolean;
  formatDate: (date: Date) => string;
  onOpenChange: (open: boolean) => void;
  // onConfirm: () => void;
  onConfirm: (bookingDates: string[]) => void;
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
  const [bookingDates, setBookingDates] = useState<Date[]>([]);
  const [showDateDialog, setShowDateDialog] = useState(false);

  return (
    <>
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
                    new Date(pkg?.start_date || ""),
                    new Date(pkg?.end_date || "")
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
              <div className="flex justify-end text-sm">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowDateDialog(true)}
                >
                  Choose Dates
                </Button>
              </div>
              {bookingDates.length > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Selected Dates</span>
                  <span className="font-medium">
                    {bookingDates.length > 0
                      ? Object.entries(
                          bookingDates
                            .sort((a, b) => a.getTime() - b.getTime())
                            .reduce((acc, date) => {
                              const monthYear = date.toLocaleString("default", {
                                month: "long",
                                year: "numeric",
                              });
                              const day = date.getDate();
                              if (!acc[monthYear]) acc[monthYear] = [];
                              acc[monthYear].push(day);
                              return acc;
                            }, {} as Record<string, number[]>)
                        )
                          .map(
                            ([monthYear, days]) =>
                              `${days.join(", ")} ${monthYear}`
                          )
                          .join(", ")
                      : "No dates selected"}
                  </span>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="bg-travel-500 hover:bg-travel-600"
              disabled={
                isProcessing ||
                userCredits < pkg?.price ||
                bookingDates.length === 0
              }
              // onClick={onConfirm}
              onClick={() =>
                onConfirm(bookingDates.map((d) => d.toISOString()))
              }
            >
              {isProcessing ? "Processing..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DateSelectionDialog
        open={showDateDialog}
        selectedDates={bookingDates}
        onClose={() => setShowDateDialog(false)}
        onDateChange={setBookingDates}
        onConfirm={(dates) => {
          setBookingDates(dates);
          setShowDateDialog(false);
        }}
        startDate={pkg?.start_date ? new Date(pkg.start_date) : new Date()}
        endDate={pkg?.end_date ? new Date(pkg.end_date) : new Date()}
      />
    </>
  );
};

export default BookingDialog;
