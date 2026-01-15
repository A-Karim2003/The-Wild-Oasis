import { formatCurrency } from "@/utils/helpers";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = [
  {
    accessorKey: "image_url",
    header: () => <div className="flex items-center gap-2 text-lg">Image</div>,

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
    header: () => <div className="flex items-center gap-2 text-lg">Name</div>,

    cell: (info) => <span>{info.getValue()}</span>,
  },
  {
    accessorKey: "capacity",
    header: () => (
      <div className="flex items-center gap-2 text-lg">Capacity</div>
    ),
    cell: (info) => <span>Fits up to {info.getValue()} guests</span>,
  },
  {
    accessorKey: "price",
    header: () => <div className="flex items-center gap-2 text-lg">Price</div>,
    cell: (info) => <span>{formatCurrency(info.getValue())}</span>,
  },
  {
    accessorKey: "discount",
    header: () => (
      <div className="flex items-center gap-2 text-lg">Discount</div>
    ),
    cell: (info) => (
      <span className={info.getValue() > 0 ? "text-green-700" : ""}>
        {formatCurrency(info.getValue())}
      </span>
    ),
  },
  {
    accessorKey: "description",
    header: () => (
      <div className="flex items-center gap-2 text-lg">Description</div>
    ),
    cell: (info) => (
      <p className="whitespace-normal max-w-xs">{info.getValue()}</p>
    ),
  },

  {
    id: "actions",
    header: () => <span className="sr-only">actions</span>,
    cell: (info) => {
      console.log(info);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem></DropdownMenuItem>
            <DropdownMenuItem></DropdownMenuItem>
            <DropdownMenuItem></DropdownMenuItem>
            <DropdownMenuItem></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
