
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { FormType } from '@/components/event-form/FormTypeSelector';
import FormTypeSelector from '@/components/event-form/FormTypeSelector';
import ImageUploadSection from '@/components/event-form/ImageUploadSection';
import ReviewNotice from '@/components/event-form/ReviewNotice';
import FormFooter from '@/components/event-form/FormFooter';
import EventFormFields, { EventFormValues, eventFormSchema } from '@/components/event-form/EventFormFields';
import CreditRequirementAlert from '@/components/event-form/CreditRequirementAlert';
import VerificationAlert from '@/components/event-form/VerificationAlert';
import SubmissionSuccessDialog from '@/components/event-form/SubmissionSuccessDialog';
import { useEventSubmission, EVENT_SUBMISSION_COST } from './hooks/useEventSubmission';
import EventFormActions from './EventFormActions';
import { useState } from 'react';

interface EventFormContainerProps {
  formType: FormType;
  setFormType: (type: FormType) => void;
}

const EventFormContainer = ({ formType, setFormType }: EventFormContainerProps) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { isSubmitting, showSuccessDialog, setShowSuccessDialog, handleSubmit: submitEvent, user, submittedData } = useEventSubmission();
  
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
      formType: formType, // Initialize with current formType
    },
  });

  // Update form value when formType changes
  useState(() => {
    form.setValue('formType', formType);
  }, [formType, form]);

  const onSubmit = async (data: EventFormValues) => {
    data.formType = formType;
    await submitEvent(data, selectedImages);
  };

  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
  };

  const handleSubmitAnother = () => {
    setShowSuccessDialog(false);
    form.reset({
      ...form.formState.defaultValues,
      formType: formType,
    });
    setSelectedImages([]);
  };

  const handleImageUpload = (imageUrl: string) => {
    setSelectedImages([...selectedImages, imageUrl]);
  };

  const handleDeleteImage = (imageUrl: string) => {
    setSelectedImages(selectedImages.filter(url => url !== imageUrl));
  };
  
  return (
    <>
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
          <CreditRequirementAlert cost={EVENT_SUBMISSION_COST} userCredits={user?.credits || 0} />
          <VerificationAlert />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <EventFormFields form={form} formType={formType} />
              
              <ImageUploadSection 
                selectedImages={selectedImages}
                onImageUpload={handleImageUpload}
                onImageDelete={handleDeleteImage}
              />
              
              <EventFormActions 
                isSubmitting={isSubmitting}
                userCredits={user?.credits}
                formType={formType}
              />
            </form>
          </Form>
        </CardContent>
        <FormFooter formType={formType} />
      </Card>
      
      <SubmissionSuccessDialog 
        isOpen={showSuccessDialog}
        onClose={handleSuccessDialogClose}
        onSubmitAnother={handleSubmitAnother}
        eventData={submittedData ? {
          ...submittedData,
          imageUrls: selectedImages,
        } : undefined}
      />
    </>
  );
};

export default EventFormContainer;
