import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PaymentError = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Payment Failed
        </h1>
        <p className="text-muted-foreground">
          We couldn't process your payment. This could be due to insufficient
          funds, an expired card, or a temporary issue with your payment method.
        </p>
        <div className="space-y-4">
          <Button
            onClick={() => navigate("/")}
            variant="default"
            className="w-full"
          >
            Return to Homepage
          </Button>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="w-full"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;
