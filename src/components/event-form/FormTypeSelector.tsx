
import { Button } from '@/components/ui/button';
import { Plane, Music, Calendar, Briefcase, MapPin, Home } from 'lucide-react';

export type FormType = 'travel' | 'clubs' | 'events' | 'services' | 'tours' | 'rental';

interface FormTypeSelectorProps {
  formType: FormType;
  setFormType: (type: FormType) => void;
}

const FormTypeSelector = ({ formType, setFormType }: FormTypeSelectorProps) => {
  return (
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
        onClick={() => setFormType('clubs')} 
        variant={formType === 'clubs' ? 'default' : 'outline'}
        className={formType === 'clubs' ? 'bg-travel-500 hover:bg-travel-600' : ''}
      >
        <Music className="mr-2 h-4 w-4" />
        Clubs
      </Button>
      <Button 
        onClick={() => setFormType('events')} 
        variant={formType === 'events' ? 'default' : 'outline'}
        className={formType === 'events' ? 'bg-travel-500 hover:bg-travel-600' : ''}
      >
        <Calendar className="mr-2 h-4 w-4" />
        Events
      </Button>
      <Button 
        onClick={() => setFormType('services')} 
        variant={formType === 'services' ? 'default' : 'outline'}
        className={formType === 'services' ? 'bg-travel-500 hover:bg-travel-600' : ''}
      >
        <Briefcase className="mr-2 h-4 w-4" />
        Services
      </Button>
      <Button 
        onClick={() => setFormType('tours')} 
        variant={formType === 'tours' ? 'default' : 'outline'}
        className={formType === 'tours' ? 'bg-travel-500 hover:bg-travel-600' : ''}
      >
        <MapPin className="mr-2 h-4 w-4" />
        Tours
      </Button>
      <Button 
        onClick={() => setFormType('rental')} 
        variant={formType === 'rental' ? 'default' : 'outline'}
        className={formType === 'rental' ? 'bg-travel-500 hover:bg-travel-600' : ''}
      >
        <Home className="mr-2 h-4 w-4" />
        Rentals
      </Button>
    </div>
  );
};

export default FormTypeSelector;
