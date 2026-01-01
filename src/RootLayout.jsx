import { Outlet } from "react-router";
import Navbar from "./features/dashboard/Navbar";

function RootLayout() {
  return (
    <div>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
