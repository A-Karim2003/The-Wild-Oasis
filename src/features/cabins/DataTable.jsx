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
import { toast } from "react-toastify";
import { useTheme } from "@/components/context/ThemeProvider";

export default function DataTable({ data, columns }) {
  const { theme } = useTheme();
  const [columnVisibility, setColumnVisibility] = useState({
    description: window.innerWidth >= 768,
  });

  console.log(theme);

  useEffect(() => {
    function handleResize() {
      setColumnVisibility({
        description: window.innerWidth >= 768,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const queryClient = useQueryClient();

  const deleteCabinMutation = useMutation({
    mutationFn: (id) => deleteCabin(id),

    //* Runs before API call
    onMutate: async (deletedId) => {
      //? cancel ongoing fetches that can overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ["cabins"] });

      //? Snapshot the previous value
      const oldCabins = queryClient.getQueryData({ queryKey: ["cabins"] });

      //? Optimistically update to the new value
      queryClient.setQueryData(["cabins"], (old) =>
        old.filter((cabin) => cabin.id !== deletedId)
      );

      //* onMutateResult from onError will have access to oldCabins
      return { oldCabins };
    },
    onSuccess: (deletedCabin) => {
      console.log(deletedCabin);
      toast.success(`Deleted ${deletedCabin.name}`, {
        theme: theme,
      });
    },

    //? Rollback on error
    onError: (error, _, onMutateResult) => {
      //? Restore the previous data before cache mutation
      queryClient.setQueryData(["cabins"], onMutateResult.oldCabins);
      console.error("Failed to delete cabin:", error.message);
      toast.error("Failed to delete Cabin", {
        theme: theme,
      });
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ["cabins"] }),
  });

  const table = useReactTable({
    data: data ?? [],
    state: {
      columnVisibility,
    },
    columns,
    getCoreRowModel: getCoreRowModel(),

    meta: {
      deleteCabinMutation, //* columns now has access
    },
  });

  return (
    <div className="rounded-md min-h-0 flex-1 flex flex-col ">
      <Table className="border">
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
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
