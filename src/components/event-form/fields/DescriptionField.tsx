
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from '../EventFormFields';
import { FormType } from '../FormTypeSelector';

interface DescriptionFieldProps {
  form: UseFormReturn<EventFormValues>;
  formType: FormType;
}

const DescriptionField = ({ form, formType }: DescriptionFieldProps) => {
  const getDescriptionPlaceholder = () => {
    switch (formType) {
      case 'travel':
        return "Describe your travel package in detail...";
      case 'clubs':
        return "Describe the club event, bottle service, VIP perks, etc...";
      case 'events':
        return "Describe your event, performers, activities, etc...";
      case 'services':
        return "Describe the services you're offering...";
      case 'tours':
        return "Describe the tour route, stops, and highlights...";
      case 'rental':
        return "Describe the property, amenities, and features...";
      default:
        return "Enter a description";
    }
  };

  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea 
              placeholder={getDescriptionPlaceholder()} 
              className="min-h-[120px]" 
              {...field} 
            />
          </FormControl>
          <FormDescription>
            Include important details like activities, special guests, etc.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DescriptionField;
