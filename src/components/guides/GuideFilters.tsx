
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GuideFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedRanking: string;
  setSelectedRanking: (ranking: string) => void;
  locations: string[];
}

const GuideFilters = ({
  searchTerm,
  setSearchTerm,
  selectedLocation,
  setSelectedLocation,
  selectedRanking,
  setSelectedRanking,
  locations
}: GuideFiltersProps) => {
  const [locationOpen, setLocationOpen] = useState(false);

  return (
    <section className="mb-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Search</label>
          <Input
            placeholder="Search guides by name, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-64">
          <label className="text-sm font-medium mb-1 block">Location</label>
          <Popover open={locationOpen} onOpenChange={setLocationOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={locationOpen}
                className="w-full justify-between"
              >
                {selectedLocation ? selectedLocation : "Select location..."}
                <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search location..." />
                <CommandList>
                  <CommandEmpty>No location found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setSelectedLocation('');
                        setLocationOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          !selectedLocation ? "opacity-100" : "opacity-0"
                        )}
                      />
                      All Locations
                    </CommandItem>
                    {locations.map((location) => (
                      <CommandItem
                        key={location}
                        onSelect={() => {
                          setSelectedLocation(location);
                          setLocationOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedLocation === location ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {location}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="w-full md:w-48">
          <label className="text-sm font-medium mb-1 block">Minimum Rating</label>
          <Select value={selectedRanking} onValueChange={setSelectedRanking}>
            <SelectTrigger>
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any rating</SelectItem>
              <SelectItem value="5">★★★★★ (5)</SelectItem>
              <SelectItem value="4">★★★★☆ (4+)</SelectItem>
              <SelectItem value="3">★★★☆☆ (3+)</SelectItem>
              <SelectItem value="2">★★☆☆☆ (2+)</SelectItem>
              <SelectItem value="1">★☆☆☆☆ (1+)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
};

export default GuideFilters;
