import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      //? Invalidate all queries
      queryClient.invalidateQueries();
      toast.success(`Succcesfully checked out #${data.id}`);
    },

    onError: (error, variable) => {
      console.error("Failed to check out:", error.message);
      toast.error(`Failed to check out ${variable.id}`);
    },
  });
}
