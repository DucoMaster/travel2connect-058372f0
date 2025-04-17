
import { Button } from '@/components/ui/button';
import { FormDescription, FormLabel } from '@/components/ui/form';
import { Upload, X } from 'lucide-react';

interface ImageUploadSectionProps {
  selectedImages: string[];
  onImageUpload: () => void;
  onImageDelete: (url: string) => void;
}

const ImageUploadSection = ({ 
  selectedImages, 
  onImageUpload, 
  onImageDelete 
}: ImageUploadSectionProps) => {
  return (
    <div>
      <FormLabel className="block mb-2">Promo Images</FormLabel>
      <div className="flex flex-wrap gap-3 mb-3">
        {selectedImages.map((url, index) => (
          <div key={index} className="relative group">
            <img 
              src={url} 
              alt={`Promo ${index + 1}`} 
              className="w-24 h-24 object-cover rounded-md border" 
            />
            <button 
              type="button"
              onClick={() => onImageDelete(url)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onImageUpload}
        className="w-full flex items-center justify-center gap-2"
      >
        <Upload className="h-4 w-4" />
        Upload Promo Images
      </Button>
      <FormDescription className="mt-2">
        Upload images to showcase your event
      </FormDescription>
    </div>
  );
};

export default ImageUploadSection;
