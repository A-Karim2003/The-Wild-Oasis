import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Home,
  MessageSquare,
  Utensils,
  DollarSign,
  MoveLeft,
} from "lucide-react";
import { redirect, useNavigate, useParams } from "react-router";
import useBooking from "./hooks/useBooking";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import {
  formatCurrency,
  formatDistanceFromNow,
  subtractDates,
} from "@/utils/helpers";
import { getBooking } from "@/services/apiBookings";
import useCheckout from "./hooks/useCheckout";
import useDeleteBooking from "./hooks/useDeleteBooking";
import { AlertDialog } from "@/components/ui/alert-dialog";
import DeleteConfirmationModal from "../cabins/DeleteConfirmationModal";
import { useState } from "react";

export default function BookingDetails({ showActions = true, children }) {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { data: booking, isPending, error } = useBooking(bookingId);
  const { mutate: checkoutMutation, isPending: isCheckoutPending } =
    useCheckout();
  const { mutate: deleteBookingMutation, isPending: isDeletePending } =
    useDeleteBooking();

  const [isOpenForDelete, setIsOpenForDelete] = useState({
    isOpen: false,
    bookingId: null,
  });

  if (isPending) return <Spinner className="size-18 text-amber-600 m-auto" />;

  if (error) return <p>{error.message}</p>;

  const {
    id,
    start_date,
    end_date,
    num_of_guests,
    cabin_price,
    extras_price,
    hasBreakfast,
    observations,
    created_at,
    cabins,
    guests,
    isPaid,
    status,
  } = booking;

  const numNights = subtractDates(end_date, start_date);
  const totalPrice = cabin_price + extras_price;

  //* function for managing delete modal state
  function handleOpenForDelete(isOpen) {
    setIsOpenForDelete({ ...isOpenForDelete, isOpen: isOpen });
  }

  return (
    <div className="w-full ">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Booking #{id}</h2>

        <Button
          variant="ghost"
          className={"flex items-center gap-2 cursor-pointer"}
          onClick={() => navigate(-1)}
        >
          <MoveLeft className="text-gold-accent size-3xl " />
          Back
        </Button>
      </div>

      {/* Header Card */}
      <Card className="p-0 my-6">
        <div className="bg-gold-accent text-white rounded-lg p-4 flex items-start gap-4">
          <Home className="w-6 h-6" />
          <div>
            <h2 className="text-xl font-semibold">
              {numNights} nights in {cabins.name}
            </h2>
            <p className="text-indigo-100 mt-1">
              {format(new Date(start_date), "EEE, MMM dd yyyy")} (
              {formatDistanceFromNow(start_date)}) —{" "}
              {format(new Date(end_date), "EEE, MMM dd yyyy")}
            </p>
          </div>
        </div>
        <div className="space-y-6 p-4">
          {/* Guest Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <img
                src={guests.country_flag}
                alt={`${guests.name} flag`}
                className="w-6 h-4"
              />
              <span className="font-medium">
                {guests.name} + {num_of_guests - 1} guests
              </span>
              <span className="text-gray-400">•</span>
              <span>{guests.email}</span>
              <span className="text-gray-400">•</span>
              <span>Nationality ID {guests.nationality_id}</span>
            </div>

            {/* Observations */}
            {observations && (
              <div className="flex items-start gap-3 text-gray-700">
                <MessageSquare className="text-gold-accent size-3xl" />
                <div className="flex items-center gap-5">
                  <span className="font-medium">Observations</span>
                  <p className="text-gray-600">{observations}</p>
                </div>
              </div>
            )}

            {/* Breakfast */}
            <div className="flex items-center gap-3 text-gray-700">
              <Utensils className="text-gold-accent size-3xl" />
              <div>
                <span className="font-medium">Breakfast included?</span>
                <span className="ml-4 text-gray-600">
                  {hasBreakfast ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Price Card */}
          <div
            className={`${isPaid ? "bg-green-200" : "bg-yellow-200"} rounded-lg p-6 flex items-center justify-between`}
          >
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-yellow-700" />
              <span className="text-gray-600">Total price</span>
              <div>
                <span className="ml-4 text-xl font-semibold text-gray-900">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>
            <span className="text-yellow-700 font-semibold">
              {isPaid ? "PAID" : "WILL PAY AT PROPERTY"}
            </span>
          </div>

          {/* Booking Timestamp */}
          <div className="text-right text-sm text-gray-500">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, hh:mm a")}
          </div>
        </div>
      </Card>

      {/* Action Buttons */}

      {showActions && (
        <div className="flex items-center justify-end gap-3">
          {status === "checked-in" && (
            <Button
              variant="default"
              className="bg-gold-dark"
              onClick={() => checkoutMutation(id)}
            >
              {isCheckoutPending && <Spinner />}
              Check out
            </Button>
          )}

          <Button
            className={"cursor-pointer"}
            variant="destructive"
            onClick={() => setIsOpenForDelete({ isOpen: true, bookingId: id })}
          >
            {isDeletePending && <Spinner />}
            <span>Delete booking</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/bookings")}
            className={"cursor-pointer"}
          >
            Back
          </Button>

          {/* Modal for Deleting booking */}
          <AlertDialog
            open={isOpenForDelete.isOpen}
            onOpenChange={handleOpenForDelete}
          >
            <DeleteConfirmationModal
              data={isOpenForDelete.bookingId}
              type={"bookings"}
              mutate={deleteBookingMutation}
            />
          </AlertDialog>
        </div>
      )}

      {children}
    </div>
  );
}

// used to guard route.
export async function loader({ params }) {
  const booking = await getBooking(params.bookingId);

  if (booking.status !== "unconfirmed") {
    throw redirect(`/bookings/${params.bookingId}`);
  }

  return null;
}
