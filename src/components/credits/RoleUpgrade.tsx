
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

interface RoleUpgradeProps {
  userRole: string;
}

export default function RoleUpgrade({ userRole }: RoleUpgradeProps) {
  if (userRole !== 'traveler') {
    return null;
  }

  return (
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
  );
}
