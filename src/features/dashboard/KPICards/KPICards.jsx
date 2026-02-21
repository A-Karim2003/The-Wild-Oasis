import styles from "../../dashboard/dashboard.module.css";
import KPICard from "../KPICard";
import { BriefcaseBusiness } from "lucide-react";
import { Banknote } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { formatCurrency, subtractDates } from "@/utils/helpers";
import { useSearchParams } from "react-router";
import { useCabins } from "@/features/cabins/hooks/useCabins";

export default function KPICards({
  bookings = [],
  isPending,
  confirmedStays = [],
  isStaysPending,
}) {
  const [searchParam] = useSearchParams();
  const { data: cabins = [] } = useCabins();

  //* Total sales
  const sales = bookings.reduce((acc, booking) => acc + booking.cabin_price, 0);

  //* Total check-ins
  const totalCheckins = confirmedStays.reduce(
    (acc, booking) => (booking.status === "checked-in" ? acc + 1 : acc),
    0,
  );

  //* Occupancy rate
  const occupations = confirmedStays.reduce(
    (acc, stay) => acc + subtractDates(stay.end_date, stay.start_date),
    0,
  );
  const lastNumOfDays = parseInt(searchParam.get("last")) || 7;

  const occupationRate = (
    (occupations / (lastNumOfDays * cabins.length)) *
    100
  ).toFixed(2);

  console.log(occupationRate);

  return (
    <>
      <div className={styles.gridItem1}>
        {isPending ? (
          <Spinner className="size-14 text-gold-accent m-auto" />
        ) : (
          <KPICard
            icon={BriefcaseBusiness}
            title={"BOOKINGS"}
            value={bookings?.length}
          />
        )}
      </div>
      <div className={styles.gridItem2}>
        {isPending ? (
          <Spinner className="size-14 text-gold-accent m-auto" />
        ) : (
          <KPICard
            icon={Banknote}
            title={"SALES"}
            value={formatCurrency(sales)}
          />
        )}
      </div>
      <div className={styles.gridItem3}>
        {isStaysPending ? (
          <Spinner className="size-14 text-gold-accent m-auto" />
        ) : (
          <KPICard
            icon={CalendarDays}
            title={"CHECK INS"}
            value={totalCheckins}
          />
        )}
      </div>
      <div className={styles.gridItem4}>
        {isPending ? (
          <Spinner className="size-14 text-gold-accent m-auto" />
        ) : (
          <KPICard
            icon={ChartNoAxesColumnIncreasing}
            title={"OCCUPANCY RATE"}
            value={`${occupationRate}%`}
          />
        )}
      </div>
    </>
  );
}
