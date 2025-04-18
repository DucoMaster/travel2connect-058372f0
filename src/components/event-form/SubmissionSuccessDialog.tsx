
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SubmissionSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitAnother: () => void;
}

const SubmissionSuccessDialog = ({
  isOpen,
  onClose,
  onSubmitAnother,
}: SubmissionSuccessDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Event Submitted Successfully</DialogTitle>
        </DialogHeader>
        <div className="text-center py-4">
          <p className="mb-4">
            All submitted events will be reviewed within 24 hours before being published.
            Thank you for your Event!
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => navigate("/")}>
            Go Back Home
          </Button>
          <Button onClick={onSubmitAnother}>
            Submit Another Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionSuccessDialog;
