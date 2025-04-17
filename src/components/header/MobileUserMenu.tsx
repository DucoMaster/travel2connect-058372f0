
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, CreditCard, Book, Package, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';

interface MobileUserMenuProps {
  onItemClick: () => void;
}

const MobileUserMenu = ({ onItemClick }: MobileUserMenuProps) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    onItemClick();
  };

  if (!user) {
    return (
      <>
        <Link to="/login" className="flex items-center gap-2 text-lg" onClick={onItemClick}>
          <LogOut className="h-4 w-4" />
          Log In
        </Link>
        <Link to="/register" className="flex items-center gap-2 text-lg" onClick={onItemClick}>
          <User className="h-4 w-4" />
          Sign Up
        </Link>
      </>
    );
  }

  return (
    <>
      <Link to="/credits" className="flex items-center gap-2 text-lg" onClick={onItemClick}>
        <CreditCard className="h-4 w-4" />
        {user.credits} Credits
      </Link>
      <div 
        className="flex items-center gap-2 text-lg cursor-pointer" 
        onClick={() => {
          navigate('/profile/create');
          onItemClick();
        }}
      >
        <User className="h-4 w-4" />
        Manage Profile
      </div>
      <div className="flex items-center gap-2 text-lg cursor-pointer" onClick={onItemClick}>
        <Calendar className="h-4 w-4" />
        Manage Events
      </div>
      <div className="flex items-center gap-2 text-lg cursor-pointer" onClick={onItemClick}>
        <Book className="h-4 w-4" />
        My Chat
      </div>
      <div className="flex items-center gap-2 text-lg cursor-pointer" onClick={onItemClick}>
        <Package className="h-4 w-4" />
        Promotion
      </div>
      <Button variant="ghost" className="justify-start px-2" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        Log Out
      </Button>
    </>
  );
};

export default MobileUserMenu;
