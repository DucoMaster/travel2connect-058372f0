
import { Plus, ShoppingCart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import CurrencySelector, { Currency } from '@/components/event-form/fields/CurrencySelector';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Exchange rates relative to USD (these would come from an API in a real app)
const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.35,
  PHP: 56.42
};

// Gold price per gram in USD
const GOLD_PRICE = 74.8;
// Credits per gram of gold
const CREDITS_PER_GOLD = 100;
// Credit to USD conversion rate
const CREDIT_TO_USD = GOLD_PRICE / CREDITS_PER_GOLD;

interface Transaction {
  id: string;
  type: 'purchase' | 'spend';
  amount: number;
  description: string;
  date: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');

  const convertCreditsToSelectedCurrency = (credits: number): string => {
    const usdAmount = credits * CREDIT_TO_USD;
    const amount = usdAmount * EXCHANGE_RATES[selectedCurrency];
    return amount.toFixed(2);
  };

  // Filter out "Initial credits" transactions and prepare data for the bar chart
  const filteredTransactions = transactions.filter(t => t.description !== "Initial credits");
  const chartData = filteredTransactions.map(transaction => ({
    date: transaction.date,
    amount: transaction.type === 'purchase' ? transaction.amount : -transaction.amount,
    type: transaction.type
  }));

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent credit transactions</CardDescription>
        </div>
        <CurrencySelector value={selectedCurrency} onChange={setSelectedCurrency} />
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 border rounded shadow-lg">
                        <p className="text-sm font-medium">{data.date}</p>
                        <p className="text-sm">
                          {Math.abs(data.amount)} credits
                        </p>
                        <p className="text-sm text-gray-500">
                          {convertCreditsToSelectedCurrency(Math.abs(data.amount))} {selectedCurrency}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="amount">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.amount >= 0 ? '#22c55e' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {filteredTransactions.length > 0 ? (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'purchase' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'purchase' ? (
                      <Plus className="h-4 w-4" />
                    ) : (
                      <ShoppingCart className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${
                    transaction.type === 'purchase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'purchase' ? '+' : '-'}{transaction.amount} credits
                  </div>
                  <div className="text-sm text-gray-500">
                    {convertCreditsToSelectedCurrency(transaction.amount)} {selectedCurrency}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No transactions yet
          </div>
        )}
      </CardContent>
    </Card>
  );
}

