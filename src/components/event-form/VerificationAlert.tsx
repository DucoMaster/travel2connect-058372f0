
import { QrCode } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const VerificationAlert = () => {
  return (
    <Alert className="mb-6 bg-travel-50 text-travel-800 border-travel-200">
      <QrCode className="h-4 w-4" />
      <AlertDescription>
        Each event will have a unique QR code that attendees can scan to verify their attendance. 
        This helps track meetups and proves the event took place.
      </AlertDescription>
    </Alert>
  );
};

export default VerificationAlert;
