import styles from "../../dashboard/dashboard.module.css";

import KPICard from "../KPICard";
import { BriefcaseBusiness } from "lucide-react";
import { Banknote } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { formatCurrency } from "@/utils/helpers";

export default function KPICards({ bookings = [], isPending }) {
  const sales = bookings.reduce((acc, booking) => acc + booking.cabin_price, 0);
  const totalCheckins = bookings.reduce(
    (acc, booking) => (booking.status === "checked-in" ? acc + 1 : acc),
    0,
  );

  console.log();

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
        {isPending ? (
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
            value={48}
          />
        )}
      </div>
    </>
  );
}
