import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import StripeCheckout from '@/components/StripeCheckout';
import CreditBalance from '@/components/credits/CreditBalance';
import RoleUpgrade from '@/components/credits/RoleUpgrade';
import LoginPrompt from '@/components/credits/LoginPrompt';
import CreditViewToggle, { CreditView } from '@/components/credits/CreditViewToggle';
import GoldPriceTracker from '@/components/credits/GoldPriceTracker';

const Credits = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const location = useLocation();
  const [creditView, setCreditView] = useState<CreditView>('credits');
  const currentGoldPrice = 74.8; // In a real app, this would come from an API
  
  // Check for success and canceled query parameters
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get('success')) {
      toast({
        title: 'Payment Successful',
        description: 'Your credits have been added to your account.',
      });
    } else if (query.get('canceled')) {
      toast({
        title: 'Payment Canceled',
        description: 'Your payment was canceled. No credits were added.',
        variant: 'destructive',
      });
    }
  }, [location, toast]);
  
  // Mock transaction history
  const recentTransactions = user ? [
    { 
      id: '1', 
      type: 'purchase' as const, 
      amount: 100, 
      description: 'Initial credits', 
      date: new Date(user.createdAt).toLocaleDateString() 
    }
  ] : [];
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-travel-800">Credits & Transactions</h1>
          <p className="mt-2 text-travel-600">Manage your TravelConnect credits</p>
          
          {user ? (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <CreditViewToggle 
                  view={creditView} 
                  onViewChange={setCreditView} 
                />
                <GoldPriceTracker />
                <StripeCheckout />
                <Button variant="outline" className="w-full mt-4">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Transaction History
                </Button>
              </div>
              
              <div>
                <CreditBalance 
                  user={user} 
                  view={creditView}
                  goldPrice={currentGoldPrice}
                />
                <RoleUpgrade userRole={user.role} />
              </div>
            </div>
          ) : (
            <LoginPrompt />
          )}
        </div>
      </main>
    </div>
  );
};

export default Credits;
