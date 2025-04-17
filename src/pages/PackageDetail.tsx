
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockPackages } from '@/data';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CreditCard, MapPin, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

// Helper function to format dates
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, setUser } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Find the package with the matching id
  const pkg = mockPackages.find(p => p.id === id);
  
  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-travel-800">Package Not Found</h2>
            <p className="mt-2 text-travel-600">The package you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-6 bg-travel-500 hover:bg-travel-600" asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  const handleBook = () => {
    setIsProcessing(true);
    
    // Simulate booking process
    setTimeout(() => {
      if (user && user.credits >= pkg.price) {
        // Update user credits
        const updatedUser = {
          ...user,
          credits: user.credits - pkg.price
        };
        setUser(updatedUser);
        localStorage.setItem('traveler-user', JSON.stringify(updatedUser));
        
        toast({
          title: 'Booking Successful',
          description: `You've booked ${pkg.title} for ${pkg.price} credits.`,
        });
        setShowBookDialog(false);
        navigate('/');
      } else {
        toast({
          title: 'Booking Failed',
          description: 'You don\'t have enough credits for this booking.',
          variant: 'destructive',
        });
      }
      setIsProcessing(false);
    }, 1500);
  };
  
  const handleApply = () => {
    setIsProcessing(true);
    
    // Simulate application process (costs 10 credits)
    setTimeout(() => {
      if (user && user.credits >= 10) {
        // Update user credits
        const updatedUser = {
          ...user,
          credits: user.credits - 10
        };
        setUser(updatedUser);
        localStorage.setItem('traveler-user', JSON.stringify(updatedUser));
        
        toast({
          title: 'Application Submitted',
          description: `You've applied to guide for ${pkg.title}.`,
        });
        setShowApplyDialog(false);
        navigate('/');
      } else {
        toast({
          title: 'Application Failed',
          description: 'You don\'t have enough credits to apply (10 credits required).',
          variant: 'destructive',
        });
      }
      setIsProcessing(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
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
                src={pkg.images[0]} 
                alt={pkg.title} 
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h1 className="text-3xl font-bold text-travel-800">{pkg.title}</h1>
                    <Badge className="ml-2 text-lg bg-travel-500 hover:bg-travel-600 text-white">
                      {pkg.price} credits
                    </Badge>
                  </div>
                  
                  <div className="mt-2 flex items-center text-travel-600">
                    <MapPin className="mr-1 h-4 w-4" />
                    {pkg.location}
                  </div>
                  
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold text-travel-700">About This Experience</h2>
                    <p className="mt-2 text-gray-600 leading-relaxed">{pkg.description}</p>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start">
                      <Calendar className="mr-3 h-5 w-5 text-travel-500" />
                      <div>
                        <h3 className="font-medium text-gray-900">Date</h3>
                        <p className="text-gray-600">
                          {pkg.dates.start.getTime() === pkg.dates.end.getTime() 
                            ? formatDate(pkg.dates.start) 
                            : `${formatDate(pkg.dates.start)} - ${formatDate(pkg.dates.end)}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="mr-3 h-5 w-5 text-travel-500" />
                      <div>
                        <h3 className="font-medium text-gray-900">Group Size</h3>
                        <p className="text-gray-600">
                          {pkg.capacity ? `Up to ${pkg.capacity} people` : 'Not specified'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CreditCard className="mr-3 h-5 w-5 text-travel-500" />
                      <div>
                        <h3 className="font-medium text-gray-900">Price</h3>
                        <p className="text-gray-600">{pkg.price} credits per person</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-80 shrink-0">
                  <div className="bg-travel-50 rounded-lg p-5 border border-travel-100">
                    <h3 className="text-lg font-semibold text-travel-800">Book this Experience</h3>
                    
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price</span>
                        <span className="font-medium">{pkg.price} credits</span>
                      </div>
                      
                      {user && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Your credits</span>
                          <span className="font-medium">{user.credits} credits</span>
                        </div>
                      )}
                      
                      <div className="pt-3 border-t">
                        {user ? (
                          <>
                            {user.role === 'traveler' && (
                              <Button 
                                className="w-full bg-travel-500 hover:bg-travel-600"
                                onClick={() => setShowBookDialog(true)}
                              >
                                Book Now
                              </Button>
                            )}
                            
                            {user.role === 'guide' && (
                              <Button 
                                className="w-full bg-coral-500 hover:bg-coral-600"
                                onClick={() => setShowApplyDialog(true)}
                              >
                                Apply to Guide (10 credits)
                              </Button>
                            )}
                            
                            {(user.role === 'agent' || user.role === 'venue') && (
                              <div className="text-center text-gray-600 text-sm">
                                You can view but not book this package as an {user.role}.
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="space-y-3">
                            <Button 
                              className="w-full bg-travel-500 hover:bg-travel-600"
                              asChild
                            >
                              <Link to="/login">Login to Book</Link>
                            </Button>
                            <div className="text-center text-gray-600 text-sm">
                              Don't have an account?{' '}
                              <Link to="/register" className="text-travel-600 hover:text-travel-800">
                                Sign up
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Booking Confirmation Dialog */}
      <Dialog open={showBookDialog} onOpenChange={setShowBookDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Booking</DialogTitle>
            <DialogDescription>
              You're about to book {pkg.title} for {pkg.price} credits.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Experience</span>
                <span className="font-medium">{pkg.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">
                  {pkg.dates.start.getTime() === pkg.dates.end.getTime() 
                    ? formatDate(pkg.dates.start) 
                    : `${formatDate(pkg.dates.start)} - ${formatDate(pkg.dates.end)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price</span>
                <span className="font-medium">{pkg.price} credits</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2 mt-2">
                <span className="text-gray-600">Your current balance</span>
                <span className="font-medium">{user?.credits || 0} credits</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Balance after booking</span>
                <span className="font-medium">{(user?.credits || 0) - pkg.price} credits</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookDialog(false)}>Cancel</Button>
            <Button 
              className="bg-travel-500 hover:bg-travel-600"
              disabled={isProcessing || (user?.credits || 0) < pkg.price}
              onClick={handleBook}
            >
              {isProcessing ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Apply to Guide Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply to Guide</DialogTitle>
            <DialogDescription>
              You're applying to guide for {pkg.title}. This will cost 10 credits.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Experience</span>
                <span className="font-medium">{pkg.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">
                  {pkg.dates.start.getTime() === pkg.dates.end.getTime() 
                    ? formatDate(pkg.dates.start) 
                    : `${formatDate(pkg.dates.start)} - ${formatDate(pkg.dates.end)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Application cost</span>
                <span className="font-medium">10 credits</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2 mt-2">
                <span className="text-gray-600">Your current balance</span>
                <span className="font-medium">{user?.credits || 0} credits</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Balance after applying</span>
                <span className="font-medium">{(user?.credits || 0) - 10} credits</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApplyDialog(false)}>Cancel</Button>
            <Button 
              className="bg-coral-500 hover:bg-coral-600"
              disabled={isProcessing || (user?.credits || 0) < 10}
              onClick={handleApply}
            >
              {isProcessing ? 'Processing...' : 'Submit Application'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackageDetail;
