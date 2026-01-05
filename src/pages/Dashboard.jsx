import styles from "../features/dashboard/dashboard.module.css";

import KPICard from "@/features/dashboard/KPICard";
import { BriefcaseBusiness } from "lucide-react";
import { Banknote } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { ChartNoAxesColumnIncreasing } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="h-full w-full">
      <h1>Dashboard</h1>

      <div className={styles.grid}>
        <div className={styles.gridItem1}>
          <KPICard icon={BriefcaseBusiness} title={"BOOKINGS"} value={990} />
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
        <div className={styles.gridItem5}>5</div>
        <div className={styles.gridItem6}>6</div>
        <div className={styles.gridItem7}>7</div>
      </div>
    </div>
  );
}
