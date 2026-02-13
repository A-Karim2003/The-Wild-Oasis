import { deleteBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteBooking(id),
    onMutate: async (deletedId) => {
      //? cancel ongoing fetches that can overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ["deletedId"] });

      //? Snapshot the previous value
      const oldBookings = queryClient.getQueryData(["bookings"]);
      console.log(id, oldBookings);
    },

    onError: (error, deletedId) => {
      console.error(error);
      toast.error(`Failed to delete booking ${deletedId}`);
    },
  });
}
