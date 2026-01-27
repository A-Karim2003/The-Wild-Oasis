import { createCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDuplicateCabin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cabin) =>
      createCabin({
        cabinName: `${!cabin.name.startsWith("Copy") ? "Copy of" : ""} ${cabin.name}`,
        cabinCapacity: cabin.capacity,
        cabinPrice: cabin.price,
        cabinDiscount: cabin.discount,
        cabinDescription: cabin.description,
        cabinPhoto: cabin.image_url,
      }),
    onMutate: async (cabin) => {
      const queryKey = ["cabins"];

      //? remove id and created_at field
      const { id, created_at, ...cabinDuplicate } = cabin;

      await queryClient.cancelQueries({ queryKey });

      const oldCabins = queryClient.getQueryData(queryKey);

      const optimisticCabin = {
        ...cabinDuplicate,
        id: Date.now(),
        created_at: new Date().toISOString(),
        name: !cabin.name.startsWith("Copy")
          ? `Copy of ${cabin.name}`
          : cabin.name,
      };

      console.log(optimisticCabin);

      //? Optimistically cache
      queryClient.setQueryData(queryKey, (old) => [
        ...(old || []),
        optimisticCabin,
      ]);

      // for rollback
      return { oldCabins };
    },
    onSuccess: (data) => {
      toast.success(`Duplicated ${data.name}`);
    },

    onError: (error, cabin, onMutateResult) => {
      console.error("Failed to duplicate cabin:", error.message);
      toast.error(`Failed to duplicate ${cabin.cabinName}`);

      //? Rollback
      queryClient.setQueryData(["cabins"], onMutateResult.oldCabins);
    },
  });
}
