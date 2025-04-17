
import React from 'react';
import { Package, User } from '@/types';
import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CheckInSectionProps {
  pkg: Package;
  user: User | null;
  onShowQRCode: () => void;
}

const CheckInSection = ({ pkg, user, onShowQRCode }: CheckInSectionProps) => {
  if (!user) return null;
  
  return (
    <div className="mt-6 border-t pt-6">
      <div className="flex items-center mb-3">
        <QrCode className="mr-2 h-5 w-5 text-travel-600" />
        <h3 className="text-lg font-medium text-travel-700">Event Check-In</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Use the QR code to check in at the event. This helps verify your attendance and confirms the event took place.
      </p>
      <Button 
        variant="outline" 
        onClick={onShowQRCode}
        className="flex items-center text-travel-600 hover:text-travel-800 hover:bg-travel-50"
      >
        <QrCode className="mr-2 h-4 w-4" />
        View Check-In QR Code
      </Button>
    </div>
  );
};

export default CheckInSection;
