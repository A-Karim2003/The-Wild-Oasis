import { getSettings } from "@/services/apiSettings";
import { useQuery } from "@tanstack/react-query";

export default function useSettings() {
  const { data, error, isPending } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });

  return { data, error, isPending };
}
