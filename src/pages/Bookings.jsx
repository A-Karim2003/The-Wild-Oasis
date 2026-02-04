import TableOperations from "@/features/cabins/TableOperations";
import Filter from "@/features/cabins/Filter";
import SortBy from "@/features/cabins/SortBy";
import {
  bookingsFilterOptions,
  bookingsSortOptions,
} from "@/features/bookings/bookingsOperationOptions/bookingOperationOptions";

export default function Bookings() {
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
      {/* <DataTable data={data} columns={columns} /> */}
    </div>
  );
}
