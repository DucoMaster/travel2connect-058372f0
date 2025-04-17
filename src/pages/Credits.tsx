
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Plus, RefreshCw, ShoppingCart } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import StripeCheckout from '@/components/StripeCheckout';

const Credits = () => {
  const { user, setUser } = useUser();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  
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
  
  // Simulate purchasing credits (for demonstration purposes)
  const handlePurchaseCredits = (amount: number) => {
    if (!user) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Update user credits
      const updatedUser = {
        ...user,
        credits: user.credits + amount
      };
      setUser(updatedUser);
      localStorage.setItem('traveler-user', JSON.stringify(updatedUser));
      
      toast({
        title: 'Credits Purchased',
        description: `You've successfully added ${amount} credits to your account.`,
      });
      
      setIsProcessing(false);
    }, 1500);
  };
  
  // Mock transaction history
  const recentTransactions = user ? [
    { 
      id: '1', 
      type: 'purchase', 
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
                <StripeCheckout />
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                      Your recent credit transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentTransactions.length > 0 ? (
                      <div className="space-y-4">
                        {recentTransactions.map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between">
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-full ${
                                transaction.type === 'purchase' 
                                  ? 'bg-green-100 text-green-600' 
                                  : 'bg-red-100 text-red-600'
                              }`}>
                                {transaction.type === 'purchase' ? (
                                  <Plus className="h-4 w-4" />
                                ) : (
                                  <ShoppingCart className="h-4 w-4" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{transaction.description}</div>
                                <div className="text-sm text-gray-500">{transaction.date}</div>
                              </div>
                            </div>
                            <div className={`font-medium ${
                              transaction.type === 'purchase' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'purchase' ? '+' : '-'}{transaction.amount} credits
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No transactions yet
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Credit Balance</CardTitle>
                    <CardDescription>
                      Your current TravelConnect credits
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center p-6">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-travel-100 rounded-full text-travel-700 mb-3">
                          <CreditCard className="h-8 w-8" />
                        </div>
                        <div className="text-4xl font-bold text-travel-800">{user.credits}</div>
                        <div className="text-gray-600 mt-1">available credits</div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-3">
                      <div className="text-sm text-gray-600">How to use credits:</div>
                      <div className="flex items-start gap-2 text-sm">
                        <div className="bg-travel-100 text-travel-700 p-1 rounded">1</div>
                        <div>Book travel packages and experiences</div>
                      </div>
                      {user.role === 'guide' && (
                        <div className="flex items-start gap-2 text-sm">
                          <div className="bg-travel-100 text-travel-700 p-1 rounded">2</div>
                          <div>Apply to guide events (10 credits per application)</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-travel-500 hover:bg-travel-600" asChild>
                      <Link to="/">Browse Experiences</Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                {user.role === 'traveler' && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Become a Guide</CardTitle>
                      <CardDescription>
                        Share your expertise and earn credits
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        As a guide, you can apply to lead tours and events. Each application costs 10 credits, but successful guides can earn more credits.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/settings">Change Role</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-8 text-center bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-travel-800">Login Required</h2>
              <p className="mt-2 text-gray-600">Please log in to view your credits and transactions.</p>
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button className="bg-travel-500 hover:bg-travel-600" size="lg" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Credits;
