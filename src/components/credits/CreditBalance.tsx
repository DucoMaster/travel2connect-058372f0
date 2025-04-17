
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Coins } from 'lucide-react';
import { User } from '@/types';
import { useState } from 'react';
import CurrencySelector, { Currency } from '@/components/event-form/fields/CurrencySelector';

// Exchange rates relative to USD (these would come from an API in a real app)
const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.35,
  PHP: 56.42
};

// Currency symbols mapping
const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  PHP: '₱'
};

interface CreditBalanceProps {
  user: User;
  view: 'credits' | 'cash';
  goldPrice: number;
}

export default function CreditBalance({ user, view, goldPrice }: CreditBalanceProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');

  // Calculate cash value (1 gram of gold = 100 credits)
  const getCashValue = () => {
    const usdValue = (user.credits / 100) * goldPrice;
    return (usdValue * EXCHANGE_RATES[selectedCurrency]).toFixed(2);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Credit Balance</CardTitle>
            <CardDescription>
              Your current TravelConnect {view === 'credits' ? 'credits' : 'cash value'}
            </CardDescription>
          </div>
          {view === 'cash' && (
            <CurrencySelector value={selectedCurrency} onChange={setSelectedCurrency} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-6">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center p-4 rounded-full mb-3 ${
              view === 'credits' 
                ? 'bg-travel-100 text-travel-700' 
                : 'bg-amber-100 text-amber-700'
            }`}>
              {view === 'credits' ? (
                <CreditCard className="h-8 w-8" />
              ) : (
                <Coins className="h-8 w-8" />
              )}
            </div>
            <div className={`text-4xl font-bold ${
              view === 'credits' ? 'text-travel-800' : 'text-amber-700'
            }`}>
              {view === 'credits' 
                ? `${user.credits} credits`
                : `${CURRENCY_SYMBOLS[selectedCurrency]}${getCashValue()}`
              }
            </div>
            {view === 'cash' && (
              <div className="text-sm text-gray-500 mt-1">
                {user.credits} credits
              </div>
            )}
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
  );
}

