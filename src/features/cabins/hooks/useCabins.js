import { getCabins } from "@/services/apiCabins";
import { useQuery } from "@tanstack/react-query";

export function useCabins() {
  return useQuery({
    queryKey: ["cabins"],
    queryFn: () => getCabins(),
  });
}
