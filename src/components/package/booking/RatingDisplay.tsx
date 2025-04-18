
import React from 'react';
import { Star } from 'lucide-react';

interface RatingDisplayProps {
  rating: number;
  reviews: number;
}

const RatingDisplay = ({ rating, reviews }: RatingDisplayProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-5 w-5 text-gray-300 fill-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-[50%]">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300 fill-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {renderStars(rating)}
      </div>
      <span className="font-medium ml-2">{rating}</span>
      <span className="text-gray-500">({reviews} reviews)</span>
    </div>
  );
};

export default RatingDisplay;
