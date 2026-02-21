import { getBookingsAfterDate } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router";

export default function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numOfDaysFilter = parseInt(searchParams.get("last")) || 7;
  const queryDate = subDays(new Date(), numOfDaysFilter).toISOString();

  return useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", numOfDaysFilter],
  });
}
