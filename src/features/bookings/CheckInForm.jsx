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
import useCheckin from "./hooks/useCheckin";

export function CheckInForm() {
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);

  const { isPending, mutate } = useCheckin();
  const {
    data: bookingsData,
    isPending: isBookingPending,
    error: bookingError,
  } = useBooking(bookingId);
  const {
    data: settingsData,
    isPending: isSettingsPending,
    error: settingsError,
  } = useSettings();

  // Sync state with database once data is loaded
  useEffect(() => {
    if (bookingsData) {
      setConfirmPaid(bookingsData.isPaid ?? false);
      setAddBreakfast(bookingsData.hasBreakfast ?? false);
    }
  }, [bookingsData]);

  if (isBookingPending || isSettingsPending)
    return <Spinner className="size-14 text-amber-600 m-auto" />;

  if (bookingError || settingsError) return <p>Error loading data...</p>;

  const {
    cabin_price,
    extras_price,
    num_of_guests,
    hasBreakfast: databaseHasBreakfast,
    guests: { name },
    start_date,
    end_date,
  } = bookingsData;

  const { breakfast_price } = settingsData;

  // Calculate stay duration
  const numNights = Math.ceil(
    (new Date(end_date).getTime() - new Date(start_date).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  // Price Logic
  const optionalBreakfastPrice = breakfast_price * numNights * num_of_guests;
  const baseTotalPrice = cabin_price + extras_price;

  // If they are adding breakfast now (and didn't have it before), add to total
  const finalPrice =
    addBreakfast && !databaseHasBreakfast
      ? baseTotalPrice + optionalBreakfastPrice
      : baseTotalPrice;

  return (
    <FieldGroup>
      {/* 1. Only show "Add Breakfast" if they don't already have it in DB */}
      {!databaseHasBreakfast && (
        <Field orientation="horizontal">
          <Checkbox
            id="addBreakfast"
            checked={addBreakfast}
            onCheckedChange={(checked) => {
              setAddBreakfast(!!checked);
              setConfirmPaid(false); // Reset confirmation because price changed
            }}
          />
          <Label htmlFor="addBreakfast">
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Label>
        </Field>
      )}

      <Field orientation="horizontal">
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          // Disable if already paid in DB AND they haven't added new breakfast
          disabled={confirmPaid && !addBreakfast}
          onCheckedChange={(checked) => setConfirmPaid(!!checked)}
        />
        <FieldLabel htmlFor="confirm">
          I confirm that {name} has paid the total amount of{" "}
          {formatCurrency(finalPrice)}
          {addBreakfast &&
            !databaseHasBreakfast &&
            ` (${formatCurrency(baseTotalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </FieldLabel>
      </Field>

      <div className="flex items-center justify-end mt-4 gap-4">
        <Button
          className="bg-gold-accent text-primary-foreground"
          disabled={!confirmPaid || isPending}
          onClick={() => {
            const updatePayload = {
              status: "checked-in",
              isPaid: true,
              // If they added breakfast just now, update those fields too
              ...(addBreakfast &&
                !databaseHasBreakfast && {
                  hasBreakfast: true,
                  extras_price: extras_price + optionalBreakfastPrice,
                }),
            };

            mutate({
              id: bookingId,
              updatedFields: updatePayload,
            });
          }}
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
