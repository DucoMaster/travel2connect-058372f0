import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const EventCheckIn = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("event");
  const eventTitle = searchParams.get("title");
  const attendeeId = searchParams.get("attendee");
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");

  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validStartDate = new Date(
      startDate!.replace(" 00:00", "Z")
    ).toISOString();
    const validEndDate = new Date(
      endDate!.replace(" 00:00", "Z")
    ).toISOString();

    try {
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("id, email")
        .eq("email", email)
        .eq("id", attendeeId)
        .single();

      if (userError || !userData) throw new Error("User not found.");

      const userId = userData.id;

      // 2. Check if user has a booking for this event
      const { data: bookingData, error: bookingError } = await supabase
        .from("event_package_booking")
        .select("id")
        .eq("user_id", userId)
        .eq("event_package_id", eventId);

      if (bookingError || !bookingData)
        throw new Error("No booking found for this user.");

      // 3. Mark attendance
      const { error: insertError } = await supabase
        .from("event_attendance")
        .insert({
          user_id: userId,
          event_id: eventId,
          event_start_date: validStartDate,
          event_end_date: validEndDate,
        });

      if (insertError) throw insertError;

      toast({
        title: "Attendance Marked",
        description: `Check-in successful for ${email}.`,
      });
      setEmail("");
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err.message || "Unable to mark attendance.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
        <h1 className="text-xl font-semibold mb-4">Event Check-In</h1>
        <p className="mb-4 text-sm text-gray-500">
          Checking in for event title: <strong>{eventTitle}</strong>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" disabled={!email} className="w-full">
            Check In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EventCheckIn;
