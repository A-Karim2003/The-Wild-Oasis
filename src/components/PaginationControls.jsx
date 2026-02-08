import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router";

export default function PaginationControls({ table }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read from URL, with defaults if not present
  const pageIndex = parseInt(searchParams.get("page") || 0);
  const pageSize = parseInt(searchParams.get("pageSize") || 10);

  const totalRows = table.getFilteredRowModel().rows.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min(startRow + pageSize - 1, totalRows);

  function setPage(newPageIndex) {
    setSearchParams((params) => {
      params.set("page", String(newPageIndex));
      return params;
    });
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 border-t bg-gold-light">
      <div className="text-sm">
        Showing <span className="font-medium">{startRow}</span> to{" "}
        <span className="font-medium">{endRow}</span> of{" "}
        <span className="font-medium">{totalRows}</span> results
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => setPage(pageIndex - 1)}
          disabled={!table.getCanPreviousPage()}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <Button
          variant="ghost"
          onClick={() => setPage(pageIndex + 1)}
          disabled={!table.getCanNextPage()}
          className="flex items-center gap-1"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
