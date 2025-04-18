
import { Button } from '@/components/ui/button';
import { FormDescription, FormLabel } from '@/components/ui/form';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { uploadFile, deleteFile } from '@/utils/fileUploadUtils';
import { useState } from 'react';

interface ImageUploadSectionProps {
  selectedImages: string[];
  onImageUpload: (url: string) => void;
  onImageDelete: (url: string) => void;
}

const ImageUploadSection = ({ 
  selectedImages, 
  onImageUpload, 
  onImageDelete 
}: ImageUploadSectionProps) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "You must be logged in to upload images.",
        variant: "destructive"
      });
      return;
    }

    // Create file input dynamically
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        try {
          setIsUploading(true);
          const file = files[0];
          const uploadedUrl = await uploadFile(file, user.id);
          onImageUpload(uploadedUrl);
        } catch (error) {
          toast({
            title: "Upload Failed",
            description: "Failed to upload image. Please try again.",
            variant: "destructive"
          });
        } finally {
          setIsUploading(false);
        }
      }
    };
    input.click();
  };

  const handleImageDelete = async (url: string) => {
    try {
      await deleteFile(url);
      onImageDelete(url);
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete image. Please try again.",
        variant: "destructive"
      });
    }
  };
  
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
              onClick={() => handleImageDelete(url)}
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
        onClick={handleImageUpload}
        disabled={isUploading}
        className="w-full flex items-center justify-center gap-2"
      >
        <Upload className="h-4 w-4" />
        {isUploading ? 'Uploading...' : 'Upload Promo Images'}
      </Button>
      <FormDescription className="mt-2">
        Upload images to showcase your event
      </FormDescription>
    </div>
  );
};

export default ImageUploadSection;
