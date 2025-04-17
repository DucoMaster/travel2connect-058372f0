
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import MobileNavigationItems from './MobileNavigationItems';
import MobileUserMenu from './MobileUserMenu';

const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleClose = () => setIsMenuOpen(false);
  
  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[80%] sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>TravelConnect</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
          <MobileNavigationItems onItemClick={handleClose} />
          <MobileUserMenu onItemClick={handleClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
