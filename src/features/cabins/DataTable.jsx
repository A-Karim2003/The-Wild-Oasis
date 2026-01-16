import React, { useEffect, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "@/services/apiCabins";

export default function DataTable({ data, columns }) {
  const [columnVisibility, setColumnVisibility] = useState({
    description: window.innerWidth >= 768,
  });

  useEffect(() => {
    function handleResize() {
      setColumnVisibility({
        description: window.innerWidth >= 768,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const table = useReactTable({
    data: data ?? [],
    state: {
      columnVisibility,
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  //!

  const queryClient = useQueryClient();

  const deleteCabinMutation = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onMutate: async () => {
      //? cancel ongoing fetches that can overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ["cabins"] });

      //? Snapshot the previous value
      const oldCabins = queryClient.getQueriesData({ queryKey: ["cabins"] });

      //? Optimistically update to the new value
      queryClient.setQueriesData({ queryKey: ["cabins"] });
    },
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader className={"bg-gold-accent"}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow colSpan={columns.length} className="h-24 text-center">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>{" "}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
