import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Package } from "@/types";
import { mockPackages, mockUsers } from "@/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, ArrowLeft, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageCarousel from "@/components/package/booking/ImageCarousel";
import RatingDisplay from "@/components/package/booking/RatingDisplay";
import BookingInformation from "@/components/package/booking/BookingInformation";
import HostInformation from "@/components/package/booking/HostInformation";
import AboutSection from "@/components/package/booking/AboutSection";
import Header from "@/components/Header";

const BookPackage = () => {
  const { id } = useParams();
  const pkg = mockPackages.find((p) => p.id === id);
  const { toast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedDateRange, setSelectedDateRange] = useState<string>(
    pkg?.dates ? `${pkg.dates.start}-${pkg.dates.end}` : ""
  );

  const rating = 4.7;
  const reviews = 143;
  const host = mockUsers.find((user) => user.id === pkg?.createdBy);

  const availableDates = [
    { start: "2025-05-01", end: "2025-05-07" },
    { start: "2025-05-15", end: "2025-05-21" },
    { start: "2025-06-01", end: "2025-06-07" },
    { start: "2025-06-15", end: "2025-06-21" },
  ];

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Package not found
            </h1>
            <Link to="/" className="text-travel-600 hover:text-travel-700">
              Return to home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: pkg.title,
          text: pkg.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          description: "Link copied to clipboard!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to share",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <Link
          to={`/packages/${id}`}
          className="inline-flex items-center text-travel-600 hover:text-travel-800 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Package
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <ImageCarousel
              images={pkg.images}
              selectedImageIndex={selectedImageIndex}
              onImageSelect={setSelectedImageIndex}
            />

            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{pkg.title}</h1>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-travel-600"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center justify-between text-gray-600 mb-6">
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                {pkg.location}
              </div>
              <RatingDisplay rating={rating} reviews={reviews} />
            </div>

            <HostInformation host={host} />

            <BookingInformation
              pkg={pkg}
              selectedDateRange={selectedDateRange}
              setSelectedDateRange={setSelectedDateRange}
              availableDates={availableDates}
            />

            <AboutSection description={pkg.description} />
          </div>

          <div className="lg:w-80 shrink-0">
            <div className="sticky top-6">
              <Card className="p-4">
                <h3 className="text-xl font-semibold mb-4">
                  {pkg.price} credits
                </h3>
                <Button
                  className="w-full bg-travel-500 hover:bg-travel-600"
                  asChild
                >
                  <Link to={`/packages/${pkg.id}/book`}>Book Now</Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookPackage;
