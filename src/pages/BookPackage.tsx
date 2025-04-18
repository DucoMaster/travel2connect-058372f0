import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package } from '@/types';
import { mockPackages, mockUsers } from '@/data';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Calendar, Users, ArrowLeft, Star, Share2, User, Mail } from 'lucide-react';
import { formatDateRange } from '@/utils/PackageUtils';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

const BookPackage = () => {
  const { id } = useParams();
  const pkg = mockPackages.find(p => p.id === id);
  const { toast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showContactDialog, setShowContactDialog] = useState(false);

  const host = mockUsers.find(user => user.id === pkg?.createdBy);

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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: pkg.title,
          text: pkg.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          description: "Link copied to clipboard!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to share",
      });
    }
  };

  const handleContact = async () => {
    toast({
      description: "Message sent to host! They will contact you soon.",
    });
    setShowContactDialog(false);
  };

  const rating = 4.97;
  const reviews = 143;

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
          <div className="flex-1">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="pr-4">
                <div className="relative mb-6">
                  <img 
                    src={pkg.images[selectedImageIndex]} 
                    alt={pkg.title}
                    className="w-full rounded-xl aspect-video object-cover"
                  />
                  
                  {pkg.images.length > 1 && (
                    <div className="mt-4">
                      <Carousel>
                        <CarouselContent>
                          {pkg.images.map((image, index) => (
                            <CarouselItem key={index} className="basis-1/4 sm:basis-1/5 lg:basis-1/6">
                              <button
                                onClick={() => setSelectedImageIndex(index)}
                                className={`w-full rounded-lg overflow-hidden border-2 ${
                                  selectedImageIndex === index 
                                    ? 'border-travel-500' 
                                    : 'border-transparent'
                                }`}
                              >
                                <img
                                  src={image}
                                  alt={`${pkg.title} photo ${index + 1}`}
                                  className="w-full aspect-square object-cover"
                                />
                              </button>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-0" />
                        <CarouselNext className="right-0" />
                      </Carousel>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{pkg.title}</h1>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:text-travel-600"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between text-gray-600 mb-6">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    {pkg.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{rating}</span>
                    <span className="text-gray-500">({reviews})</span>
                  </div>
                </div>

                <Card className="p-4 mb-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={host?.profileImage} alt={host?.name} />
                        <AvatarFallback>
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">Hosted by</h3>
                        <Link 
                          to={`/guides/${host?.id}`} 
                          className="text-travel-600 hover:text-travel-800"
                        >
                          {host?.name}
                        </Link>
                      </div>
                    </div>
                    <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <Mail className="h-4 w-4" />
                          Contact Host
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Contact {host?.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <p className="text-gray-600">
                            Send a message to {host?.name} for more information about this experience.
                          </p>
                          <Button 
                            className="w-full bg-travel-500 hover:bg-travel-600"
                            onClick={handleContact}
                          >
                            Send Message
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>

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
