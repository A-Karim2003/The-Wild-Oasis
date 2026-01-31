import React, { useEffect, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
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

import { AlertDialog } from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import CabinModalForm from "./CabinModalForm";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useCabinTable } from "./context/CabinTableProvider";

export default function DataTable({ data, columns }) {
  const { sorting, setSorting } = useCabinTable();

  const [columnVisibility, setColumnVisibility] = useState({
    description: window.innerWidth >= 768,
    created_at: false,
  });

  const [modalState, setModalState] = useState({
    isOpen: false,
    cabin: null,
    isOpenForEdit: false,
  });

  const [isOpenForDelete, setIsOpenForDelete] = useState({
    isOpen: false,
    cabin: null,
  });

  //* function opens create cabin modal when Add new cabin button is clicked
  function openForCreate(isOpen) {
    setModalState({ isOpen: isOpen, cabin: null, isOpenForEdit: false });
  }

  //* function opens edit cabin modal when edit button is clicked
  function openForEdit(cabin) {
    setModalState({ isOpen: true, cabin, isOpenForEdit: true });
  }

  //* Opens a confirmation model when delete button is clicked
  function openForDelete(isOpen) {
    setIsOpenForDelete({ ...isOpenForDelete, isOpen: isOpen });
  }

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
      sorting,
    },
    columns,
    meta: {
      //* columns now has access through info.table.options.meta
      onEdit: openForEdit,
      setIsOpenForDelete,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    onSortingChange: setSorting,
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

      {/* Modal for creating/editing a cabin */}
      <Dialog open={modalState.isOpen} onOpenChange={openForCreate}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="ml-auto py-2 px-8 border-gold-accent hover:border-slate-200 hover:bg-gold-accent hover:text-primary"
          >
            Add new cabin
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[90vw] max-w-300">
          <CabinModalForm
            modalState={modalState}
            setModalState={setModalState}
          />
        </DialogContent>
      </Dialog>

      {/* Modal for Delete cabin formation */}
      <AlertDialog open={isOpenForDelete.isOpen} onOpenChange={openForDelete}>
        <DeleteConfirmationModal cabin={isOpenForDelete.cabin} />
      </AlertDialog>
    </div>
  );
}
