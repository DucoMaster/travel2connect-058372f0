
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import FormTypeSelector, { FormType } from '@/components/event-form/FormTypeSelector';
import ImageUploadSection from '@/components/event-form/ImageUploadSection';
import ReviewNotice from '@/components/event-form/ReviewNotice';
import FormFooter from '@/components/event-form/FormFooter';
import EventFormFields, { EventFormValues, eventFormSchema } from '@/components/event-form/EventFormFields';
import CreditRequirementAlert from '@/components/event-form/CreditRequirementAlert';
import VerificationAlert from '@/components/event-form/VerificationAlert';

// Cost to submit an event
export const EVENT_SUBMISSION_COST = 10;

interface EventFormContainerProps {
  formType: FormType;
  setFormType: (type: FormType) => void;
}

const EventFormContainer = ({ formType, setFormType }: EventFormContainerProps) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      price: 0,
      startDate: '',
      endDate: '',
      isOpenForPlanning: false,
      capacity: 1,
      imageUrls: [],
      formType: 'travel',
    },
  });
  
  const onSubmit = (data: EventFormValues) => {
    setIsSubmitting(true);
    
    data.formType = formType;
    data.imageUrls = selectedImages;
    
    // Check if user has enough credits
    if (user && user.credits < EVENT_SUBMISSION_COST) {
      toast({
        title: "Not enough credits",
        description: `You need ${EVENT_SUBMISSION_COST} credits to submit an event. You currently have ${user.credits} credits.`,
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    setTimeout(() => {
      console.log('Event submitted:', data);
      
      toast({
        title: "Event submitted successfully!",
        description: "Your event is pending review and will be published within 24 hours.",
      });
      
      // Notify about credits spent
      if (user) {
        toast({
          title: "Credits spent",
          description: `${EVENT_SUBMISSION_COST} credits have been deducted from your account.`,
        });
      }
      
      setIsSubmitting(false);
      
      form.reset();
      setSelectedImages([]);
      
      navigate('/');
    }, 1500);
  };

  const handleImageUpload = (imageUrl: string) => {
    setSelectedImages([...selectedImages, imageUrl]);
  };

  const handleDeleteImage = (imageUrl: string) => {
    setSelectedImages(selectedImages.filter(url => url !== imageUrl));
  };
  
  return (
    <Card className="max-w-3xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>Event Details</CardTitle>
        <CardDescription>
          Select the type of event you want to submit and fill out the form.
          {!user && (
            <div className="mt-2 text-red-500">
              Note: You must be logged in to submit an event. Your draft will not be saved.
            </div>
          )}

          <FormTypeSelector formType={formType} setFormType={setFormType} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReviewNotice />
        
        <CreditRequirementAlert cost={EVENT_SUBMISSION_COST} userCredits={user ? user.credits : 0} />
        
        <VerificationAlert />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <EventFormFields form={form} formType={formType} />
            
            <ImageUploadSection 
              selectedImages={selectedImages}
              onImageUpload={handleImageUpload}
              onImageDelete={handleDeleteImage}
            />
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-travel-500 hover:bg-travel-600"
                disabled={isSubmitting || (user ? user.credits < EVENT_SUBMISSION_COST : false)}
              >
                {isSubmitting ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  `Submit ${formType.charAt(0).toUpperCase() + formType.slice(1)} Package`
                )}
              </Button>
              
              {user && (
                <div className="text-sm text-gray-500 mt-2 text-center">
                  Submitting an event costs {EVENT_SUBMISSION_COST} credits. You currently have {user.credits} credits.
                </div>
              )}
              
              <div className="text-sm text-gray-500 mt-2 text-center">
                Review Process: All submitted events will be reviewed within 24 hours before being published.
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <FormFooter formType={formType} />
    </Card>
  );
};

export default EventFormContainer;
