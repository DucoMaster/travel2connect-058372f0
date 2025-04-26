import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  ClipboardList,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useUserPayments } from "@/actions/payment-queries";
import { format } from "date-fns";

interface Transaction {
  id: number;
  created_at: string;
  user_id: string;
  credits: number;
  payment_intent: string;
}

export function TransactionHistoryDialog() {
  const { user } = useUser();
  const { data, isLoading } = useUserPayments(user?.id);

  if (isLoading) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-4">
            <ClipboardList className="mr-2 h-4 w-4" />
            Transaction History
          </Button>
        </DialogTrigger>
        <DialogContent>
          <p>Loading transactions...</p>
        </DialogContent>
      </Dialog>
    );
  }

  const transactions = data || [];

  // Calculate totals from actual transaction data
  const totalEarnings = transactions.reduce(
    (sum, t) => sum + (t.credits > 0 ? t.credits : 0),
    0
  );
  const totalSpending = transactions.reduce(
    (sum, t) => sum + (t.credits < 0 ? Math.abs(t.credits) : 0),
    0
  );
  const availableCredits = totalEarnings - totalSpending;

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

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Earnings
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    +{totalEarnings}
                  </p>
                </div>
                <ArrowUpCircle className="h-4 w-4 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Spending
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    -{totalSpending}
                  </p>
                </div>
                <ArrowDownCircle className="h-4 w-4 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Available Credits
                  </p>
                  <p className="text-2xl font-bold">{availableCredits}</p>
                </div>
                <Wallet className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(new Date(transaction.created_at), "MM/dd/yyyy")}
                  </TableCell>
                  <TableCell>
                    {transaction.payment_intent.slice(0, 12)}...
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        transaction.credits >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {transaction.credits >= 0 ? "+" : "-"}
                      {Math.abs(transaction.credits)} credits
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {transaction.credits >= 0 ? "Purchase" : "Usage"}
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
