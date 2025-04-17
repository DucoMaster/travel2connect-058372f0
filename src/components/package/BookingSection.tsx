
import React from 'react';
import { Link } from 'react-router-dom';
import { Package, User } from '@/types';
import { Button } from '@/components/ui/button';

interface BookingSectionProps {
  pkg: Package;
  user: User | null;
  onBookNow: () => void;
  onApplyToGuide: () => void;
}

const BookingSection = ({ pkg, user, onBookNow, onApplyToGuide }: BookingSectionProps) => {
  return (
    <div className="lg:w-80 shrink-0">
      <div className="bg-travel-50 rounded-lg p-5 border border-travel-100">
        <h3 className="text-lg font-semibold text-travel-800">Book this Experience</h3>
        
        <div className="mt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price</span>
            <span className="font-medium">{pkg?.price} credits</span>
          </div>
          
          {user && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Your credits</span>
              <span className="font-medium">{user.credits} credits</span>
            </div>
          )}
          
          <div className="pt-3 border-t">
            {user ? (
              <>
                {user.role === 'traveler' && (
                  <Button 
                    className="w-full bg-travel-500 hover:bg-travel-600"
                    onClick={onBookNow}
                  >
                    Book Now
                  </Button>
                )}
                
                {user.role === 'guide' && (
                  <Button 
                    className="w-full bg-coral-500 hover:bg-coral-600"
                    onClick={onApplyToGuide}
                  >
                    Apply to Guide (10 credits)
                  </Button>
                )}
                
                {(user.role === 'agent' || user.role === 'venue') && (
                  <div className="text-center text-gray-600 text-sm">
                    You can view but not book this package as an {user.role}.
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-3">
                <Button 
                  className="w-full bg-travel-500 hover:bg-travel-600"
                  asChild
                >
                  <Link to="/login">Login to Book</Link>
                </Button>
                <div className="text-center text-gray-600 text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-travel-600 hover:text-travel-800">
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
