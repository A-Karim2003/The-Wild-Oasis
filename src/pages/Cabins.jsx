import DataTable from "@/features/cabins/DataTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { columns } from "../features/cabins/columns";
import CabinTableOperations from "@/features/cabins/CabinTableOperations";
import { getCabins } from "@/services/apiCabins";

export default function Cabins() {
  const { isPending, error, data } = useQuery({
    queryKey: ["cabins"],
    queryFn: () => getCabins(),
  });

  if (isPending) return <h1>Loading...</h1>;
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-4xl font-bold max-sm:hidden">All cabins</h2>
        <CabinTableOperations />
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
