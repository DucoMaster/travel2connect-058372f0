
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from '../EventFormFields';
import { FormType } from '../FormTypeSelector';

interface PlanningCheckboxProps {
  form: UseFormReturn<EventFormValues>;
  formType: FormType;
}

const PlanningCheckbox = ({ form, formType }: PlanningCheckboxProps) => {
  const getFormTypeName = () => {
    switch (formType) {
      case 'travel':
        return "travel destination";
      case 'clubs':
        return "club event";
      case 'events':
        return "event";
      case 'services':
        return "service";
      case 'tours':
        return "tour";
      case 'rental':
        return "rental";
      default:
        return "listing";
    }
  };

  return (
    <FormField
      control={form.control}
      name="isOpenForPlanning"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Open for planning</FormLabel>
            <FormDescription>
              Mark this {getFormTypeName()} as open for planning without fixed dates
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};

export default PlanningCheckbox;
