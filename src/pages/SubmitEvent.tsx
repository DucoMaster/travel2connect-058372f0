
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, MapPin, Ticket, Clock, Image, Users, Upload, Plane, Club, Briefcase } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useUser } from '@/context/UserContext';

// Define validation schema for event submission
const eventFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  location: z.string().min(3, { message: 'Location is required' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number' }),
  date: z.string().min(1, { message: 'Date is required' }),
  capacity: z.coerce.number().min(1, { message: 'Capacity must be at least 1' }).optional(),
  imageUrls: z.array(z.string()).optional(),
  formType: z.enum(['travel', 'events', 'services']),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

type FormType = 'travel' | 'events' | 'services';

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

            <div className="flex flex-wrap gap-3 mt-4">
              <Button 
                onClick={() => setFormType('travel')} 
                variant={formType === 'travel' ? 'default' : 'outline'}
                className={formType === 'travel' ? 'bg-travel-500 hover:bg-travel-600' : ''}
              >
                <Plane className="mr-2 h-4 w-4" />
                Travel
              </Button>
              <Button 
                onClick={() => setFormType('events')} 
                variant={formType === 'events' ? 'default' : 'outline'}
                className={formType === 'events' ? 'bg-travel-500 hover:bg-travel-600' : ''}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Clubs/Events
              </Button>
              <Button 
                onClick={() => setFormType('services')} 
                variant={formType === 'services' ? 'default' : 'outline'}
                className={formType === 'services' ? 'bg-travel-500 hover:bg-travel-600' : ''}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Services
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <Clock className="h-4 w-4" />
              <AlertTitle>Review Process</AlertTitle>
              <AlertDescription>
                All submitted events will be reviewed within 24 hours before being published.
              </AlertDescription>
            </Alert>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input placeholder={
                          formType === 'travel' 
                            ? "Summer Europe Trip 2025" 
                            : formType === 'events' 
                            ? "Beach Party Festival 2025" 
                            : "City Tour Guide Service"
                        } {...field} />
                      </FormControl>
                      <FormDescription>
                        Choose a clear, descriptive title
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={
                            formType === 'travel' 
                              ? "Describe your travel package in detail..." 
                              : formType === 'events' 
                              ? "Describe your event, performers, activities, etc..." 
                              : "Describe the services you're offering..."
                          } 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Include important details like activities, special guests, etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input className="pl-10" placeholder="City, Country" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input 
                              type="date" 
                              className="pl-10" 
                              min={new Date().toISOString().split('T')[0]}
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (in credits)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input 
                              type="number" 
                              min="0" 
                              step="1"
                              className="pl-10" 
                              placeholder="45" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Set a fair price for your {formType === 'travel' ? 'package' : formType === 'events' ? 'event' : 'service'}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity (optional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input 
                              type="number" 
                              min="1" 
                              step="1"
                              className="pl-10" 
                              placeholder="100" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Maximum number of attendees
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
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
                          onClick={() => handleDeleteImage(url)}
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
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Promo Images
                  </Button>
                  <FormDescription className="mt-2">
                    Upload images to showcase your {formType === 'travel' ? 'travel destination' : formType === 'events' ? 'event' : 'service'}
                  </FormDescription>
                </div>
                
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
          <CardFooter className="flex flex-col space-y-4 border-t pt-6">
            <p className="text-sm text-gray-500">
              By submitting this {formType === 'travel' ? 'travel package' : formType === 'events' ? 'event' : 'service'}, you agree to our terms and conditions. 
              All submissions are subject to review before being published within 24 hours.
            </p>
          </CardFooter>
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
