import React, { useEffect, useMemo, useState } from "react";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { AlertDialog } from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import CabinModalForm from "./CabinModalForm";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useSearchParams } from "react-router";
import TableRenderer from "@/components/TableRenderer";
import { useDeleteCabin } from "./hooks/useDeleteCabin";

const sortConfig = {
  "name-asc": [{ id: "name", desc: false }],
  "name-desc": [{ id: "name", desc: true }],
  "date-recent": [{ id: "created_at", desc: true }],
  "price-high": [{ id: "price", desc: true }],
  "price-low": [{ id: "price", desc: false }],
};
export default function CabinDataTable({ data, columns }) {
  const [searchParams] = useSearchParams();
  const { mutate } = useDeleteCabin();

  //* Read values from URL
  const sortBy = searchParams.get("sortBy") || "date-recent";
  const filterBy = searchParams.get("discount");

  const sorting = useMemo(() => {
    return sortConfig[sortBy] || sortConfig["date-recent"];
  }, [sortBy]);

  const columnFilters = useMemo(() => {
    return filterBy ? [{ id: "discount", value: filterBy }] : [];
  }, [filterBy]);

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
      columnFilters,
    },
    columns,
    meta: {
      //* columns now has access through info.table.options.meta
      onEdit: openForEdit,
      setIsOpenForDelete,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="rounded-md min-h-0  flex-1 flex flex-col gap-5">
      <TableRenderer table={table} />

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
        <DeleteConfirmationModal
          data={isOpenForDelete.cabin}
          mutate={mutate}
          type={"cabins"}
        />
      </AlertDialog>
    </div>
  );
}
