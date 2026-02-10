import BookingDetails from "./BookingDetails";
import { CheckInForm } from "./CheckInForm";

export default function CheckInBooking() {
  return (
    <BookingDetails showActions={false}>
      <CheckInForm />
    </BookingDetails>
  );
}
