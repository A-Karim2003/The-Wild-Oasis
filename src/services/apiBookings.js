import { supabase } from "@/lib/supabaseClient";

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
