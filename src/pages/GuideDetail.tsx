
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { mockUsers, mockPackages } from '@/data';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Star, Package, Calendar, Users, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const GuideDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  
  // Find the guide by ID
  const guide = mockUsers.find(user => user.id === id && user.role === 'guide');
  
  // Get guide's packages
  const guidePackages = mockPackages.filter(pkg => pkg.createdBy === id);
  
  // If guide not found, show error
  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Guide Not Found</h1>
            <p className="mt-2 text-gray-600">The guide you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-4 bg-travel-500 hover:bg-travel-600" asChild>
              <a href="/guides">Back to Guides</a>
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  const renderRankingStars = (ranking: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={cn(
          "h-5 w-5", 
          index < ranking ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )} 
      />
    ));
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Guide Profile Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="relative h-48 bg-travel-100">
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black/20"></div>
          </div>
          
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-12">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage src={guide.profileImage} alt={guide.name || guide.email} />
                <AvatarFallback className="bg-travel-200 text-travel-700 text-2xl">
                  {(guide.name?.charAt(0) || guide.email.charAt(0)).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 mt-4 sm:mt-0">
                <h1 className="text-2xl sm:text-3xl font-bold">{guide.name || guide.email}</h1>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                  <span className="flex">
                    {renderRankingStars(guide.ranking)}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-travel-100 text-travel-600">
                    {guidePackages.length} packages
                  </span>
                </div>
                {guide.location && (
                  <div className="flex items-center mt-2 text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{guide.location}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 sm:mt-0 flex gap-3">
                <Button className="bg-travel-500 hover:bg-travel-600">
                  Contact Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Guide Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start mb-6 bg-white border overflow-auto">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="packages">Packages ({guidePackages.length})</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">About {guide.name || 'this guide'}</h2>
                <p className="text-gray-700">{guide.description || 'No description available.'}</p>
                
                {guide.specialties && guide.specialties.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {guide.specialties.map(specialty => (
                        <Badge key={specialty} variant="secondary" className="px-3 py-1">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="packages" className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Available Packages</h2>
                
                {guidePackages.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {guidePackages.map(pkg => (
                      <Card key={pkg.id} className="overflow-hidden transition-all hover:shadow-md">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-1/3 h-48 sm:h-auto relative">
                            <img 
                              src={pkg.images[0]} 
                              alt={pkg.title}
                              className="absolute w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="flex-1 p-4">
                            <div className="flex justify-between mb-2">
                              <Badge variant="outline" className="bg-travel-50 text-travel-700">
                                {pkg.category}
                              </Badge>
                              <span className="font-bold text-lg">{pkg.price} credits</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-1">{pkg.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{pkg.location}</p>
                            <p className="text-sm text-gray-700 mb-3 line-clamp-2">{pkg.description}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-auto">
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4" />
                                <span>
                                  {new Date(pkg.dates.start).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Users className="mr-1 h-4 w-4" />
                                <span>Capacity: {pkg.capacity}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <Button asChild className="bg-travel-500 hover:bg-travel-600">
                                <a href={`/packages/${pkg.id}`}>View Details</a>
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">This guide doesn't have any packages available yet.</p>
                )}
              </TabsContent>
              
              <TabsContent value="reviews" className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <p className="text-gray-600">Reviews will be available soon.</p>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact {guide.name || 'this guide'}</h3>
                <div className="space-y-4">
                  <Button className="w-full" variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  
                  <p className="text-sm text-gray-600">
                    Usually responds within 24 hours
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {guide.location && (
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{guide.location}</span>
                  </div>
                  <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Map will be available soon</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
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

export default GuideDetail;
