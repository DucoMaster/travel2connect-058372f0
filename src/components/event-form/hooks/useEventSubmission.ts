
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { EventFormValues } from '../EventFormFields';
import { FormType } from '../FormTypeSelector';

export const EVENT_SUBMISSION_COST = 10;

export const useEventSubmission = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submittedData, setSubmittedData] = useState<EventFormValues | null>(null);

  const handleSubmit = async (data: EventFormValues, selectedImages: string[]) => {
    setIsSubmitting(true);

    // Set the form type and images
    data.imageUrls = selectedImages;

    // Check if user has enough credits
    if (!user || user.credits < EVENT_SUBMISSION_COST) {
      toast({
        title: "Not enough credits",
        description: `You need ${EVENT_SUBMISSION_COST} credits to submit an event. You currently have ${user?.credits || 0} credits.`,
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Save the data for the success dialog
      setSubmittedData(data);

      // Insert the event package
      const { error } = await supabase
        .from('event_packages')
        .insert({
          title: data.title,
          description: data.description,
          location: data.location,
          price: data.price,
          start_date: data.startDate,
          end_date: data.endDate,
          capacity: data.capacity,
          is_open_for_planning: data.isOpenForPlanning,
          category: data.formType,
          image_urls: selectedImages,
          creator_id: user.id
        });

      if (error) throw error;

      // Update user credits
      const { error: creditError } = await supabase
        .from('profiles')
        .update({ credits: user.credits - EVENT_SUBMISSION_COST })
        .eq('id', user.id);

      if (creditError) throw creditError;

      // Update local user state
      if (user) {
        setUser({
          ...user,
          credits: user.credits - EVENT_SUBMISSION_COST
        });
      }

      setShowSuccessDialog(true);
      toast({
        title: "Credits spent",
        description: `${EVENT_SUBMISSION_COST} credits have been deducted from your account.`,
      });

    } catch (error) {
      console.error('Error submitting event:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your event. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    showSuccessDialog,
    setShowSuccessDialog,
    handleSubmit,
    user,
    submittedData
  };
};
