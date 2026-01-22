import { useTheme } from "@/components/context/ThemeProvider";
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
import { createCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function AddCabinModal() {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      cabinName: "Mountain View",
      cabinCapacity: 4,
      cabinPrice: 150,
      cabinDiscount: 0,
      cabinDescription: "A cozy cabin in the woods.",
    },
  });

  function onSubmit(data) {
    console.log(data);
    reset({
      cabinName: "",
      cabinCapacity: "",
      cabinPrice: "",
      cabinDiscount: 0,
      cabinDescription: "",
    });
  }

  const addCabinMutation = useMutation({
    mutationFn: async (newCabin) => await createCabin(newCabin),

    onMutate: (newCabin) => {
      //? cancel ongoing fetches that can overwrite optimistic update
      queryClient.cancelQueries({ queryKey: ["cabins"] });

      //? Snapshot the previous value for rollback
      const oldCabins = queryClient.getQueryData({ queryKey: ["cabins"] });

      //? create a mock version of the cabin that includes a temp ID
      const optimisticCabin = { ...newCabin, id: Date.now() };

      //? Optimistically update to the new value
      queryClient.setQueryData(["cabins"], (old) => [...(old || ), newCabin]);

      return { oldCabins };
    },

    onError: (error, newCabin, onMutateResult) => {
      queryClient.setQueryData(["cabins"], onMutateResult.oldCabins);
      console.error("Failed to add cabin:", error.message);
      toast.error(`Failed to add ${newCabin.name} newCabin`, {
        theme: theme,
      });
    },

    onSuccess: (newCabin) => {
      toast.success(`Added ${newCabin.name}`, {
        theme: theme,
      });
    },

    //? refetch changes from server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
  });

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

        <Field>
          <FieldLabel htmlFor="cabinPhoto">Cabin Photo</FieldLabel>
          <Input
            type="file"
            id="cabinPhoto"
            {...register("cabinPhoto")}
          ></Input>
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
          disabled={isSubmitting}
        >
          Create new cabin
        </Button>
      </DialogFooter>
    </>
  );
}
