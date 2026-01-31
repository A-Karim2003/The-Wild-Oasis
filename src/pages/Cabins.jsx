import { useState } from "react";

import DataTable from "@/features/cabins/DataTable";
import { columns } from "../features/cabins/columns";
import CabinTableOperations from "@/features/cabins/CabinTableOperations";
import { useCabins } from "@/features/cabins/hooks/useCabins";
import CabinTableProvider from "@/features/cabins/context/CabinTableProvider";

export default function Cabins() {
  const { isPending, error, data } = useCabins();

  if (isPending) return <h1>Loading...</h1>;
  if (isPending) return <h1>{error.message}</h1>;
  return (
    <CabinTableProvider>
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-4xl font-bold max-sm:hidden">All cabins</h2>
          <CabinTableOperations />
        </div>
        <DataTable data={data} columns={columns} />
      </div>
    </CabinTableProvider>
  );
}
