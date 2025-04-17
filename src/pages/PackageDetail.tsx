
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPackages } from '@/data';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import PackageHeader from '@/components/package/PackageHeader';
import PackageDescription from '@/components/package/PackageDescription';
import CheckInSection from '@/components/package/CheckInSection';
import BookingSection from '@/components/package/BookingSection';
import BookingDialog from '@/components/package/BookingDialog';
import GuideApplyDialog from '@/components/package/GuideApplyDialog';
import QRCodeDialog from '@/components/package/QRCodeDialog';
import PackageNotFound from '@/components/package/PackageNotFound';
import PackageOwnerStats from '@/components/package/PackageOwnerStats';
import PackageOwnerActions from '@/components/package/PackageOwnerActions';
import { formatDate } from '@/utils/PackageUtils';

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, setUser } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [packages, setPackages] = useState(mockPackages);
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [showQRCodeDialog, setShowQRCodeDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const pkg = packages.find(p => p.id === id);
  
  // Record a visit when the page loads (would be in a useEffect in a real app)
  if (pkg) {
    // Simulate tracking a visit - in a real app, this would be in useEffect
    // and would call an API to record the visit
    // pkg.visitors += 1;
  }
  
  if (!pkg) {
    return <PackageNotFound />;
  }
  
  const isOwner = user && user.id === pkg.createdBy;
  
  const handleBook = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      if (user && user.credits >= pkg.price) {
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
    
    setTimeout(() => {
      if (user && user.credits >= 10) {
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

  const handleDeletePackage = (packageId: string) => {
    // In a real app, this would call an API to delete the package
    const updatedPackages = packages.filter(p => p.id !== packageId);
    setPackages(updatedPackages);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <PackageHeader pkg={pkg} />
          
          <div className="p-6 bg-white rounded-b-xl shadow-sm">
            {isOwner && (
              <PackageOwnerActions pkg={pkg} onDelete={handleDeletePackage} />
            )}
            
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex-1">
                <PackageDescription pkg={pkg} formatDate={formatDate} />
                
                {isOwner && (
                  <PackageOwnerStats pkg={pkg} />
                )}
                
                <CheckInSection 
                  pkg={pkg} 
                  user={user} 
                  onShowQRCode={() => setShowQRCodeDialog(true)} 
                />
              </div>
              
              <BookingSection 
                pkg={pkg} 
                user={user} 
                onBookNow={() => setShowBookDialog(true)} 
                onApplyToGuide={() => setShowApplyDialog(true)} 
              />
            </div>
          </div>
        </div>
      </main>
      
      <BookingDialog 
        pkg={pkg}
        open={showBookDialog}
        userCredits={user?.credits || 0}
        isProcessing={isProcessing}
        formatDate={formatDate}
        onOpenChange={setShowBookDialog}
        onConfirm={handleBook}
      />
      
      <GuideApplyDialog 
        pkg={pkg}
        open={showApplyDialog}
        userCredits={user?.credits || 0}
        isProcessing={isProcessing}
        formatDate={formatDate}
        onOpenChange={setShowApplyDialog}
        onConfirm={handleApply}
      />
      
      <QRCodeDialog 
        pkg={pkg}
        user={user}
        open={showQRCodeDialog}
        onOpenChange={setShowQRCodeDialog}
      />
    </div>
  );
};

export default PackageDetail;
