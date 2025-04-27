import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Calendar,
  CreditCard,
  Book,
  Package,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@/context/UserContext";

const MobileNavigation = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

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
          <Link
            to="/guides"
            className="flex items-center gap-2 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            <User className="h-4 w-4" />
            Guides
          </Link>

          <Link
            to="/submit-event"
            className="flex items-center gap-2 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            <Calendar className="h-4 w-4" />
            Submit Event
          </Link>

          {user ? (
            <>
              <Link
                to="/credits"
                className="flex items-center gap-2 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <CreditCard className="h-4 w-4" />
                {user.credits} Credits
              </Link>
              <div
                className="flex items-center gap-2 text-lg cursor-pointer"
                onClick={() => {
                  navigate("/profile/create");
                  setIsMenuOpen(false);
                }}
              >
                <User className="h-4 w-4" />
                Manage Profile
              </div>
              <div
                className="flex items-center gap-2 text-lg cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="h-4 w-4" />
                Manage Events
              </div>
              <div
                className="flex items-center gap-2 text-lg cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                <Book className="h-4 w-4" />
                My Chat
              </div>
              <div
                className="flex items-center gap-2 text-lg cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="h-4 w-4" />
                Promotion
              </div>
              <Button
                variant="ghost"
                className="justify-start px-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogOut className="h-4 w-4" />
                Log In
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
