import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Get all guest and cabin IDs from database
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");

  const allGuestIds = guestsIds.map((guest) => guest.id);

  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Get the cabin data to calculate prices
    const cabin = cabins.at(booking.cabin_id - 1);
    const numNights = subtractDates(booking.end_date, booking.start_date);
    const cabinPrice = numNights * (cabin.price - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.num_of_guests
      : 0; // hardcoded breakfast price

    // Determine status based on dates
    let status;
    if (
      isPast(new Date(booking.end_date)) &&
      !isToday(new Date(booking.end_date))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.start_date)) ||
      isToday(new Date(booking.start_date))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.end_date)) ||
        isToday(new Date(booking.end_date))) &&
      isPast(new Date(booking.start_date)) &&
      !isToday(new Date(booking.start_date))
    )
      status = "checked-in";

    return {
      ...booking,
      cabin_price: cabinPrice,
      extras_price: extrasPrice,
      guest_id: allGuestIds.at(booking.guest_id - 1),
      cabin_id: allCabinIds.at(booking.cabin_id - 1),
      status,
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

export default function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div className="mt-auto bg-gold-dark p-2 rounded-[5px] text-center flex flex-col gap-2">
      <h3>SEED DATABASE</h3>

      <Button
        onClick={uploadAll}
        disabled={isLoading}
        className="bg-gold-accent"
      >
        Upload ALL
      </Button>

      <Button
        onClick={uploadBookings}
        disabled={isLoading}
        className="bg-gold-accent"
      >
        Upload bookings ONLY
      </Button>
    </div>
  );
}
