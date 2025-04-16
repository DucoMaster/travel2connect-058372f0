
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRole } from '@/types';

// Mock function to simulate AI image processing
const generateAIImages = async (originalImage: string) => {
  // In real app, this would call an AI API
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return 3 fake AI-generated image URLs
  return [
    'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
  ];
};

// Mock function to simulate AI description generation
const generateAIDescription = async (name: string, location: string, answers: string[]) => {
  // In real app, this would call an AI API
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return a generated description based on user role
  const descriptions = {
    traveler: `${name} is an enthusiastic traveler based in ${location}, with a passion for exploring new cultures and experiences. Always seeking authentic connections with local guides and unique opportunities to make each journey memorable.`,
    guide: `${name} is a knowledgeable local guide based in ${location} with deep expertise in the region's history, culture, and hidden gems. Specializing in creating personalized experiences that showcase the authentic side of destinations.`,
    agent: `${name} is a professional travel agent from ${location}, dedicated to crafting exceptional travel experiences. With a keen eye for detail and in-depth knowledge of global destinations, ${name} creates perfectly tailored packages for discerning travelers.`,
    venue: `${name} represents a premier entertainment venue in ${location}, offering unique experiences for visitors and locals alike. The venue is known for its authentic atmosphere and commitment to showcasing local culture and talent.`
  };
  
  return descriptions[answers[0] as keyof typeof descriptions] || descriptions.traveler;
};

// Role-specific questions for profile completion
const roleQuestions = {
  traveler: [
    {
      question: "What type of traveler are you?",
      options: ["Adventure seeker", "Cultural explorer", "Relaxation enthusiast", "Foodie traveler", "Budget backpacker"]
    },
    {
      question: "What's your preferred travel duration?",
      options: ["Weekend trips", "1-2 week vacations", "Extended travel (1+ months)", "Spontaneous getaways", "Seasonal travel"]
    },
    {
      question: "How do you prefer to travel?",
      options: ["Solo", "With partner", "With family", "With friends", "In tour groups"]
    },
    {
      question: "What do you value most in a destination?",
      options: ["Nature & landscapes", "Local cuisine", "Historical sites", "Cultural experiences", "Nightlife & entertainment"]
    },
    {
      question: "How do you discover new destinations?",
      options: ["Social media", "Friend recommendations", "Travel blogs", "Travel agencies", "Spontaneous decisions"]
    }
  ],
  guide: [
    {
      question: "What type of guide are you?",
      options: ["Adventure guide", "Cultural expert", "Food & cuisine specialist", "Historical guide", "Nature guide"]
    },
    {
      question: "What languages do you speak fluently?",
      options: ["English only", "English + 1 other language", "English + 2 other languages", "3+ languages", "Local dialects"]
    },
    {
      question: "How long have you been guiding?",
      options: ["New to guiding", "1-2 years", "3-5 years", "5-10 years", "10+ years experience"]
    },
    {
      question: "What size groups do you prefer?",
      options: ["Individual travelers", "Couples or pairs", "Small groups (3-5)", "Medium groups (6-10)", "Large groups (10+)"]
    },
    {
      question: "What's your guiding style?",
      options: ["Informative & educational", "Fun & entertaining", "Relaxed & adaptable", "Adventure & excitement", "Off-the-beaten-path"]
    }
  ],
  agent: [
    {
      question: "What type of travel do you specialize in?",
      options: ["Luxury travel", "Adventure travel", "Cultural tours", "Budget-friendly packages", "Customized itineraries"]
    },
    {
      question: "What regions do you focus on?",
      options: ["Local/domestic only", "Continental focus", "Global destinations", "Off-the-beaten-path", "Urban experiences"]
    },
    {
      question: "What's your typical client base?",
      options: ["Solo travelers", "Couples", "Families", "Groups", "Corporate clients"]
    },
    {
      question: "How long have you been in the travel industry?",
      options: ["New to the industry", "1-3 years", "4-7 years", "8-15 years", "15+ years"]
    },
    {
      question: "What sets your travel packages apart?",
      options: ["Unique experiences", "Great value", "Luxurious touches", "Local connections", "Environmental sustainability"]
    }
  ],
  venue: [
    {
      question: "What type of venue do you represent?",
      options: ["Restaurant/Dining", "Nightclub/Bar", "Cultural venue", "Entertainment complex", "Multi-purpose venue"]
    },
    {
      question: "What's your venue's capacity?",
      options: ["Intimate (under 50)", "Small (50-100)", "Medium (100-250)", "Large (250-500)", "Very large (500+)"]
    },
    {
      question: "What kind of events do you typically host?",
      options: ["Live music", "Cultural performances", "Dining experiences", "Nightlife & dancing", "Mixed events"]
    },
    {
      question: "What's your venue's atmosphere?",
      options: ["Upscale & luxurious", "Casual & relaxed", "Energetic & lively", "Authentic & local", "Themed experience"]
    },
    {
      question: "How long has your venue been operating?",
      options: ["New venue", "1-2 years", "3-5 years", "5-10 years", "Established 10+ years"]
    }
  ]
};

