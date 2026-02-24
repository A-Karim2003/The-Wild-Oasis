import { getStaysTodaysActivity } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export default function useTodaysActivities() {
  return useQuery({
    queryFn: getStaysTodaysActivity,
    queryKey: ["todays-activity"],
  });
}
