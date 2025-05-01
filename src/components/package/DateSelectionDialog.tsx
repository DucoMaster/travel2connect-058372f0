import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DateSelectionDialogProps {
  open: boolean;
  selectedDates: Date[];
  onClose: () => void;
  onConfirm: (selectedDates: Date[]) => void;
  onDateChange: (dates: Date[]) => void;
  startDate: Date;
  endDate: Date;
}
const stripTime = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const DateSelectionDialog = ({
  open,
  selectedDates,
  onClose,
  onConfirm,
  onDateChange,
  startDate,
  endDate,
}: DateSelectionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Booking Dates</DialogTitle>
          <DialogDescription>
            Pick one or more dates before confirming your booking.
          </DialogDescription>
        </DialogHeader>
        <div className=" w-full flex flex-col items-center justify-center py-4">
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={(dates) => onDateChange(dates)}
            disabled={(date) => {
              const current = stripTime(date);
              const start = stripTime(startDate);
              const end = stripTime(endDate);

              return current < start || current > end;
            }}
            initialFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={selectedDates.length === 0}
            className="bg-travel-500 hover:bg-travel-600"
            onClick={() => {
              onConfirm(selectedDates);
              onClose();
            }}
          >
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DateSelectionDialog;
