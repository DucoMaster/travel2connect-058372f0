
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Search, Calendar, MapPin, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { filterLocations, LocationSuggestion } from '@/utils/locationData';
import { useDebounce } from 'use-debounce';

export const SearchBar = ({
  search,
  setSearch,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: {
  search: string;
  setSearch: (val: string) => void;
  fromDate: Date | undefined;
  setFromDate: (val: Date | undefined) => void;
  toDate: Date | undefined;
  setToDate: (val: Date | undefined) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(search || '');
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
    setSearch(value);
    setIsOpen(true);
  };
  
  const handleSelectLocation = (suggestion: LocationSuggestion) => {
    setInputValue(suggestion.name);
    setSearch(suggestion.name);
    setIsOpen(false);
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
      <div className="relative flex-1" ref={containerRef}>
        <Input
          type="text"
          placeholder="Where do you want to go?"
          className="pl-10 w-full"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => inputValue && setSuggestions(filterLocations(inputValue))}
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        
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

      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[150px] justify-start text-left font-normal"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {fromDate ? format(fromDate, "MMM dd, yyyy") : "Start date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={fromDate}
              onSelect={setFromDate}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[150px] justify-start text-left font-normal"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {toDate ? format(toDate, "MMM dd, yyyy") : "End date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={toDate}
              onSelect={setToDate}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        {/* <Button className="bg-travel-500 hover:bg-travel-600">Search</Button> */}
      </div>
    </div>
  );
};
