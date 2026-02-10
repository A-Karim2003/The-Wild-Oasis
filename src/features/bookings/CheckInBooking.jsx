import { Button } from "@/components/ui/button";
import BookingDetails from "./BookingDetails";
import { CheckInForm } from "./CheckInForm";
import { useParams } from "react-router";

export default function CheckInBooking() {
  const { bookingId } = useParams();
  return (
    <BookingDetails showActions={false}>
      <CheckInForm />

      <div className="flex items-center justify-end mt-4 gap-4">
        <Button className="bg-gold-accent text-primary-foreground">
          Check in booking #{bookingId}
        </Button>
        <Button variant="outline">Back</Button>
      </div>
    </BookingDetails>
  );
}
