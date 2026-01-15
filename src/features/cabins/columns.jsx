import { formatCurrency } from "@/utils/helpers";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Pencil, Trash } from "lucide-react";

const headerStyles = "flex items-center gap-2 text-sm md:text-lg ";
export const columns = [
  {
    accessorKey: "image_url",
    header: () => <div className={`${headerStyles}`}>Image</div>,

    cell: (info) => (
      <img
        src={info.getValue()}
        alt="cabin"
        className="w-24 h-24 min-w-24 object-cover rounded shrink-0"
      />
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className={`${headerStyles}`}>Name</div>,

    cell: (info) => (
      <span className="whitespace-normal">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "capacity",
    header: () => <div className={`${headerStyles}`}>Capacity</div>,
    cell: (info) => (
      <span className="whitespace-normal">
        Fits up to {info.getValue()} guests
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className={`${headerStyles}`}>Price</div>,
    cell: (info) => <span>{formatCurrency(info.getValue())}</span>,
  },
  {
    accessorKey: "discount",
    header: () => <div className={`${headerStyles}`}>Discount</div>,
    cell: (info) => (
      <span className={info.getValue() > 0 ? "text-green-700" : ""}>
        {formatCurrency(info.getValue())}
      </span>
    ),
  },

  {
    accessorKey: "description",
    header: () => <div className={headerStyles}>Description</div>,
    cell: (info) => (
      <p className="whitespace-normal max-w-xs">{info.getValue()}</p>
    ),
  },

  {
    id: "actions",
    header: () => <span className="sr-only">actions</span>,
    cell: (info) => {
      const cabin = info.row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Copy />
              <span>Duplicated</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
