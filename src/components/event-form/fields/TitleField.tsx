
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from '../EventFormFields';
import { FormType } from '../FormTypeSelector';

interface TitleFieldProps {
  form: UseFormReturn<EventFormValues>;
  formType: FormType;
}

const TitleField = ({ form, formType }: TitleFieldProps) => {
  const getTitlePlaceholder = () => {
    switch (formType) {
      case 'travel':
        return "Summer Europe Trip 2025";
      case 'clubs':
        return "Nightclub VIP Section Booking";
      case 'events':
        return "Beach Party Festival 2025";
      case 'services':
        return "City Tour Guide Service";
      case 'tours':
        return "Historic City Walking Tour";
      case 'rental':
        return "Luxury Beach Villa";
      default:
        return "Enter a title";
    }
  };

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Event Title</FormLabel>
          <FormControl>
            <Input placeholder={getTitlePlaceholder()} {...field} />
          </FormControl>
          <FormDescription>
            Choose a clear, descriptive title
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TitleField;
