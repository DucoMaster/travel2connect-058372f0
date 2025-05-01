import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Download, Share2 } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react"; // Import the QRCode component

interface QRCodeDisplayProps {
  eventId: string;
  eventTitle: string;
  attendeeId?: string; // Optional: to create unique QR codes per attendee
  eventStartDate?: string;
  eventEndDate?: string;
  title?: string;
}

const QRCodeDisplay = ({
  eventId,
  eventTitle,
  attendeeId,
  eventStartDate,
  eventEndDate,
  title,
}: QRCodeDisplayProps) => {
  // Create a unique data string for the QR code
  // const qrData = JSON.stringify({
  //   event: eventId,
  //   title: eventTitle,
  //   attendee: attendeeId || "general", // Default to 'general' if no attendeeId is passed
  //   timestamp: new Date().toISOString(),
  // });

  const qrData = `${
    window.location.origin
  }/event-checkin?event=${eventId}&attendee=${
    attendeeId || "general"
  }&title={title}&start=${encodeURIComponent(
    eventStartDate
  )}&end=${encodeURIComponent(eventEndDate)}`;

  // Function to download the QR code
  const handleDownload = () => {
    const canvas = document.getElementById(
      "qr-code-canvas"
    ) as HTMLCanvasElement;
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${eventTitle.replace(/\s+/g, "-")}-qrcode.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support sharing
      alert(
        "Sharing is not supported on this browser. Please copy the URL manually."
      );
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto h-[80vh] overflow-auto">
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
        {/* Display the QR code using qrcode.react */}
        <div className="border border-gray-200 rounded-lg p-3 bg-white">
          <QRCodeCanvas
            id="qr-code-canvas"
            value={qrData}
            size={256}
            level="L"
          />
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Present this code to the event organizer or scan at the venue to check
          in
        </p>

        <div className="flex gap-3 mt-4">
          {/* Button to download the QR code */}
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Save
          </Button>
          {/* Button to share the QR code */}
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeDisplay;
