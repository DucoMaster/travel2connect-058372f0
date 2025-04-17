import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, CreditCard, Book, User, LogIn, LogOut, Menu, Package, UserPlus, X, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useUser } from '@/context/UserContext';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const getUserInitials = () => {
    if (!user || !user.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-travel-500 text-white p-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-travel-700">TravelConnect</span>
          </Link>
        </div>
        
        {!isMobile && (
          <nav className="mx-auto">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/guides">
                    <NavigationMenuLink className={cn(
                      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 group w-max"
                    )}>
                      <User className="mr-1 h-4 w-4" />
                      Guides
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/submit-event">
                    <NavigationMenuLink className={cn(
                      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 group w-max"
                    )}>
                      <Calendar className="mr-1 h-4 w-4" />
                      Submit Event
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        )}
        
        {!isMobile ? (
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate('/credits')} className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4" />
                  {user.credits} Credits
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-travel-500 text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 z-50">
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile/create')} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Manage Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Manage Events</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Book className="mr-2 h-4 w-4" />
                      <span>My Chat</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Promotion</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login" className="flex items-center gap-1">
                    <LogIn className="h-4 w-4" />
                    Log In
                  </Link>
                </Button>
                <Button size="sm" className="bg-travel-500 hover:bg-travel-600" asChild>
                  <Link to="/register" className="flex items-center gap-1">
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        ) : (
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
                <Link to="/guides" className="flex items-center gap-2 text-lg" onClick={() => setIsMenuOpen(false)}>
                  <User className="h-4 w-4" />
                  Guides
                </Link>
                
                <Link to="/submit-event" className="flex items-center gap-2 text-lg" onClick={() => setIsMenuOpen(false)}>
                  <Calendar className="h-4 w-4" />
                  Submit Event
                </Link>
                
                {user ? (
                  <>
                    <Link to="/credits" className="flex items-center gap-2 text-lg" onClick={() => setIsMenuOpen(false)}>
                      <CreditCard className="h-4 w-4" />
                      {user.credits} Credits
                    </Link>
                    <div className="flex items-center gap-2 text-lg cursor-pointer" onClick={() => {
                      navigate('/profile/create');
                      setIsMenuOpen(false);
                    }}>
                      <User className="h-4 w-4" />
                      Manage Profile
                    </div>
                    <div className="flex items-center gap-2 text-lg cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                      <Calendar className="h-4 w-4" />
                      Manage Events
                    </div>
                    <div className="flex items-center gap-2 text-lg cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                      <Book className="h-4 w-4" />
                      My Chat
                    </div>
                    <div className="flex items-center gap-2 text-lg cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                      <Package className="h-4 w-4" />
                      Promotion
                    </div>
                    <Button variant="ghost" className="justify-start px-2" onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex items-center gap-2 text-lg" onClick={() => setIsMenuOpen(false)}>
                      <LogIn className="h-4 w-4" />
                      Log In
                    </Link>
                    <Link to="/register" className="flex items-center gap-2 text-lg" onClick={() => setIsMenuOpen(false)}>
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};

export default Header;
