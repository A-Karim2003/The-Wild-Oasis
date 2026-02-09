import { getBooking } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export default function useBooking(id) {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });
}
