
import { User } from '@/types';
import GuideCard from './GuideCard';

interface GuidesListProps {
  guides: (User & { packages: any[] })[];
}

const GuidesList = ({ guides }: GuidesListProps) => {
  if (guides.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-medium text-gray-900">No guides found</h3>
        <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guides.map((guide) => (
        <GuideCard key={guide.id} guide={guide} />
      ))}
    </div>
  );
};

export default GuidesList;
