
import { Link } from 'react-router-dom';
import { 
  Navigation, 
  Map, 
  Globe, 
  Users, 
  Calendar, 
  Wrench,
  Home,
  Compass
} from 'lucide-react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Tours', icon: Navigation, path: '/tours' },
  { name: 'Travel', icon: Globe, path: '/travel' },
  { name: 'Clubs', icon: Users, path: '/clubs' },
  { name: 'Events', icon: Calendar, path: '/events' },
  { name: 'Services', icon: Wrench, path: '/services' },
  { name: 'Rental', icon: Home, path: '/rental' },
  { name: 'Guide', icon: Compass, path: '/guides' }
];

const DesktopNavigation = () => {
  return (
    <nav className="mx-auto">
      <NavigationMenu>
        <NavigationMenuList>
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              <Link to={item.path}>
                <NavigationMenuLink className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 group w-max"
                )}>
                  <item.icon className="mr-1 h-4 w-4" />
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default DesktopNavigation;
