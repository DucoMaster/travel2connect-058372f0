
import { CreditCard } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CreditRequirementAlertProps {
  cost: number;
  userCredits: number;
}

const CreditRequirementAlert = ({ cost, userCredits }: CreditRequirementAlertProps) => {
  return (
    <Alert className="mb-6">
      <CreditCard className="h-4 w-4" />
      <AlertDescription>
        Submitting an event costs <strong>{cost} credits</strong>. You currently have{" "}
        <strong>{userCredits} credits</strong>.
      </AlertDescription>
    </Alert>
  );
};

export default CreditRequirementAlert;
