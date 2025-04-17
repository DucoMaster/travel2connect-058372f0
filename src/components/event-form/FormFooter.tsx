
import { CardFooter } from '@/components/ui/card';

interface FormFooterProps {
  formType: 'travel' | 'events' | 'services';
}

const FormFooter = ({ formType }: FormFooterProps) => {
  const formTypeName = 
    formType === 'travel' 
      ? 'travel package' 
      : formType === 'events' 
        ? 'event' 
        : 'service';

  return (
    <CardFooter className="flex flex-col space-y-4 border-t pt-6">
      <p className="text-sm text-gray-500">
        By submitting this {formTypeName}, you agree to our terms and conditions. 
        All submissions are subject to review before being published within 24 hours.
      </p>
    </CardFooter>
  );
};

export default FormFooter;
