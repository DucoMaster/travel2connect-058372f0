
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Ticket, Users, Coins } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from '../EventFormFields';
import { FormType } from '../FormTypeSelector';
import CurrencySelector, { Currency } from './CurrencySelector';
import { useState } from 'react';

interface PriceCapacityFieldsProps {
  form: UseFormReturn<EventFormValues>;
  formType: FormType;
}

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0
};

const PriceCapacityFields = ({ form, formType }: PriceCapacityFieldsProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');
  const [currencyPrice, setCurrencyPrice] = useState<string>('');

  const handleCurrencyPriceChange = (value: string) => {
    setCurrencyPrice(value);
    const numericValue = parseFloat(value) || 0;
    // Convert currency price to credits (1:1 with USD)
    const creditsValue = (numericValue / EXCHANGE_RATES[selectedCurrency]).toFixed(2);
    form.setValue('price', parseFloat(creditsValue));
  };

  const handleCreditsChange = (value: string) => {
    const numericValue = parseFloat(value) || 0;
    form.setValue('price', numericValue);
    // Convert credits to selected currency
    const currencyValue = (numericValue * EXCHANGE_RATES[selectedCurrency]).toFixed(2);
    setCurrencyPrice(currencyValue);
  };

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
            <FormLabel>Price in Credits</FormLabel>
            <FormControl>
              <div className="relative">
                <Coins className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  type="number" 
                  min="0" 
                  step="0.01"
                  className="pl-10" 
                  placeholder="45" 
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    handleCreditsChange(e.target.value);
                  }}
                />
              </div>
            </FormControl>
            <FormDescription>
              Set the price in credits for your {getFormTypeName()}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormItem>
        <FormLabel>Price in Currency</FormLabel>
        <FormControl>
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                type="number" 
                min="0" 
                step="0.01"
                className="pl-10" 
                placeholder="45" 
                value={currencyPrice}
                onChange={(e) => handleCurrencyPriceChange(e.target.value)}
              />
            </div>
            <CurrencySelector 
              value={selectedCurrency}
              onChange={(currency) => {
                setSelectedCurrency(currency);
                // Recalculate currency price when currency changes
                const creditsValue = form.getValues('price');
                const newCurrencyValue = (creditsValue * EXCHANGE_RATES[currency]).toFixed(2);
                setCurrencyPrice(newCurrencyValue);
              }}
            />
          </div>
        </FormControl>
        <FormDescription>
          Price in {selectedCurrency}
        </FormDescription>
      </FormItem>
      
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
