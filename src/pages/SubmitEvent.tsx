import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { useUser } from '@/context/UserContext';
import FormTypeSelector from '@/components/event-form/FormTypeSelector';
import ImageUploadSection from '@/components/event-form/ImageUploadSection';
import ReviewNotice from '@/components/event-form/ReviewNotice';
import FormFooter from '@/components/event-form/FormFooter';
import EventFormFields, { EventFormValues, FormType } from '@/components/event-form/EventFormFields';
import { eventFormSchema } from '@/components/event-form/EventFormFields';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Cost to submit an event
const EVENT_SUBMISSION_COST = 10;

const SubmitEvent = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formType, setFormType] = useState<FormType>('travel');
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

  const handleImageUpload = () => {
    const placeholderImages = [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81'
    ];
    
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    
    if (!selectedImages.includes(randomImage)) {
      setSelectedImages([...selectedImages, randomImage]);
    }
  };

  const handleDeleteImage = (imageUrl: string) => {
    setSelectedImages(selectedImages.filter(url => url !== imageUrl));
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <section className="mb-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-travel-800">Submit Your Event</h1>
            <p className="mt-2 text-travel-600">
              Share your event with our community and start selling tickets
            </p>
          </div>
        </section>
        
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
            
            <Alert className="mb-6">
              <CreditCard className="h-4 w-4" />
              <AlertDescription>
                Submitting an event costs <strong>{EVENT_SUBMISSION_COST} credits</strong>. You currently have{" "}
                <strong>{user ? user.credits : 0} credits</strong>.
              </AlertDescription>
            </Alert>
            
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
                      "Submit Travel Package"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <FormFooter formType={formType} />
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubmitEvent;
