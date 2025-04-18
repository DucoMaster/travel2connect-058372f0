
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Home, MapPin, Plus, Users } from "lucide-react";

interface PreviewEventData {
  title?: string;
  description?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  capacity?: number;
  imageUrls?: string[];
}

interface SubmissionSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitAnother: () => void;
  eventData?: PreviewEventData;
}

const SubmissionSuccessDialog = ({
  isOpen,
  onClose,
  onSubmitAnother,
  eventData,
}: SubmissionSuccessDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Event Submitted Successfully</DialogTitle>
        </DialogHeader>
        
        {eventData && (
          <div className="bg-muted/50 rounded-lg p-4 my-4">
            <h3 className="font-semibold text-lg mb-2">{eventData.title}</h3>
            
            {eventData.imageUrls?.[0] && (
              <div className="aspect-video w-full mb-4 overflow-hidden rounded-md">
                <img 
                  src={eventData.imageUrls[0]} 
                  alt={eventData.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="space-y-2 text-sm">
              <p className="line-clamp-2 text-muted-foreground">
                {eventData.description}
              </p>
              
              {eventData.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{eventData.location}</span>
                </div>
              )}
              
              {eventData.startDate && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>
                    {new Date(eventData.startDate).toLocaleDateString()}
                    {eventData.endDate && eventData.endDate !== eventData.startDate && 
                      ` - ${new Date(eventData.endDate).toLocaleDateString()}`
                    }
                  </span>
                </div>
              )}
              
              {eventData.capacity && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Max capacity: {eventData.capacity} people</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-center text-muted-foreground">
          <p>All submitted events will be reviewed within 24 hours before being published.</p>
          <p className="mt-1">Thank you for your submission!</p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="w-full sm:w-auto"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <Button 
            onClick={onSubmitAnother}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Submit Another Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionSuccessDialog;
