
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { EVENT_SUBMISSION_COST } from './hooks/useEventSubmission';

interface EventFormActionsProps {
  isSubmitting: boolean;
  userCredits?: number;
  formType: string;
  isUserProfileComplete: boolean;
}

const EventFormActions = ({ isSubmitting, userCredits = 0, formType,isUserProfileComplete }: EventFormActionsProps) => {
  const hasEnoughCredits = userCredits >= EVENT_SUBMISSION_COST;
  
  return (
    <div className="pt-4">
      <Button 
        type="submit" 
        className="w-full bg-travel-500 hover:bg-travel-600"
        disabled={isSubmitting || !hasEnoughCredits || !isUserProfileComplete}
      >
        {isSubmitting ? (
          <>
            <Upload className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          `Submit ${formType.charAt(0).toUpperCase() + formType.slice(1)} Package`
        )}
      </Button>
      
      <div className="text-sm text-gray-500 mt-2 text-center">
        Submitting an event costs {EVENT_SUBMISSION_COST} credits. You currently have {userCredits} credits.
      </div>
      
      <div className="text-sm text-gray-500 mt-2 text-center">
        Review Process: All submitted events will be reviewed within 24 hours before being published.
      </div>
    </div>
  );
};

export default EventFormActions;
