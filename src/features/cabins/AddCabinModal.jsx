import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export default function AddCabinModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create A New Cabin</DialogTitle>
      </DialogHeader>
      <form
        id="cabin-form"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field>
          <FieldLabel htmlFor="name">Cabin name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Enter cabin name"
            {...register("cabinName", {
              required: "Please Enter cabin name",
            })}
          />
          {errors.cabinName && (
            <span className="text-sm text-red-500 ml-1">
              {errors.cabinName?.message}
            </span>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="maxCapacity">Maximum capacity</FieldLabel>
          <Input
            id="maxCapacity"
            type="number"
            placeholder="Enter cabin max capacity"
            {...register("cabinCapacity", {
              required: "Please enter cabin capacity",
            })}
          />
          {errors.cabinName && (
            <span className="text-sm text-red-500 ml-1">
              {errors.cabinName?.message}
            </span>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="regularPrice">Regular price</FieldLabel>
          <Input
            id="regularPrice"
            type="number"
            placeholder="Enter cabin price"
            {...register("cabinPrice", {
              required: "Please enter cabin price",
            })}
          />

          {errors.cabinName && (
            <span className="text-sm text-red-500 ml-1">
              {errors.cabinPrice?.message}
            </span>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="discount">Discount</FieldLabel>
          <Input
            id="discount"
            type="number"
            placeholder="Enter cabin discount"
            {...register("cabinDiscount")}
          />
        </Field>

        <Field className="md:col-span-2">
          <FieldLabel htmlFor="description">Description for website</FieldLabel>
          <Textarea
            id="description"
            placeholder="Write a description for a cabin."
            {...register("cabinDescription", {
              required: "Please enter a cabin description",
            })}
          />
          {errors.cabinName && (
            <span className="text-sm text-red-500 ml-1">
              {errors.cabinName?.message}
            </span>
          )}
        </Field>
      </form>
      <DialogFooter className="sm:justify-end">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button
          variant="secondary"
          type="submit"
          className={"bg-gold-bright"}
          form="cabin-form"
        >
          Create new cabin
        </Button>
      </DialogFooter>
    </>
  );
}
