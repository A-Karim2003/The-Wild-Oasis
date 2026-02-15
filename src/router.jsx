import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "./RootLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import ErrorPage from "./pages/ErrorPage";
import BookingDetails, {
  loader as checkInLoader,
} from "./features/bookings/BookingDetails";
import CheckInBooking from "./features/bookings/CheckInBooking";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  { path: "login", Component: Login },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", Component: Dashboard },
      {
        path: "bookings",
        children: [
          { index: true, Component: Bookings },
          { path: ":bookingId", Component: BookingDetails },

          {
            path: "checkin/:bookingId",
            Component: CheckInBooking,
            loader: checkInLoader,
          },
        ],
      },
      { path: "cabins", Component: Cabins },
      { path: "users", Component: Users },
      { path: "settings", Component: Settings },
      { path: "account", Component: Account },
      { path: "*", Component: PageNotFound },
    ],
  },
]);

export default router;
