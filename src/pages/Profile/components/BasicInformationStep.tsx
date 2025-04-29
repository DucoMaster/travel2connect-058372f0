
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';
import { filterLocations, LocationSuggestion } from '@/utils/locationData';
import { useDebounce } from 'use-debounce';

interface BasicInformationStepProps {
  name: string;
  setName: (name: string) => void;
  location: string;
  setLocation: (location: string) => void;
  onContinue: () => void;
}

const BasicInformationStep: React.FC<BasicInformationStepProps> = ({
  name,
  setName,
  location,
  setLocation,
  onContinue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(location || '');
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
    setLocation(value);
    setIsOpen(true);
  };
  
  const handleSelectLocation = (suggestion: LocationSuggestion) => {
    setInputValue(suggestion.name);
    setLocation(suggestion.name);
    setIsOpen(false);
    setSuggestions([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Tell us about yourself</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location">Location (City, Country)</Label>
            <div className="relative" ref={containerRef}>
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="location"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => inputValue && setSuggestions(filterLocations(inputValue))}
                className="pl-10"
                placeholder="New York, USA"
                required
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
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-travel-500 hover:bg-travel-600"
          onClick={onContinue}
          disabled={!name || !location}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BasicInformationStep;
