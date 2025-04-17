
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateAIImages } from '@/utils/profileUtils';

interface ProfileImageStepProps {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  onBack: () => void;
  onContinue: () => void;
}

const ProfileImageStep: React.FC<ProfileImageStepProps> = ({
  uploadedImage,
  setUploadedImage,
  selectedImage,
  setSelectedImage,
  onBack,
  onContinue,
}) => {
  const { toast } = useToast();
  const [aiImages, setAiImages] = useState<string[]>([]);
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        setUploadedImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!uploadedImage) return;
    
    setIsProcessingImage(true);
    try {
      const generatedImages = await generateAIImages(uploadedImage);
      setAiImages(generatedImages);
      setSelectedImage(generatedImages[0]); // Select first image by default
    } catch (error) {
      toast({
        title: 'Image processing failed',
        description: 'Please try again with a different image.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessingImage(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Image</CardTitle>
        <CardDescription>Upload an image and we'll enhance it</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="image">Upload Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="cursor-pointer"
            />
          </div>
          
          {uploadedImage && (
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden w-40 h-40 mx-auto">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {!aiImages.length && (
                <Button
                  className="w-full"
                  onClick={processImage}
                  disabled={isProcessingImage}
                >
                  {isProcessingImage ? 'Processing...' : 'Enhance with AI'}
                </Button>
              )}
            </div>
          )}
          
          {aiImages.length > 0 && (
            <div className="space-y-4">
              <Label>Select Your Enhanced Image</Label>
              <div className="grid grid-cols-3 gap-4">
                {aiImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedImage === image ? 'border-travel-500 ring-2 ring-travel-300' : 'border-gray-200 hover:border-travel-200'
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`AI-enhanced ${index + 1}`} 
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <Button 
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          className="bg-travel-500 hover:bg-travel-600"
          onClick={onContinue}
          disabled={!selectedImage && !uploadedImage}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileImageStep;
