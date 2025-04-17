
import { useState } from 'react';
import Header from '@/components/Header';
import GuideFilters from '@/components/guides/GuideFilters';
import GuidesList from '@/components/guides/GuidesList';
import GuidesFooter from '@/components/guides/GuidesFooter';
import { useGuideData } from '@/hooks/useGuideData';

const Guides = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedRanking, setSelectedRanking] = useState<string>('all');
  
  const { locations, filteredGuides } = useGuideData(searchTerm, selectedLocation, selectedRanking);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <section className="mb-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-travel-800">Find Local Guides</h1>
            <p className="mt-2 text-travel-600">
              Connect with experienced local guides to enhance your travel experience
            </p>
          </div>
        </section>
        
        <GuideFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedRanking={selectedRanking}
          setSelectedRanking={setSelectedRanking}
          locations={locations}
        />
        
        <section>
          <GuidesList guides={filteredGuides} />
        </section>
      </main>
      
      <GuidesFooter />
    </div>
  );
};

export default Guides;
