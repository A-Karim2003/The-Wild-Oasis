import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useUpdateSettings } from "./hooks/useUpdateSettings";

// Define your schema to match form fields
const settingsSchema = z
  .object({
    min_booking_length: z.coerce.number().min(1, "Must be at least 1 night"),
    max_booking_length: z.coerce.number().max(90, "Cannot exceed 90 days"),
    max_guest_per_booking: z.coerce
      .number()
      .max(12, "Number of guests must not exceed 12"),
    breakfast_price: z.coerce.number().min(1, "Price cannot be less than 1"),
  })
  // returns true && means validation passed else show error
  .refine((data) => data.max_booking_length >= data.min_booking_length, {
    message: "Maximum nights must be greater than minimum nights",
    path: ["max_booking_length"], // field that will display error message
  });

export default function SettingsForm({ settings }) {
  const updateSettingsMutation = useUpdateSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingsSchema), // links the schema to form
    defaultValues: settings,
  });

  function onSubmit(data) {
    updateSettingsMutation.mutate(data);
  }

  return (
    <Card className="p-4 max-w-260">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Field className="flex flex-row items-center gap-4">
          <FieldLabel className="max-w-60 tracking-wider leading-5">
            Minimum nights/booking
          </FieldLabel>
          <div className="flex flex-col">
            <Input
              className="max-w-75"
              type="number"
              {...register("min_booking_length")}
            />
            {errors.min_booking_length && (
              <span className="text-red-500 text-sm mt-1">
                {errors.min_booking_length.message}
              </span>
            )}
          </div>
        </Field>

        <Field className="flex flex-row items-center gap-4">
          <FieldLabel className="max-w-60 tracking-wider leading-5">
            Maximum nights/booking
          </FieldLabel>
          <div className="flex flex-col">
            <Input
              className="max-w-75"
              type="number"
              {...register("max_booking_length")}
            />
            {errors.max_booking_length && (
              <span className="text-red-500 text-sm mt-1">
                {errors.max_booking_length.message}
              </span>
            )}
          </div>
        </Field>

        <Field className="flex flex-row items-center gap-4">
          <FieldLabel className="max-w-60 tracking-wider leading-5">
            Maximum guests/booking
          </FieldLabel>
          <div className="flex flex-col">
            <Input
              className="max-w-75"
              type="number"
              {...register("max_guest_per_booking")}
            />
            {errors.max_guest_per_booking && (
              <span className="text-red-500 text-sm mt-1">
                {errors.max_guest_per_booking.message}
              </span>
            )}
          </div>
        </Field>

        <Field className="flex flex-row items-center gap-4">
          <FieldLabel className="max-w-60 tracking-wider leading-5">
            Breakfast price
          </FieldLabel>
          <div className="flex flex-col">
            <Input
              className="max-w-75"
              type="number"
              {...register("breakfast_price")}
            />
            {errors.breakfast_price && (
              <span className="text-red-500 text-sm mt-1">
                {errors.breakfast_price.message}
              </span>
            )}
          </div>
        </Field>

        <Button
          variant="outline"
          className="mr-auto py-2 px-8 border-gold-accent hover:border-slate-200 hover:bg-gold-accent hover:text-primary mt-6"
        >
          Update Settings
        </Button>
      </form>
    </Card>
  );
}
