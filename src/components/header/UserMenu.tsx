
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, LogOut, User, Calendar, Book, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserMenu = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const getUserInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };
  
  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/login" className="flex items-center gap-1">
            <LogOut className="h-4 w-4" />
            Log In
          </Link>
        </Button>
        <Button size="sm" className="bg-travel-500 hover:bg-travel-600" asChild>
          <Link to="/register" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            Sign Up
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm" onClick={() => navigate('/credits')} className="flex items-center gap-1">
        <CreditCard className="h-4 w-4" />
        {user.credits} Credits
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              {user.profileImage && (
                <AvatarImage src={user.profileImage} alt={user.name || user.email} />
              )}
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
    </div>
  );
};

export default UserMenu;
