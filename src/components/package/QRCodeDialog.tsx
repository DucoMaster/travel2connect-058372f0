import React from "react";
import { Package, User } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QRCodeDisplay from "@/components/event/QRCodeDisplay";
import { EventPackageDetails } from "@/types/event-packages";

interface QRCodeDialogProps {
  pkg: EventPackageDetails;
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QRCodeDialog = ({ pkg, user, open, onOpenChange }: QRCodeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Event Check-In Code</DialogTitle>
          <DialogDescription>
            Present this QR code at the event to verify your attendance
          </DialogDescription>
        </DialogHeader>

        {pkg && (
          <QRCodeDisplay
            eventId={pkg.id}
            eventTitle={pkg.title}
            attendeeId={user?.id}
          />
        )}

        <DialogFooter className="mt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
