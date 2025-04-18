
import React from 'react';
import { User } from '@/types';
import { Link } from 'react-router-dom';
import { Mail, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface HostInformationProps {
  host: User | undefined;
}

const HostInformation = ({ host }: HostInformationProps) => {
  const [showContactDialog, setShowContactDialog] = React.useState(false);
  const { toast } = useToast();

  const handleContact = async () => {
    toast({
      description: "Message sent to host! They will contact you soon.",
    });
    setShowContactDialog(false);
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={host?.profileImage} alt={host?.name} />
            <AvatarFallback>
              <UserIcon className="h-6 w-6" />
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
  );
};

export default HostInformation;
