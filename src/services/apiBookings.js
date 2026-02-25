import { supabase } from "@/lib/supabaseClient";
import { getToday } from "@/utils/helpers";

export async function getBookings() {
  let { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(name), guests(name, email)");
  if (error) throw new Error(error.message);

  return data;
}
export async function getBooking(id) {
  let { data, error } = await supabase
    .from("bookings")
    .select(
      `
      id,
      start_date,
      end_date,
      num_of_guests,
      cabin_price,
      extras_price,
      status,
      hasBreakfast,
      isPaid,
      observations,
      created_at,
      cabins(name),
      guests(name, email, nationality_id, country_flag)
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateBooking(id, updatedFields) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .delete("*")
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) throw new Error(error.message);

  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(name)")
    .gte("start_date", date)
    .lte("end_date", getToday({ end: true }))
    .neq("status", "unconfirmed");

  if (error) throw new Error("Stays could not be loaded");

  return data;
}

export async function getStaysTodaysActivity() {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(name, nationality, country_flag)")
    .or(
      `and(start_date.eq.${today},status.eq.unconfirmed),and(end_date.eq.${today},status.eq.checked-in)`,
    )
    .order("created_at");

  if (error) throw new Error(error.message);

  return data;
}
