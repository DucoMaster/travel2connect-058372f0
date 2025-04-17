
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BadgeDollarSign, BadgeEuro, BadgePoundSterling, BadgeJapaneseYen } from 'lucide-react';

export type Currency = 'credits' | 'USD' | 'EUR' | 'GBP' | 'JPY';

interface CurrencySelectorProps {
  value: Currency;
  onChange: (value: Currency) => void;
}

const CurrencySelector = ({ value, onChange }: CurrencySelectorProps) => {
  const getCurrencyIcon = (currency: Currency) => {
    switch (currency) {
      case 'USD':
        return <BadgeDollarSign className="h-4 w-4" />;
      case 'EUR':
        return <BadgeEuro className="h-4 w-4" />;
      case 'GBP':
        return <BadgePoundSterling className="h-4 w-4" />;
      case 'JPY':
        return <BadgeJapaneseYen className="h-4 w-4" />;
      default:
        return <BadgeDollarSign className="h-4 w-4" />;
    }
  };

  return (
    <Select value={value} onValueChange={(val) => onChange(val as Currency)}>
      <SelectTrigger className="w-[100px]">
        <div className="flex items-center gap-2">
          {getCurrencyIcon(value)}
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="credits">
          <div className="flex items-center gap-2">
            <BadgeDollarSign className="h-4 w-4" />
            <span>Credits</span>
          </div>
        </SelectItem>
        <SelectItem value="USD">
          <div className="flex items-center gap-2">
            <BadgeDollarSign className="h-4 w-4" />
            <span>USD</span>
          </div>
        </SelectItem>
        <SelectItem value="EUR">
          <div className="flex items-center gap-2">
            <BadgeEuro className="h-4 w-4" />
            <span>EUR</span>
          </div>
        </SelectItem>
        <SelectItem value="GBP">
          <div className="flex items-center gap-2">
            <BadgePoundSterling className="h-4 w-4" />
            <span>GBP</span>
          </div>
        </SelectItem>
        <SelectItem value="JPY">
          <div className="flex items-center gap-2">
            <BadgeJapaneseYen className="h-4 w-4" />
            <span>JPY</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
