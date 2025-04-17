
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { FormType } from './FormTypeSelector';
import TitleField from './fields/TitleField';
import DescriptionField from './fields/DescriptionField';
import LocationField from './fields/LocationField';
import PlanningCheckbox from './fields/PlanningCheckbox';
import DateFields from './fields/DateFields';
import PriceCapacityFields from './fields/PriceCapacityFields';

// Define validation schema for event submission
export const eventFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  location: z.string().min(3, { message: 'Location is required' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number' }),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().optional(),
  isOpenForPlanning: z.boolean().default(false),
  capacity: z.coerce.number().min(1, { message: 'Capacity must be at least 1' }).optional(),
  imageUrls: z.array(z.string()).optional(),
  formType: z.enum(['travel', 'clubs', 'events', 'services', 'tours', 'rental']),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventFormFieldsProps {
  form: UseFormReturn<EventFormValues>;
  formType: FormType;
}

const EventFormFields = ({ form, formType }: EventFormFieldsProps) => {
  const isOpenForPlanning = form.watch('isOpenForPlanning');

  return (
    <>
      <TitleField form={form} formType={formType} />
      <DescriptionField form={form} formType={formType} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LocationField form={form} />
        <div className="space-y-4">
          <PlanningCheckbox form={form} formType={formType} />
          <DateFields form={form} isOpenForPlanning={isOpenForPlanning} />
        </div>
      </div>
      
      <PriceCapacityFields form={form} formType={formType} />
    </>
  );
};

export default EventFormFields;
