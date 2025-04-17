
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Ticket, Users } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from '../EventFormFields';
import { FormType } from '../FormTypeSelector';
import CurrencySelector, { Currency } from './CurrencySelector';
import { useState } from 'react';

interface PriceCapacityFieldsProps {
  form: UseFormReturn<EventFormValues>;
  formType: FormType;
}

const PriceCapacityFields = ({ form, formType }: PriceCapacityFieldsProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('credits');

  const getFormTypeName = () => {
    switch (formType) {
      case 'travel':
        return 'package';
      case 'events':
        return 'event';
      case 'tours':
        return 'tour';
      case 'rental':
        return 'rental';
      default:
        return 'service';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <div className="relative flex gap-2">
                <div className="relative flex-1">
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
                <CurrencySelector 
                  value={selectedCurrency}
                  onChange={setSelectedCurrency}
                />
              </div>
            </FormControl>
            <FormDescription>
              Set a fair price for your {getFormTypeName()} in {selectedCurrency}
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
  );
};

export default PriceCapacityFields;
