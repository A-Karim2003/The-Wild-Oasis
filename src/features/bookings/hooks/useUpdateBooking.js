import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function useUpdateBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, updatedFields }) => updateBooking(id, updatedFields),

    onSuccess: (data) => {
      //? Invalidate the specific booking
      queryClient.invalidateQueries({ queryKey: ["booking", data.id] });

      //? Invalidate the bookings list (so the table updates)
      queryClient.invalidateQueries({ queryKey: ["bookings"] });

      toast.success(`updated booking #${data.id}`);

      navigate(`/bookings/${data.id}`);
    },

    onError: (error, variable) => {
      console.error("Failed to update Booking:", error.message);
      toast.error(`Failed to update ${variable.id}`);
    },
  });
}
