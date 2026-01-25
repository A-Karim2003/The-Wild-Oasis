import { updateCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedCabin) => updateCabin(updatedCabin),
    onMutate: async (updatedCabin) => {
      const queryKey = ["cabins"];

      await queryClient.cancelQueries({ queryKey });

      const previousCabins = queryClient.getQueryData(queryKey);

      let optimisticImageUrl = null;
      if (updatedCabin.cabinPhoto instanceof File) {
        optimisticImageUrl = URL.createObjectURL(updatedCabin.cabinPhoto);
      }

      const optimisticCabin = {
        id: updatedCabin.id,
        name: updatedCabin.cabinName,
        capacity: Number(updatedCabin.cabinCapacity),
        price: Number(updatedCabin.cabinPrice),
        discount: Number(updatedCabin.cabinDiscount) || 0,
        description: updatedCabin.cabinDescription,
        // If new blob, use it; otherwise, this property won't overwrite existing
        ...(optimisticImageUrl && { image_url: optimisticImageUrl }),
      };

      //? Preserve existing fields (like image_url) and overwrite with updated values
      queryClient.setQueryData(queryKey, (old) => {
        if (!old) return [];
        return old.map((cabin) =>
          cabin.id === optimisticCabin.id
            ? { ...cabin, ...optimisticCabin }
            : cabin,
        );
      });

      return { previousCabins, optimisticImageUrl };
    },

    onSuccess: () => {
      toast.success("updated Cabin");
    },

    onError: (error, updatedCabin, onMutateResult) => {
      //? Rollback
      queryClient.setQueryData(["cabins"], onMutateResult.previousCabins);

      console.error("Failed to update cabin:", error.message);

      toast.error(`Failed to update ${updatedCabin.cabinName}`);
    },

    onSettled: (_data_, _error, _newCabin, context) => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });

      //? Revoke the temp object URL to free browser memory
      if (context.optimisticImageUrl)
        URL.revokeObjectURL(context.optimisticImageUrl);
    },
  });
}
