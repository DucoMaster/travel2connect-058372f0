
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { useUser } from '@/context/UserContext';
import FormTypeSelector from '@/components/event-form/FormTypeSelector';
import ImageUploadSection from '@/components/event-form/ImageUploadSection';
import ReviewNotice from '@/components/event-form/ReviewNotice';
import FormFooter from '@/components/event-form/FormFooter';
import EventFormFields, { eventFormSchema, EventFormValues, FormType } from '@/components/event-form/EventFormFields';

const SubmitEvent = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formType, setFormType] = useState<FormType>('travel');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  
  // Initialize form with react-hook-form
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      price: 0,
      date: '',
      capacity: 1,
      imageUrls: [],
      formType: 'travel',
    },
  });
  
  // Handle form submission
  const onSubmit = (data: EventFormValues) => {
    setIsSubmitting(true);
    
    // Update the form type based on the selected type
    data.formType = formType;
    data.imageUrls = selectedImages;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Event submitted:', data);
      
      toast({
        title: "Event submitted successfully!",
        description: "Your event is pending review and will be published within 24 hours.",
      });
      
      setIsSubmitting(false);
      
      // Reset form
      form.reset();
      setSelectedImages([]);
      
      // Redirect to home page after successful submission
      navigate('/');
    }, 1500);
  };

  // Handle image upload (simulated)
  const handleImageUpload = () => {
    // Simulating image upload by adding a placeholder URL
    const placeholderImages = [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81'
    ];
    
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    
    // Add the image if it's not already in the array
    if (!selectedImages.includes(randomImage)) {
      setSelectedImages([...selectedImages, randomImage]);
    }
  };

  // Delete an image from the selected images
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
            </CardDescription>

            <FormTypeSelector formType={formType} setFormType={setFormType} />
          </CardHeader>
          <CardContent>
            <ReviewNotice />
            
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Upload className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit {formType === 'travel' ? 'Travel Package' : formType === 'events' ? 'Event' : 'Service'}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <FormFooter formType={formType} />
        </Card>
      </main>
      
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <div className="bg-travel-500 text-white p-1 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="font-bold text-travel-700">TravelConnect</span>
            </div>
            <div className="text-center sm:text-right text-sm text-gray-500">
              <p>© 2025 TravelConnect. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SubmitEvent;
