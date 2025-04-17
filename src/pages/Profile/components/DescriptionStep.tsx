
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateAIDescription } from '@/utils/profileUtils';

interface DescriptionStepProps {
  name: string;
  location: string;
  questionAnswers: string[];
  aiDescription: string;
  setAiDescription: (description: string) => void;
  editedDescription: string;
  setEditedDescription: (description: string) => void;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({
  name,
  location,
  questionAnswers,
  aiDescription,
  setAiDescription,
  editedDescription,
  setEditedDescription,
  isSubmitting,
  onBack,
  onSubmit,
}) => {
  const { toast } = useToast();
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  const generateDescription = async () => {
    if (!name || !location) {
      toast({
        title: 'Information needed',
        description: 'Please provide your name and location first.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsGeneratingDescription(true);
    try {
      const description = await generateAIDescription(name, location, questionAnswers);
      setAiDescription(description);
      setEditedDescription(description);
    } catch (error) {
      toast({
        title: 'Description generation failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Professional Description</CardTitle>
        <CardDescription>We'll generate a description based on your information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {!aiDescription ? (
            <div className="text-center p-6">
              <Button
                className="w-full bg-travel-500 hover:bg-travel-600"
                onClick={generateDescription}
                disabled={isGeneratingDescription}
              >
                {isGeneratingDescription ? 'Generating...' : 'Generate AI Description'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Your Description (Feel free to edit)</Label>
                <Textarea
                  id="description"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  rows={6}
                />
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
          onClick={onSubmit}
          disabled={!editedDescription || isSubmitting}
        >
          {isSubmitting ? 'Completing Setup...' : 'Complete Setup'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DescriptionStep;
