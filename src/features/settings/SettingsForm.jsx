import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

// Define your schema to match form fields
const settingsSchema = z.object({
  min_booking_length: z.number().min(1, "Must be at least 1 night"),
  max_booking_length: z.number().max(90, "Cannot exceed 90 days"),
  max_guest_per_booking: z
    .number()
    .max(12, "Number of guests must not exceed 12"),
  breakfast_price: z.number().nonnegative(),
});

export default function SettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingsSchema), // links the schema to form
  });

  function onSubmit(data) {}

  return (
    <Card className="p-4 max-w-260">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Field className="flex flex-row items-center gap-4">
          <FieldLabel className="max-w-60 tracking-wider leading-5">
            Minimum nights/booking
          </FieldLabel>
          <Input
            className="max-w-75"
            type="number"
            {...register("min_booking_length")}
          />
        </Field>

        <Field className="flex flex-row items-center gap-4">
          <FieldLabel className="max-w-60 tracking-wider leading-5">
            Maximum nights/booking
          </FieldLabel>
          <Input
            className="max-w-75"
            type="number"
            {...register("max_booking_length")}
          />
        </Field>

        <Field className="flex flex-row items-center gap-4">
          <FieldLabel className="max-w-60 tracking-wider leading-5">
            Maximum guests/booking
          </FieldLabel>
          <Input
            className="max-w-75"
            type="number"
            {...register("max_guest_per_booking")}
          />
        </Field>

        <Field className="flex flex-row items-center gap-4">
          <FieldLabel className="max-w-60 tracking-wider leading-5">
            Breakfast price
          </FieldLabel>
          <Input
            className="max-w-75"
            type="number"
            {...register("breakfast_price")}
          />
        </Field>

        <Button
          variant="outline"
          className="mr-auto py-2 px-8 border-gold-accent hover:border-slate-200 hover:bg-gold-accent hover:text-primary mt-6"
        >
          Add new cabin
        </Button>
      </form>
    </Card>
  );
}
