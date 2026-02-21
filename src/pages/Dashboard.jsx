import useRecentBookings from "@/features/dashboard/hooks/useRecentBookings";
import styles from "../features/dashboard/dashboard.module.css";
import KPICards from "@/features/dashboard/KPICards/KPICards";
import TableOperations from "@/features/cabins/TableOperations";
import Filter from "@/components/Filter";
import useRecentStays from "@/features/dashboard/hooks/useRecentStays";

export const dashboardFilterOptions = [
  { value: "7", label: "Last 7 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "90", label: "Last 90 Days" },
];

export default function Dashboard() {
  const { data: bookings, isPending } = useRecentBookings();

  const { data: confirmedStays, isStaysPending } = useRecentStays();

  console.log(confirmedStays);

  return (
    <div className="h-full w-full">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-4xl font-bold max-[448px]:hidden">Dashboard</h2>
        <TableOperations>
          <Filter
            filterOptions={dashboardFilterOptions}
            paramName={"last"}
            defaultValue={"7"}
          />
        </TableOperations>
      </div>

      <div className={styles.grid}>
        <KPICards
          bookings={bookings}
          isPending={isPending}
          confirmedStays={confirmedStays}
          isStaysPending={isStaysPending}
        />
        <div className={styles.gridItem5}>5</div>
        <div className={styles.gridItem6}>6</div>
        <div className={styles.gridItem7}>7</div>
      </div>
    </div>
  );
}
