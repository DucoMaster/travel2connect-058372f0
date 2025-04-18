
import React from 'react';
import { Card } from '@/components/ui/card';

interface AboutSectionProps {
  description: string;
}

const AboutSection = ({ description }: AboutSectionProps) => {
  return (
    <Card className="p-4">
      <h2 className="font-semibold text-lg mb-3">About This Experience</h2>
      <p className="text-gray-600 whitespace-pre-line">{description}</p>
    </Card>
  );
};

export default AboutSection;
