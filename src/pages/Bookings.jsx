import TableOperations from "@/features/cabins/TableOperations";
import Filter from "@/components/Filter";
import SortBy from "@/components/SortBy";
import {
  bookingsFilterOptions,
  bookingsSortOptions,
} from "@/features/bookings/bookingsOperationOptions/bookingOperationOptions";

import BookingDataTable from "@/features/bookings/BookingDataTable";
import useBookings from "@/features/bookings/hooks/useBookings";
import { columns } from "@/features/bookings/columns";
import { Spinner } from "@/components/ui/spinner";

export default function Bookings() {
  const { isPending, error, data } = useBookings();

  if (isPending) return <Spinner className="size-18 text-amber-600 m-auto" />;

  if (error) return <h1>{error.message}</h1>;

  console.log(data);

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-4xl font-bold max-[448px]:hidden">All Bookings</h2>
        <TableOperations>
          <Filter
            filterOptions={bookingsFilterOptions}
            paramName={"status"}
            defaultValue="all"
          />
          <SortBy
            sortOptions={bookingsSortOptions}
            paramName={"sortBy"}
            defaultValue="date-recent"
          />
        </TableOperations>
      </div>

      <BookingDataTable data={data} columns={columns} />
    </div>
  );
}
