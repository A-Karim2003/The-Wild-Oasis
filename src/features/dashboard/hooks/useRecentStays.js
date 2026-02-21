import { getStaysAfterDate } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router";

export default function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numOfDaysFilter = parseInt(searchParams.get("last")) || 7;
  const queryDate = subDays(new Date(), numOfDaysFilter).toISOString();

  return useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", numOfDaysFilter],
  });
}
