
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Euro, PoundSterling, Yen } from 'lucide-react';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';

interface CurrencySelectorProps {
  value: Currency;
  onChange: (value: Currency) => void;
}

const CurrencySelector = ({ value, onChange }: CurrencySelectorProps) => {
  const getCurrencyIcon = (currency: Currency) => {
    switch (currency) {
      case 'USD':
        return <DollarSign className="h-4 w-4" />;
      case 'EUR':
        return <Euro className="h-4 w-4" />;
      case 'GBP':
        return <PoundSterling className="h-4 w-4" />;
      case 'JPY':
        return <Yen className="h-4 w-4" />;
    }
  };

  return (
    <Select value={value} onValueChange={(val) => onChange(val as Currency)}>
      <SelectTrigger className="w-[80px]">
        <div className="flex items-center gap-2">
          {getCurrencyIcon(value)}
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USD">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>USD</span>
          </div>
        </SelectItem>
        <SelectItem value="EUR">
          <div className="flex items-center gap-2">
            <Euro className="h-4 w-4" />
            <span>EUR</span>
          </div>
        </SelectItem>
        <SelectItem value="GBP">
          <div className="flex items-center gap-2">
            <PoundSterling className="h-4 w-4" />
            <span>GBP</span>
          </div>
        </SelectItem>
        <SelectItem value="JPY">
          <div className="flex items-center gap-2">
            <Yen className="h-4 w-4" />
            <span>JPY</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
