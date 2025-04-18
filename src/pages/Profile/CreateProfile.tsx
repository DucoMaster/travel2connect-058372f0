
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Import step components
import BasicInformationStep from './components/BasicInformationStep';
import ProfileImageStep from './components/ProfileImageStep';
import QuestionsStep from './components/QuestionsStep';
import DescriptionStep from './components/DescriptionStep';

const CreateProfile = () => {
  const { user, setUser } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState(user?.name || '');
  const [location, setLocation] = useState(user?.location || '');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(user?.profileImage || null);
  const [questionAnswers, setQuestionAnswers] = useState<string[]>(['', '', '', '', '']);
  const [aiDescription, setAiDescription] = useState('');
  const [editedDescription, setEditedDescription] = useState(user?.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // More detailed validation with specific error messages
    const errors: string[] = [];

    if (!name) errors.push("Name is required");
    if (!location) errors.push("Location is required");
    if (!selectedImage) errors.push("Please select a profile image");
    if (!editedDescription) errors.push("Profile description is required");
    
    // Check if enough role-specific questions are answered
    const roleSpecificQuestions = user?.role ? 5 : 0; // Each role has 5 questions
    const unansweredQuestions = questionAnswers.filter(a => !a).length;
    if (unansweredQuestions > 2) {
      errors.push(`Please answer at least ${roleSpecificQuestions - 2} questions`);
    }

    if (errors.length > 0) {
      toast({
        title: 'Incomplete profile',
        description: errors.map(e => `• ${e}`).join('\n'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (user) {
        // Update the profile in Supabase
        const { error } = await supabase
          .from('profiles')
          .update({
            name,
            location,
            profile_image: selectedImage,
            description: editedDescription,
            specialties: questionAnswers.filter(a => a)
          })
          .eq('id', user.id);
        
        if (error) throw error;
        
        // Update local user state
        const updatedUser = {
          ...user,
          name,
          location,
          profileImage: selectedImage,
          description: editedDescription,
          specialties: questionAnswers.filter(a => a)
        };
        
        setUser(updatedUser);
      }
      
      toast({
        title: 'Profile created',
        description: 'Your profile has been created successfully!',
      });
      
      navigate('/');
    } catch (error) {
      console.error('Profile update error:', error);
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
          <BasicInformationStep
            name={name}
            setName={setName}
            location={location}
            setLocation={setLocation}
            onContinue={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <ProfileImageStep 
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            onBack={() => setStep(1)}
            onContinue={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <QuestionsStep 
            userRole={user?.role}
            questionAnswers={questionAnswers}
            setQuestionAnswers={setQuestionAnswers}
            onBack={() => setStep(2)}
            onContinue={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <DescriptionStep 
            name={name}
            location={location}
            questionAnswers={questionAnswers}
            aiDescription={aiDescription}
            setAiDescription={setAiDescription}
            editedDescription={editedDescription}
            setEditedDescription={setEditedDescription}
            isSubmitting={isSubmitting}
            onBack={() => setStep(3)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default CreateProfile;
