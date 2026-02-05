import TableRenderer from "@/components/TableRenderer";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";

export default function BookingDataTable({ data, columns }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md min-h-0  flex-1 flex flex-col gap-5">
      <TableRenderer table={table} />
    </div>
  );
}
