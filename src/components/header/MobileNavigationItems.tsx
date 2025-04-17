
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

const navigationItems = [
  { name: 'Tours', icon: Navigation, path: '/tours' },
  { name: 'Travel', icon: Globe, path: '/travel' },
  { name: 'Clubs', icon: Users, path: '/clubs' },
  { name: 'Events', icon: Calendar, path: '/events' },
  { name: 'Services', icon: Wrench, path: '/services' },
  { name: 'Rental', icon: Home, path: '/rental' },
  { name: 'Guide', icon: Compass, path: '/guides' }
];

interface MobileNavigationItemsProps {
  onItemClick: () => void;
}

const MobileNavigationItems = ({ onItemClick }: MobileNavigationItemsProps) => {
  return (
    <>
      {navigationItems.map((item) => (
        <Link 
          key={item.name}
          to={item.path} 
          className="flex items-center gap-2 text-lg" 
          onClick={onItemClick}
        >
          <item.icon className="h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </>
  );
};

export default MobileNavigationItems;