const CreateProfile = () => {
  const { user, setUser } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [aiImages, setAiImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState<string[]>(['', '', '', '', '']);
  const [aiDescription, setAiDescription] = useState('');
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleSpecificQuestions = user?.role ? roleQuestions[user.role] : roleQuestions.traveler;

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

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...questionAnswers];
    newAnswers[index] = value;
    setQuestionAnswers(newAnswers);
  };

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

  const handleSubmit = async () => {
    if (!name || !location || !selectedImage || !editedDescription) {
      toast({
        title: 'Incomplete profile',
        description: 'Please complete all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // In a real app, this would call an API to save the profile
      // For now, we'll just update the local user state
      if (user) {
        const updatedUser = {
          ...user,
          name,
          location,
          profileImage: selectedImage,
          description: editedDescription,
        };
        setUser(updatedUser);
        localStorage.setItem('traveler-user', JSON.stringify(updatedUser));
      }
      
      toast({
        title: 'Profile created',
        description: 'Your profile has been created successfully!',
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: 'Profile creation failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-travel-50 to-travel-100 p-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-travel-700">Create Your Profile</h1>
          <p className="text-travel-600">Let's set up your TravelConnect presence</p>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Tell us about yourself</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location (City, Country)</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="New York, USA"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-travel-500 hover:bg-travel-600"
                onClick={() => setStep(2)}
                disabled={!name || !location}
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
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
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button 
                className="bg-travel-500 hover:bg-travel-600"
                onClick={() => setStep(3)}
                disabled={!selectedImage && !uploadedImage}
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>About You</CardTitle>
              <CardDescription>Help us understand your preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {roleSpecificQuestions.map((q, index) => (
                  <div key={index} className="space-y-2">
                    <Label>{q.question}</Label>
                    <RadioGroup 
                      value={questionAnswers[index]} 
                      onValueChange={(value) => handleAnswerChange(index, value)}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value={option} 
                              id={`question-${index}-option-${optIndex}`} 
                            />
                            <Label 
                              htmlFor={`question-${index}-option-${optIndex}`}
                              className="cursor-pointer"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-row justify-between">
              <Button 
                variant="outline"
                onClick={() => setStep(2)}
              >
                Back
              </Button>
              <Button 
                className="bg-travel-500 hover:bg-travel-600"
                onClick={() => {
                  // Ensure at least 3 questions are answered
                  const answeredCount = questionAnswers.filter(a => a !== '').length;
                  if (answeredCount < 3) {
                    toast({
                      title: 'More information needed',
                      description: 'Please answer at least 3 questions.',
                      variant: 'destructive',
                    });
                    return;
                  }
                  setStep(4);
                }}
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 4 && (
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
                onClick={() => setStep(3)}
              >
                Back
              </Button>
              <Button 
                className="bg-travel-500 hover:bg-travel-600"
                onClick={handleSubmit}
                disabled={!editedDescription || isSubmitting}
              >
                {isSubmitting ? 'Completing Setup...' : 'Complete Setup'}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreateProfile;
