import DataTable from "@/features/cabins/DataTable";
import { getCabins } from "@/services/apiBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { columns } from "../features/cabins/columns";

export default function Cabins() {
  // const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["cabins"],
    queryFn: () => getCabins(),
  });
  if (isPending) return <h1>Loading...</h1>;
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
