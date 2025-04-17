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
// Credit to USD conversion rate
const CREDIT_TO_USD = GOLD_PRICE / CREDITS_PER_GOLD;

// Exchange rates relative to USD (these would come from an API in a real app)
const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.35,
  PHP: 56.42
};

const PriceCapacityFields = ({ form, formType }: PriceCapacityFieldsProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');
  const [currencyPrice, setCurrencyPrice] = useState<string>('');

  const convertCreditsToSelectedCurrency = (credits: number): string => {
    const usdAmount = credits * CREDIT_TO_USD;
    const amount = usdAmount * EXCHANGE_RATES[selectedCurrency];
    return amount.toFixed(2);
  };

  const convertSelectedCurrencyToCredits = (amount: string): number => {
    const value = parseFloat(amount) || 0;
    const usdAmount = value / EXCHANGE_RATES[selectedCurrency];
    return Math.round(usdAmount / CREDIT_TO_USD);
  };

  const handleCreditChange = (value: string) => {
    const credits = parseFloat(value) || 0;
    const currencyValue = convertCreditsToSelectedCurrency(credits);
    setCurrencyPrice(currencyValue);
    form.setValue('price', credits);
  };

  const handleCurrencyChange = (value: string) => {
    const credits = convertSelectedCurrencyToCredits(value);
    form.setValue('price', credits);
    setCurrencyPrice(value);
  };

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    const credits = form.getValues('price');
    const newCurrencyValue = convertCreditsToSelectedCurrency(credits);
    setCurrencyPrice(newCurrencyValue);
  };

  useEffect(() => {
    // Initialize currency price based on form price (credits)
    const initialCredits = form.getValues('price');
    if (initialCredits) {
      setCurrencyPrice(convertCreditsToSelectedCurrency(initialCredits));
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

      <div className="space-y-2">
        <FormLabel>Price in Currency</FormLabel>
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="relative">
              <Input 
                type="number" 
                min="0" 
                step="0.01"
                className="pl-8" 
                placeholder="74.80" 
                value={currencyPrice}
                onChange={(e) => handleCurrencyChange(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {selectedCurrency === 'JPY' ? '¥' : 
                 selectedCurrency === 'EUR' ? '€' : 
                 selectedCurrency === 'GBP' ? '£' : 
                 selectedCurrency === 'PHP' ? '₱' : '$'}
              </span>
            </div>
          </div>
          <CurrencySelector value={selectedCurrency} onChange={handleCurrencySelect} />
        </div>
        <FormDescription>
          Price in {selectedCurrency} (1g of gold = ${GOLD_PRICE})
        </FormDescription>
      </div>

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
