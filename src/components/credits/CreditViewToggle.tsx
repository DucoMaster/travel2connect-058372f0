
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type CreditView = 'credits' | 'cash';

interface CreditViewToggleProps {
  view: CreditView;
  onViewChange: (view: CreditView) => void;
}

export default function CreditViewToggle({ view, onViewChange }: CreditViewToggleProps) {
  return (
    <div className="mb-4">
      <RadioGroup
        value={view}
        onValueChange={(value) => onViewChange(value as CreditView)}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="credits" id="credits" />
          <Label htmlFor="credits">Credits</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cash" id="cash" />
          <Label htmlFor="cash">Cash Value</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
