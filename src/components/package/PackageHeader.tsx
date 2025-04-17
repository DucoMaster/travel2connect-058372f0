
import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from '@/types';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PackageHeaderProps {
  pkg: Package;
}

const PackageHeader = ({ pkg }: PackageHeaderProps) => {
  return (
    <>
      <Link 
        to="/" 
        className="inline-flex items-center text-travel-600 hover:text-travel-800 mb-6"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="mr-2"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to Packages
      </Link>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <div className="aspect-[2/1] w-full overflow-hidden">
          <img 
            src={pkg?.images[0]} 
            alt={pkg?.title} 
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold text-travel-800">{pkg?.title}</h1>
            <Badge className="ml-2 text-lg bg-travel-500 hover:bg-travel-600 text-white">
              {pkg?.price} credits
            </Badge>
          </div>
          
          <div className="mt-2 flex items-center text-travel-600">
            <MapPin className="mr-1 h-4 w-4" />
            {pkg?.location}
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageHeader;
