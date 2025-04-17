
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormType } from '@/components/event-form/FormTypeSelector';
import EventFormContainer from '@/components/event-form/EventFormContainer';
import EventFormHeader from '@/components/event-form/EventFormHeader';

const SubmitEvent = () => {
  const [formType, setFormType] = useState<FormType>('travel');
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <EventFormHeader formType={formType} />
        <EventFormContainer formType={formType} setFormType={setFormType} />
      </main>
      
      <Footer />
    </div>
  );
};

export default SubmitEvent;
