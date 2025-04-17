
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardList } from "lucide-react";
import { useUser } from "@/context/UserContext";

interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal';
  amount: number;
  description: string;
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'earning',
    amount: 50,
    description: 'City Tour Guide',
    date: '2025-04-15'
  },
  {
    id: '2',
    type: 'withdrawal',
    amount: 30,
    description: 'Bank Transfer',
    date: '2025-04-16'
  }
];

export function TransactionHistoryDialog() {
  const { user } = useUser();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          <ClipboardList className="mr-2 h-4 w-4" />
          Transaction History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Transaction History</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="text-right">
                    <span className={transaction.type === 'earning' ? 'text-green-600' : 'text-red-600'}>
                      {transaction.type === 'earning' ? '+' : '-'}{transaction.amount} credits
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {transaction.type === 'earning' ? 'Event Earning' : 'Withdrawal'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}

