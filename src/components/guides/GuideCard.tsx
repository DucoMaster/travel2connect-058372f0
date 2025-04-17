
import { Link } from 'react-router-dom';
import { User } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GuideCardProps {
  guide: User & { packages: any[] };
}

const GuideCard = ({ guide }: GuideCardProps) => {
  const renderRankingStars = (ranking: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={cn(
          "h-4 w-4", 
          index < ranking ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )} 
      />
    ));
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-travel-100">
              <AvatarImage src={guide.profileImage} alt={guide.name || 'Guide'} />
              <AvatarFallback className="bg-travel-200 text-travel-700">
                {(guide.name?.charAt(0) || guide.email.charAt(0)).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{guide.name || guide.email}</CardTitle>
              <div className="flex mt-1">
                {renderRankingStars(guide.ranking)}
              </div>
            </div>
          </div>
          <Badge variant="outline" className="bg-travel-50 text-travel-700">
            Guide
          </Badge>
        </div>
        {guide.location && (
          <CardDescription className="flex items-center text-sm text-muted-foreground pt-2">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            {guide.location}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {guide.description || "No description available."}
        </p>
        
        {guide.packages.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium mb-1">Available packages:</h4>
            <div className="flex flex-wrap gap-2">
              {guide.packages.slice(0, 3).map((pkg) => (
                <Badge key={pkg.id} variant="secondary" className="text-xs">
                  {pkg.title}
                </Badge>
              ))}
              {guide.packages.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{guide.packages.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-2 flex justify-between">
        <div className="text-xs text-muted-foreground flex items-center">
          <Users className="mr-1 h-3.5 w-3.5" />
          <span>Available for {guide.packages.length} experiences</span>
        </div>
        <Button size="sm" className="bg-travel-500 hover:bg-travel-600" asChild>
          <Link to={`/guides/${guide.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GuideCard;
