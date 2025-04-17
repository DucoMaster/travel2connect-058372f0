
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Calendar, Ticket, Users } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';

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
  formType: z.enum(['travel', 'events', 'services']),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
export type FormType = 'travel' | 'events' | 'services';

interface EventFormFieldsProps {
  form: UseFormReturn<EventFormValues>;
  formType: FormType;
}

const EventFormFields = ({ form, formType }: EventFormFieldsProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const isOpenForPlanning = form.watch('isOpenForPlanning');

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

  // Handle date changes
  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (date) {
      form.setValue('startDate', date.toISOString());
      // If end date is before start date, reset it
      if (endDate && date > endDate) {
        setEndDate(undefined);
        form.setValue('endDate', '');
      }
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    if (date) {
      form.setValue('endDate', date.toISOString());
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
        
        <div className="space-y-4">
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
          
          {!isOpenForPlanning && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            {startDate ? (
                              format(startDate, "PPP")
                            ) : (
                              <span>Pick a start date</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={startDate}
                          onSelect={handleStartDateChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                            disabled={!startDate}
                          >
                            {endDate ? (
                              format(endDate, "PPP")
                            ) : (
                              <span>Pick an end date</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={endDate}
                          onSelect={handleEndDateChange}
                          disabled={(date) => !startDate || date < startDate}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
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
