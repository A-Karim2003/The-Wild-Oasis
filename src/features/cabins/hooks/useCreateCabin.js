import { createCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCabin) => createCabin(newCabin),

    onMutate: async (newCabin) => {
      //? cancel ongoing fetches that can overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ["cabins"] });

      //? Snapshot the previous value for rollback
      const oldCabins = queryClient.getQueryData({ queryKey: ["cabins"] });

      //? create a mock version of the cabin that includes a temp ID
      const optimisticCabin = {
        id: Date.now(),
        name: newCabin.cabinName,
        capacity: Number(newCabin.cabinCapacity),
        price: Number(newCabin.cabinPrice),
        discount: Number(newCabin.cabinDiscount) || 0,
        description: newCabin.cabinDescription,
        image_url: newCabin.cabinPhoto,
      };
      //? Optimistically update to the new value
      queryClient.setQueryData(["cabins"], (old) => [
        ...(old || []),
        optimisticCabin,
      ]);

      return { oldCabins };
    },

    onError: (error, newCabin, onMutateResult) => {
      //? Rollback
      queryClient.setQueryData(["cabins"], onMutateResult.oldCabins);

      console.error("Failed to add cabin:", error.message);
      toast.error(`Failed to add ${newCabin.cabinName} newCabin`);
    },

    onSuccess: (data) => {
      toast.success(`Added ${data.name}`);
    },

    //? Sync back with server to get the real IDs and timestamps
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
  });
}
