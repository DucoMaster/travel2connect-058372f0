
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Download, Share2 } from 'lucide-react';

// Simple function to generate a QR code URL using the Google Charts API
// In a production app, consider using a dedicated QR code library
const generateQRCodeUrl = (data: string, size = 200) => {
  const encodedData = encodeURIComponent(data);
  return `https://chart.googleapis.com/chart?cht=qr&chl=${encodedData}&chs=${size}x${size}&choe=UTF-8&chld=L|2`;
};

interface QRCodeDisplayProps {
  eventId: string;
  eventTitle: string;
  attendeeId?: string; // Optional: to create unique QR codes per attendee
}

const QRCodeDisplay = ({ eventId, eventTitle, attendeeId }: QRCodeDisplayProps) => {
  // Create a unique data string for the QR code
  // Include timestamp to ensure uniqueness if needed
  const qrData = JSON.stringify({
    event: eventId,
    title: eventTitle,
    attendee: attendeeId || 'general',
    timestamp: new Date().toISOString(),
  });
  
  const qrCodeUrl = generateQRCodeUrl(qrData);
  
  // Function to download the QR code
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${eventTitle.replace(/\s+/g, '-')}-qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Function to share the QR code (simplified)
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `QR Code for ${eventTitle}`,
          text: `Scan this QR code to check-in to the event: ${eventTitle}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support sharing
      alert('Sharing is not supported on this browser. Please copy the URL manually.');
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <QrCode className="mr-2 h-5 w-5" /> 
          Event Check-In Code
        </CardTitle>
        <CardDescription>
          Use this QR code at the event to confirm your attendance
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="border border-gray-200 rounded-lg p-3 bg-white">
          <img src={qrCodeUrl} alt={`QR Code for ${eventTitle}`} className="w-48 h-48" />
        </div>
        
        <p className="mt-4 text-center text-sm text-gray-500">
          Present this code to the event organizer or scan at the venue to check in
        </p>
        
        <div className="flex gap-3 mt-4">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeDisplay;
