
import { FormType } from './FormTypeSelector';

interface EventFormHeaderProps {
  formType: FormType;
}

const EventFormHeader = ({ formType }: EventFormHeaderProps) => {
  return (
    <section className="mb-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-travel-800">
          Submit Your {formType.charAt(0).toUpperCase() + formType.slice(1)}
        </h1>
        <p className="mt-2 text-travel-600">
          Share your {formType} with our community and start selling tickets
        </p>
      </div>
    </section>
  );
};

export default EventFormHeader;
