
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package } from '@/types';
import { mockPackages } from '@/data';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Calendar, Users, ArrowLeft } from 'lucide-react';
import { formatDateRange } from '@/utils/PackageUtils';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';

const BookPackage = () => {
  const { id } = useParams();
  const pkg = mockPackages.find(p => p.id === id);

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Package not found</h1>
            <Link to="/" className="text-travel-600 hover:text-travel-700">
              Return to home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <Link 
          to={`/packages/${id}`} 
          className="inline-flex items-center text-travel-600 hover:text-travel-800 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Package
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="pr-4">
                <img 
                  src={pkg.images[0]} 
                  alt={pkg.title}
                  className="w-full rounded-xl aspect-video object-cover mb-6"
                />

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{pkg.title}</h1>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="mr-2 h-5 w-5" />
                  {pkg.location}
                </div>

                <div className="space-y-6 mb-8">
                  <Card className="p-4">
                    <h2 className="font-semibold text-lg mb-3">Trip Details</h2>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Calendar className="mr-3 h-5 w-5 text-travel-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Date</h3>
                          <p className="text-gray-600">{formatDateRange(pkg.dates.start, pkg.dates.end)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Users className="mr-3 h-5 w-5 text-travel-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Group Size</h3>
                          <p className="text-gray-600">
                            {pkg.capacity ? `Up to ${pkg.capacity} people` : 'Not specified'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h2 className="font-semibold text-lg mb-3">About This Experience</h2>
                    <p className="text-gray-600 whitespace-pre-line">{pkg.description}</p>
                  </Card>

                  {pkg.images.length > 1 && (
                    <Card className="p-4">
                      <h2 className="font-semibold text-lg mb-3">Photos</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {pkg.images.slice(1).map((image, index) => (
                          <img 
                            key={index}
                            src={image}
                            alt={`${pkg.title} photo ${index + 2}`}
                            className="w-full aspect-square object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="sticky top-6">
              <Card className="p-4">
                <h3 className="text-xl font-semibold mb-4">{pkg.price} credits</h3>
                <Button className="w-full bg-travel-500 hover:bg-travel-600" asChild>
                  <Link to={`/packages/${pkg.id}/book`}>Book Now</Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookPackage;
