
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Calendar, Ticket, Users } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Define validation schema for event submission
export const eventFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  location: z.string().min(3, { message: 'Location is required' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number' }),
  date: z.string().min(1, { message: 'Date is required' }),
  capacity: z.coerce.number().min(1, { message: 'Capacity must be at least 1' }).optional(),
  imageUrls: z.array(z.string()).optional(),
  formType: z.enum(['travel', 'events', 'services']),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
export type FormType = 'travel' | 'events' | 'services';

interface EventFormFieldsProps {
  form: UseFormReturn<EventFormValues>;
  formType: FormType;
}

const EventFormFields = ({ form, formType }: EventFormFieldsProps) => {
  const getTitlePlaceholder = () => {
    switch (formType) {
      case 'travel':
        return "Summer Europe Trip 2025";
      case 'events':
        return "Beach Party Festival 2025";
      case 'services':
        return "City Tour Guide Service";
      default:
        return "Enter a title";
    }
  };

  const getDescriptionPlaceholder = () => {
    switch (formType) {
      case 'travel':
        return "Describe your travel package in detail...";
      case 'events':
        return "Describe your event, performers, activities, etc...";
      case 'services':
        return "Describe the services you're offering...";
      default:
        return "Enter a description";
    }
  };

  const getFormTypeName = () => {
    switch (formType) {
      case 'travel':
        return "travel destination";
      case 'events':
        return "event";
      case 'services':
        return "service";
      default:
        return "listing";
    }
  };

  return (
    <>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input className="pl-10" placeholder="City, Country" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input 
                    type="date" 
                    className="pl-10" 
                    min={new Date().toISOString().split('T')[0]}
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (in credits)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input 
                    type="number" 
                    min="0" 
                    step="1"
                    className="pl-10" 
                    placeholder="45" 
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormDescription>
                Set a fair price for your {formType === 'travel' ? 'package' : formType === 'events' ? 'event' : 'service'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity (optional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input 
                    type="number" 
                    min="1" 
                    step="1"
                    className="pl-10" 
                    placeholder="100" 
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormDescription>
                Maximum number of attendees
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default EventFormFields;
export { eventFormSchema };
