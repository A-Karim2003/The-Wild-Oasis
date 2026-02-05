import { getBookings } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export default function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBookings(),
  });
}
