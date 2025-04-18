
import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';

interface ImageCarouselProps {
  images: string[];
  selectedImageIndex: number;
  onImageSelect: (index: number) => void;
}

const ImageCarousel = ({ images, selectedImageIndex, onImageSelect }: ImageCarouselProps) => {
  return (
    <div className="relative mb-6">
      <img 
        src={images[selectedImageIndex]} 
        alt={`Selected view ${selectedImageIndex + 1}`}
        className="w-full rounded-xl aspect-video object-cover"
      />
      
      {images.length > 1 && (
        <div className="mt-4">
          <Carousel>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="basis-1/4 sm:basis-1/5 lg:basis-1/6">
                  <button
                    onClick={() => onImageSelect(index)}
                    className={`w-full rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index 
                        ? 'border-travel-500' 
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
