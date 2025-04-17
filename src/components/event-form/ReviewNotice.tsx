
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Clock } from 'lucide-react';

const ReviewNotice = () => {
  return (
    <Alert className="mb-6">
      <Clock className="h-4 w-4" />
      <AlertTitle>Review Process</AlertTitle>
      <AlertDescription>
        All submitted events will be reviewed within 24 hours before being published.
      </AlertDescription>
    </Alert>
  );
};

export default ReviewNotice;
