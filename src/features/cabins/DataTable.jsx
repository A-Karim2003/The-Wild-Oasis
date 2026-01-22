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

import { Button } from "@/components/ui/button";
import AddCabinModal from "./AddCabinModal";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDeleteCabin } from "./hooks/useDeleteCabin";

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

  const deleteCabinMutation = useDeleteCabin();

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
    <div className="rounded-md min-h-0  flex-1 flex flex-col gap-5">
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
                        header.getContext(),
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

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="ml-auto py-2 px-8 border-gold-accent hover:border-slate-200 hover:bg-gold-accent"
          >
            Add new cabin
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[90vw] max-w-300">
          <AddCabinModal />
        </DialogContent>
      </Dialog>
    </div>
  );
}
