import DataTable from "@/features/cabins/DataTable";
import { getCabins } from "@/services/apiBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { columns } from "../features/cabins/columns";
import CabinTableOperations from "@/features/cabins/CabinTableOperations";

export default function Cabins() {
  // const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["cabins"],
    queryFn: () => getCabins(),
  });
  if (isPending) return <h1>Loading...</h1>;
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-4xl font-bold">All cabins</h2>
        <CabinTableOperations />
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
