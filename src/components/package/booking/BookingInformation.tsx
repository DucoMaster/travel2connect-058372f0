
import React from 'react';
import { Package } from '@/types';
import { MapPin, Calendar, Users } from 'lucide-react';
import { formatDateRange } from '@/utils/PackageUtils';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BookingInformationProps {
  pkg: Package;
  selectedDateRange: string;
  setSelectedDateRange: (value: string) => void;
  availableDates: Array<{ start: string; end: string }>;
}

const BookingInformation = ({ 
  pkg, 
  selectedDateRange, 
  setSelectedDateRange, 
  availableDates 
}: BookingInformationProps) => {
  return (
    <Card className="p-4">
      <h2 className="font-semibold text-lg mb-3">Trip Details</h2>
      <div className="space-y-3">
        <div className="flex items-start">
          <Calendar className="mr-3 h-5 w-5 text-travel-500 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium mb-2">Date</h3>
            <Select
              value={selectedDateRange}
              onValueChange={setSelectedDateRange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your travel dates" />
              </SelectTrigger>
              <SelectContent>
                {availableDates.map((dates, index) => (
                  <SelectItem 
                    key={index} 
                    value={`${dates.start}-${dates.end}`}
                  >
                    {formatDateRange(new Date(dates.start), new Date(dates.end))}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-start">
          <Users className="mr-3 h-5 w-5 text-travel-500 mt-0.5" />
          <div>
            <h3 className="font-medium">Group Size</h3>
            <p className="text-gray-600">
              {pkg?.capacity ? `Up to ${pkg.capacity} people` : 'Not specified'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingInformation;
