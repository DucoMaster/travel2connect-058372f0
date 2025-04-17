
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Package, User } from '@/types';
import { mockPackages, mockUsers } from '@/data/mockData';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, MapPin, Star, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const Guides = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedRanking, setSelectedRanking] = useState<string>('');
  const [locationOpen, setLocationOpen] = useState(false);
  
  // Get all guides from users array
  const guides = useMemo(() => {
    return mockUsers.filter(user => user.role === 'guide');
  }, []);
  
  // Get all locations from guides
  const locations = useMemo(() => {
    const uniqueLocations = new Set(guides.map(guide => guide.location).filter(Boolean) as string[]);
    return Array.from(uniqueLocations).sort();
  }, [guides]);
  
  // Get guide packages
  const guidePackages = useMemo(() => {
    return mockPackages.filter(pkg => pkg.category === 'guide' || pkg.creatorRole === 'guide');
  }, []);
  
  // Create a map of guides with their packages
  const guidesWithPackages = useMemo(() => {
    return guides.map(guide => {
      const packages = guidePackages.filter(pkg => pkg.createdBy === guide.id);
      return { ...guide, packages };
    });
  }, [guides, guidePackages]);
  
  // Filter guides based on search term, location, and ranking
  const filteredGuides = useMemo(() => {
    return guidesWithPackages.filter(guide => {
      const matchesSearch = 
        (guide.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (guide.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (guide.location?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      
      const matchesLocation = !selectedLocation || guide.location === selectedLocation;
      const matchesRanking = !selectedRanking || guide.ranking >= parseInt(selectedRanking);
      
      return matchesSearch && matchesLocation && matchesRanking;
    });
  }, [guidesWithPackages, searchTerm, selectedLocation, selectedRanking]);
  
  const renderRankingStars = (ranking: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={cn(
          "h-4 w-4", 
          index < ranking ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )} 
      />
    ));
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <section className="mb-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-travel-800">Find Local Guides</h1>
            <p className="mt-2 text-travel-600">
              Connect with experienced local guides to enhance your travel experience
            </p>
          </div>
        </section>
        
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
                  <SelectItem value="">Any rating</SelectItem>
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
        
        <section>
          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <Card key={guide.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-travel-100">
                          <AvatarImage src={guide.profileImage} alt={guide.name || 'Guide'} />
                          <AvatarFallback className="bg-travel-200 text-travel-700">
                            {(guide.name?.charAt(0) || guide.email.charAt(0)).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-xl">{guide.name || guide.email}</CardTitle>
                          <div className="flex mt-1">
                            {renderRankingStars(guide.ranking)}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-travel-50 text-travel-700">
                        Guide
                      </Badge>
                    </div>
                    {guide.location && (
                      <CardDescription className="flex items-center text-sm text-muted-foreground pt-2">
                        <MapPin className="mr-1 h-3.5 w-3.5" />
                        {guide.location}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {guide.description || "No description available."}
                    </p>
                    
                    {guide.packages.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-1">Available packages:</h4>
                        <div className="flex flex-wrap gap-2">
                          {guide.packages.slice(0, 3).map((pkg) => (
                            <Badge key={pkg.id} variant="secondary" className="text-xs">
                              {pkg.title}
                            </Badge>
                          ))}
                          {guide.packages.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{guide.packages.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 pt-2 flex justify-between">
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Users className="mr-1 h-3.5 w-3.5" />
                      <span>Available for {guide.packages.length} experiences</span>
                    </div>
                    <Button size="sm" className="bg-travel-500 hover:bg-travel-600" asChild>
                      <Link to={`/guides/${guide.id}`}>View Profile</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-900">No guides found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </section>
      </main>
      
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <div className="bg-travel-500 text-white p-1 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="font-bold text-travel-700">TravelConnect</span>
            </div>
            <div className="text-center sm:text-right text-sm text-gray-500">
              <p>© 2025 TravelConnect. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Guides;
