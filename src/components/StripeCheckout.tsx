import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, CreditCard, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/integrations/supabase/client";

interface PriceTier {
  id: string;
  credits: number;
  price: number;
  popular?: boolean;
}

const priceTiers: PriceTier[] = [
  { id: "tier1", credits: 50, price: 50 },
  { id: "tier2", credits: 100, price: 100, popular: true },
  { id: "tier3", credits: 200, price: 200 },
  { id: "tier4", credits: 500, price: 500 },
];

export default function StripeCheckout() {
  const { user } = useUser();
  console.log("This is user ", user);
  const [selectedTier, setSelectedTier] = useState<PriceTier | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!selectedTier) {
      toast({
        title: "No tier selected",
        description: "Please select a credit package to purchase.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Await the result of getSession() to access the session data
      const sessionResult = await supabase.auth.getSession();

      // Check if session data exists and if there's a valid access_token
      const accessToken = sessionResult.data?.session?.access_token;

      if (!accessToken) {
        throw new Error("User is not authenticated.");
      }

      // Construct the products array
      const products = [
        {
          name: selectedTier.id, // Use the selected tier name here
          price: selectedTier.price * 100, // Convert price to cents (Stripe expects amounts in cents)
          quantity: 1, // You can modify this based on the selected quantity
        },
      ];

      const response = await fetch(
        "https://lmwbccidogskuqsmqgtp.supabase.co/functions/v1/stripe-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            originUrl: window.location.origin, // or a custom URL if needed
            products, // Include the products array in the payload
            userId: user?.id || 0,
            credits: selectedTier?.price || 0,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        throw new Error("Stripe session URL missing.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment error",
        description: "There was an error initiating the payment process.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Login Required</CardTitle>
          <CardDescription>Please login to purchase credits</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => navigate("/login")} className="w-full">
            Login to Continue
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Credits</CardTitle>
        <CardDescription>Select a credit package to purchase</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {priceTiers.map((tier) => (
            <div
              key={tier.id}
              className={`border rounded-lg p-4 relative transition-all cursor-pointer ${
                selectedTier?.id === tier.id
                  ? "border-travel-500 bg-travel-50 ring-2 ring-travel-300"
                  : "hover:border-travel-200 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedTier(tier)}
            >
              {tier.popular && (
                <div className="absolute -top-3 right-4 bg-travel-500 text-white text-xs py-1 px-3 rounded-full">
                  Most Popular
                </div>
              )}
              {selectedTier?.id === tier.id && (
                <div className="absolute top-2 right-2 text-travel-500">
                  <Check className="h-5 w-5" />
                </div>
              )}
              <div className="text-2xl font-bold text-travel-700">
                {tier.credits} Credits
              </div>
              <div className="text-gray-600 mt-1">${tier.price} USD</div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleCheckout}
          disabled={isLoading || !selectedTier}
          className="w-full bg-travel-500 hover:bg-travel-600"
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Checkout with Stripe
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
