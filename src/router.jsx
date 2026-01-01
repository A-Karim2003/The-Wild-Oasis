import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "./RootLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: Error,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", Component: Dashboard },
      { path: "bookings", Component: Bookings },
      { path: "cabins", Component: Cabins },
      { path: "users", Component: Users },
      { path: "settings", Component: Settings },
      { path: "account", Component: Account },
      { path: "*", Component: PageNotFound },
    ],
  },
]);

export default router;
