import { getCurrentUser } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  return useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
    retry: false, // Don't retry if user is not authenticated
    staleTime: 5 * 60 * 1000, // data stays fresh for 5 min, reduces API calls
  });
}
