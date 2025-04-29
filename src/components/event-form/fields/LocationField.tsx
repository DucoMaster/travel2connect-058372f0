
import { useState, useEffect, useRef } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from '../EventFormFields';
import { filterLocations, LocationSuggestion } from '@/utils/locationData';
import { useDebounce } from 'use-debounce';

interface LocationFieldProps {
  form: UseFormReturn<EventFormValues>;
}

const LocationField = ({ form }: LocationFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(form.getValues('location') || '');
  const [debouncedValue] = useDebounce(inputValue, 300);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setSuggestions(filterLocations(debouncedValue));
  }, [debouncedValue]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    form.setValue('location', value, { shouldValidate: true });
    setIsOpen(true);
  };
  
  const handleSelectLocation = (suggestion: LocationSuggestion) => {
    setInputValue(suggestion.name);
    form.setValue('location', suggestion.name, { shouldValidate: true });
    setIsOpen(false);
    setSuggestions([]);
  };

  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Location</FormLabel>
          <FormControl>
            <div className="relative" ref={containerRef}>
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                className="pl-10 w-full" 
                placeholder="City, Country" 
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => inputValue && setSuggestions(filterLocations(inputValue))}
                {...field}
                value={inputValue}
              />
              
              {isOpen && suggestions.length > 0 && (
                <div className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                  <ul className="py-1">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                        onClick={() => handleSelectLocation(suggestion)}
                      >
                        {suggestion.type === 'city' ? (
                          <MapPin className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Navigation className="h-4 w-4 text-gray-500" />
                        )}
                        <span>{suggestion.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LocationField;
