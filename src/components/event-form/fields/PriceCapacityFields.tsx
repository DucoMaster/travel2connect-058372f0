
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Users } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from '../EventFormFields';
import { FormType } from '../FormTypeSelector';
import CurrencySelector, { Currency } from './CurrencySelector';
import { useState, useEffect } from 'react';

interface PriceCapacityFieldsProps {
  form: UseFormReturn<EventFormValues>;
  formType: FormType;
}

// Gold price per gram in USD (this would come from an API in a real app)
const GOLD_PRICE = 74.8;
// Credits per gram of gold
const CREDITS_PER_GOLD = 100;
// Credits to USD conversion rate
const CREDIT_TO_USD = GOLD_PRICE / CREDITS_PER_GOLD;

const PriceCapacityFields = ({ form, formType }: PriceCapacityFieldsProps) => {
  const [usdPrice, setUsdPrice] = useState<string>('');

  const handleCreditChange = (value: string) => {
    const credits = parseFloat(value) || 0;
    const usdValue = (credits * CREDIT_TO_USD).toFixed(2);
    setUsdPrice(usdValue);
    form.setValue('price', credits);
  };

  const handleUsdChange = (value: string) => {
    const usd = parseFloat(value) || 0;
    const credits = Math.round(usd / CREDIT_TO_USD);
    form.setValue('price', credits);
    setUsdPrice(value);
  };

  useEffect(() => {
    // Initialize USD price based on form price (credits)
    const initialCredits = form.getValues('price');
    if (initialCredits) {
      setUsdPrice((initialCredits * CREDIT_TO_USD).toFixed(2));
    }
  }, [form]);

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
                <Input 
                  type="number" 
                  min="0" 
                  step="1"
                  className="pl-8" 
                  placeholder="100" 
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    handleCreditChange(e.target.value);
                  }}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₵</span>
              </div>
            </FormControl>
            <FormDescription>
              Set the price in credits for your package (100 credits = 1g of gold)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormItem>
        <FormLabel>Price in USD</FormLabel>
        <FormControl>
          <div className="relative">
            <Input 
              type="number" 
              min="0" 
              step="0.01"
              className="pl-8" 
              placeholder="74.80" 
              value={usdPrice}
              onChange={(e) => handleUsdChange(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          </div>
        </FormControl>
        <FormDescription>
          Price in USD (1g of gold = ${GOLD_PRICE})
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
