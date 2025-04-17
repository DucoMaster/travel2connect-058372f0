
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard } from 'lucide-react';
import { User } from '@/types';

interface CreditBalanceProps {
  user: User;
}

export default function CreditBalance({ user }: CreditBalanceProps) {
  return (
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
  );
}
