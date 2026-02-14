import { deleteBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id) => deleteBooking(id),
    onMutate: async (deletedId) => {
      //? cancel ongoing fetches that can overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ["bookings"] });

      //? Snapshot the previous value
      const oldBookings = queryClient.getQueryData(["bookings"]);

      //? Optimistically update to the new value
      queryClient.setQueryData(["bookings"], (old) =>
        old.filter((booking) => booking.id !== deletedId),
      );
      return { oldBookings };
    },

    onSuccess: (data) => {
      toast.success(`Deleted ${data.name}`);
      navigate("/bookings");
    },

    onError: (error, deletedId, onMutateResult) => {
      //? Restore the previous data before cache mutation
      queryClient.setQueryData(["bookings"], onMutateResult.oldBookings);

      console.error(error);
      toast.error(`Failed to delete booking ${deletedId}`);
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });
}
