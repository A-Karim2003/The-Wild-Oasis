import TableRenderer from "@/components/TableRenderer";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { useSearchParams } from "react-router";

const sortConfig = {
  "date-recent": [{ id: "dates", desc: true }],
  "date-oldest": [{ id: "dates", desc: false }],
  "price-high": [{ id: "amount", desc: true }],
  "price-low": [{ id: "amount", desc: false }],
};
export default function BookingDataTable({ data, columns }) {
  const [searchParams] = useSearchParams();

  //* applys columns filtering
  const filterBy = searchParams.get("status");
  const columnFilters = useMemo(
    () => (filterBy ? [{ id: "status", value: filterBy }] : []),
    [filterBy],
  );

  //* applys column sorting
  const sortBy = searchParams.get("sortBy") || "date-recent";
  const sorting = useMemo(() => sortConfig[sortBy], [sortBy]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-md min-h-0  flex-1 flex flex-col gap-5">
      <TableRenderer table={table} />
    </div>
  );
}
