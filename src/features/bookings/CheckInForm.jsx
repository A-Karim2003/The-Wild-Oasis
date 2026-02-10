"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useBooking from "./hooks/useBooking";
import useSettings from "../settings/hooks/useSettings";
import { formatCurrency } from "@/utils/helpers";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export function CheckInForm() {
  const navigate = useNavigate();
  const [breakfastAdded, setBreakfastAdded] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { bookingId } = useParams();

  const {
    data: bookingsData,
    isPending: isBookingPending,
    BookingError,
  } = useBooking(bookingId);

  const {
    data: settingsData,
    isPending: isSettingsPending,
    settingsError,
  } = useSettings();

  useEffect(() => {
    if (bookingsData) {
      setConfirmPaid(bookingsData.isPaid);
    }
  }, [bookingsData.isPaid]);

  if (isBookingPending || isSettingsPending)
    return <Spinner className="size-14 text-amber-600 m-auto" />;

  if (BookingError || settingsError) return <p>{error.message}</p>;

  const {
    cabin_price,
    extras_price,
    guests: { name },
  } = bookingsData;
  const { breakfast_price, isPaid } = settingsData;

  let totalPrice = cabin_price + extras_price;

  return (
    <FieldGroup>
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox
            id="addBreakfast-checkbox"
            name="terms-checkbox"
            onCheckedChange={(isChecked) => setBreakfastAdded(isChecked)}
          />
          <Label htmlFor="addBreakfast-checkbox">
            Want to add breakfast for {formatCurrency(breakfast_price)}
          </Label>
        </Field>
      </FieldLabel>

      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox
            id="terms-checkbox-2"
            name="terms-checkbox-2"
            onCheckedChange={(isChecked) => setConfirmPaid(isChecked)}
            disabled={isPaid || confirmPaid}
            checked={confirmPaid}
          />
          <FieldLabel htmlFor="terms-checkbox-2">
            {breakfastAdded &&
              `I confirm that  ${name} has paid the total amount of ${formatCurrency(totalPrice + breakfast_price)} (${formatCurrency(totalPrice)} + ${formatCurrency(breakfast_price)})`}

            {!breakfastAdded &&
              `I confirm that ${name} has paid the total amount of ${formatCurrency(totalPrice)}`}
          </FieldLabel>
        </Field>
      </FieldLabel>

      <div className="flex items-center justify-end mt-4 gap-4">
        <Button
          className="bg-gold-accent text-primary-foreground"
          disabled={!confirmPaid}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </FieldGroup>
  );
}
