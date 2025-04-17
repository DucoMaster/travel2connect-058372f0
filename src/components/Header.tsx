
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from './header/Logo';
import DesktopNavigation from './header/DesktopNavigation';
import MobileNavigation from './header/MobileNavigation';
import UserMenu from './header/UserMenu';

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        
        {!isMobile && <DesktopNavigation />}
        
        {!isMobile ? (
          <UserMenu />
        ) : (
          <MobileNavigation />
        )}
      </div>
    </header>
  );
};

export default Header;
