
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Coins, TrendingUp, TrendingDown } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Mock data for gold prices (in the real app, this would come from an API)
const mockGoldPriceData = [
  { date: 'Jan', price: 65.4 },
  { date: 'Feb', price: 67.2 },
  { date: 'Mar', price: 68.8 },
  { date: 'Apr', price: 71.3 },
  { date: 'May', price: 69.5 },
  { date: 'Jun', price: 72.1 },
  { date: 'Jul', price: 74.8 }
];

export default function GoldPriceTracker() {
  const [currentGoldPrice, setCurrentGoldPrice] = useState(74.8);
  const [priceChange, setPriceChange] = useState(2.7);
  
  const config = {
    price: {
      label: 'Price',
      color: '#f59e0b',
    },
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-amber-500" />
          Gold Price Tracker
        </CardTitle>
        <CardDescription>
          Current price per gram (USD)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl font-bold">${currentGoldPrice.toFixed(2)}</div>
          <div className={`flex items-center ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {priceChange >= 0 ? (
              <TrendingUp className="mr-1 h-4 w-4" />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4" />
            )}
            <span>{priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%</span>
          </div>
        </div>
        
        <div className="h-[200px] w-full">
          <ChartContainer config={config}>
            <LineChart data={mockGoldPriceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltipContent
                        className="border-none bg-background/80 backdrop-blur-sm"
                        indicator="dot"
                      >
                        {payload.map((entry) => (
                          <div key={entry.dataKey} className="flex flex-col gap-0.5">
                            <span className="text-xs text-muted-foreground">
                              {entry.payload.date}
                            </span>
                            <span className="font-bold">${entry.value}</span>
                          </div>
                        ))}
                      </ChartTooltipContent>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                name="price"
                stroke="var(--color-price, #f59e0b)"
                strokeWidth={2}
                dot={{ r: 4, fill: "var(--color-price, #f59e0b)" }}
                activeDot={{ r: 6, fill: "var(--color-price, #f59e0b)" }}
              />
            </LineChart>
          </ChartContainer>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 text-center">
          100 Credits = 1 gram of gold (${currentGoldPrice.toFixed(2)})
        </div>
      </CardContent>
    </Card>
  );
}
