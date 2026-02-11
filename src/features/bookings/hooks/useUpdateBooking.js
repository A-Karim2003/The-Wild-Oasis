import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

export default function useUpdateBooking() {
  const queryClient = useQueryClient();
  const { bookingId } = useParams();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (bookingId, updatedFields) =>
      updateBooking(bookingId, updatedFields),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
      toast.success(`updated booking #${data.id}`);

      navigate("/");
    },

    //! Handle error
    onError: (error, variable) => {
      console.error("Failed to update Booking:", error.message);

      toast.error(`Failed to update ${variable.bookingId}`);
    },
  });
}
