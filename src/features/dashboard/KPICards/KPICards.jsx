import styles from "../../dashboard/dashboard.module.css";

import KPICard from "../KPICard";
import { BriefcaseBusiness } from "lucide-react";
import { Banknote } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import useBookings from "@/features/bookings/hooks/useBookings";

export default function KPICards() {
  const { data: bookings } = useBookings();

  return (
    <>
      <div className={styles.gridItem1}>
        <KPICard
          icon={BriefcaseBusiness}
          title={"BOOKINGS"}
          value={bookings?.length}
        />
      </div>
      <div className={styles.gridItem2}>
        <KPICard icon={Banknote} title={"SALES"} value={1_231_260.0} />
      </div>
      <div className={styles.gridItem3}>
        <KPICard icon={CalendarDays} title={"CHECK INS"} value={6} />
      </div>
      <div className={styles.gridItem4}>
        <KPICard
          icon={ChartNoAxesColumnIncreasing}
          title={"OCCUPANCY RATE"}
          value={48}
        />
      </div>
    </>
  );
}
