import DataTable from "@/features/cabins/DataTable";
import { getCabins } from "@/services/apiBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Cabins() {
  // const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["cabins"],
    queryFn: () => getCabins(),
  });

  return (
    <div className="border border-red-500">
      <DataTable />
    </div>
  );
}
