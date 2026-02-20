import styles from "../features/dashboard/dashboard.module.css";
import KPICards from "@/features/dashboard/KPICards/KPICards";

export default function Dashboard() {
  return (
    <div className="h-full w-full">
      <h1>Dashboard</h1>

      <div className={styles.grid}>
        <KPICards />
        <div className={styles.gridItem5}>5</div>
        <div className={styles.gridItem6}>6</div>
        <div className={styles.gridItem7}>7</div>
      </div>
    </div>
  );
}
