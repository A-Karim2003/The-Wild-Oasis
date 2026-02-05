import CabinDataTable from "@/features/cabins/CabinDataTable";
import { columns } from "../features/cabins/columns";
import TableOperations from "@/features/cabins/TableOperations";
import { useCabins } from "@/features/cabins/hooks/useCabins";
import Filter from "@/components/Filter";
import SortBy from "@/components/SortBy";

import {
  cabinFilterOptions,
  cabinSortOptions,
} from "@/features/cabins/cabinOperationOptions/cabinOperationOptions";
import { Spinner } from "@/components/ui/spinner";

export default function Cabins() {
  const { isPending, error, data } = useCabins();

  if (isPending) return <Spinner className="size-18 text-amber-600 m-auto" />;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-4xl font-bold max-[448px]:hidden">All cabins</h2>
        <TableOperations>
          <Filter
            filterOptions={cabinFilterOptions}
            paramName={"discount"}
            defaultValue="all"
          />
          <SortBy
            sortOptions={cabinSortOptions}
            paramName={"sortBy"}
            defaultValue="date-recent"
          />
        </TableOperations>
      </div>
      <CabinDataTable data={data} columns={columns} />
    </div>
  );
}
