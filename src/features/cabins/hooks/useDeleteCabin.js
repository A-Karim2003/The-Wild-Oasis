import { toast } from "react-toastify";

import { deleteCabin } from "@/services/apiCabins";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteCabin(id),

    //* Runs before API call
    onMutate: async (deletedId) => {
      //? cancel ongoing fetches that can overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ["cabins"] });

      //? Snapshot the previous value
      const oldCabins = queryClient.getQueryData({ queryKey: ["cabins"] });

      //? Optimistically update to the new value
      queryClient.setQueryData(["cabins"], (old) =>
        old.filter((cabin) => cabin.id !== deletedId),
      );

      //* onMutateResult from onError will have access to oldCabins
      return { oldCabins };
    },
    onSuccess: (deletedCabin) => {
      toast.success(`Deleted ${deletedCabin.name}`);
    },

    //? Rollback on error
    onError: (error, _, onMutateResult) => {
      //? Restore the previous data before cache mutation
      queryClient.setQueryData(["cabins"], onMutateResult.oldCabins);
      console.error("Failed to delete cabin:", error.message);
      toast.error("Failed to delete Cabin");
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ["cabins"] }),
  });
}
