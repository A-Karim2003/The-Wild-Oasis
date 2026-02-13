import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EllipsisVertical, Eye, SquareCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/helpers";

const headerStyles = "flex items-center gap-2 text-sm md:text-lg";

const statusStyles = {
  "checked-in":
    "text-xs font-semibold bg-green-100 text-green-800 border border-green-200",
  "checked-out":
    "text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200",
  unconfirmed:
    "text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200",
};

export const columns = [
  {
    accessorFn: (row) => row.cabins?.name,
    id: "cabin",
    header: () => <div className={headerStyles}>CABIN</div>,
    cell: (info) => {
      return (
        <span className="whitespace-normal">{info.getValue() || "N/A"}</span>
      );
    },
  },

  {
    accessorFn: (row) => row.guests?.name,
    id: "guest",
    header: () => <div className={headerStyles}>GUEST</div>,
    cell: (info) => {
      const guest = info.row.original.guests;

      if (!guest) {
        return <span className="text-muted-foreground">No guest data</span>;
      }

      return (
        <div className="whitespace-normal">
          <div className="font-medium">{guest.name}</div>
          <div className="text-sm text-muted-foreground">{guest.email}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "start_date",
    id: "dates",
    header: () => <div className={headerStyles}>DATES</div>,
    cell: (info) => {
      const row = info.row.original;

      const startDate = new Date(row.start_date);
      const endDate = new Date(row.end_date);
      const today = new Date();

      // Calculate nights stay
      const nights = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));

      // Calculate time until booking from today
      const daysUntil = Math.round((startDate - today) / (1000 * 60 * 60 * 24));
      const yearsUntil = Math.floor(daysUntil / 365);

      // Determine prefix text
      let timeText = "";
      if (yearsUntil > 0) {
        if (daysUntil % 365 < 30) {
          timeText = `In over ${yearsUntil} year${yearsUntil > 1 ? "s" : ""}`;
        } else {
          timeText = `In almost ${yearsUntil + 1} year${yearsUntil + 1 > 1 ? "s" : ""}`;
        }
      } else if (daysUntil > 0) {
        timeText = `In ${daysUntil} day${daysUntil > 1 ? "s" : ""}`;
      } else if (daysUntil === 0) {
        timeText = "Today";
      } else {
        timeText = `${Math.abs(daysUntil)} day${Math.abs(daysUntil) > 1 ? "s" : ""} ago`;
      }

      // Format dates
      const formatDate = (date) => {
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      };

      return (
        <div className="whitespace-normal">
          <div className="font-medium">
            {timeText} → {nights} night{nights !== 1 ? "s" : ""} stay
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDate(startDate)} — {formatDate(endDate)}
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: () => <div className={headerStyles}>STATUS</div>,
    cell: (info) => {
      const status = info.getValue();

      return (
        <span
          className={`whitespace-normal uppercase px-3 py-1 rounded-full ${statusStyles[status]}`}
        >
          {info.getValue()}
        </span>
      );
    },
  },

  {
    // price and extras added for sorting purposes
    accessorFn: (row) => row.cabin_price + row.extras_price,
    id: "amount",
    header: () => <div className={headerStyles}>AMOUNT</div>,
    cell: (info) => (
      <span className="whitespace-normal">
        {formatCurrency(info.getValue())}
      </span>
    ),
  },

  {
    id: "actions",
    header: () => <span className="sr-only">actions</span>,
    cell: (info) => {
      const { navigate } = info.table.options.meta;
      const { id, status } = info.row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-200">
              <EllipsisVertical className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate(`/bookings/${id}`)}>
              <Eye />
              <span>See details</span>
            </DropdownMenuItem>

            {status === "unconfirmed" && (
              <DropdownMenuItem
                onClick={() => navigate(`/bookings/checkin/${id}`)}
              >
                <SquareCheck />
                <span>Check in</span>
              </DropdownMenuItem>
            )}

            {status === "checked-in" && (
              <DropdownMenuItem
              // onClick={() => navigate(`/bookings/checkin/${id}`)}
              >
                <Lock />
                <span>Check out</span>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>
              <Trash2 />
              <span>Delete booking</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
