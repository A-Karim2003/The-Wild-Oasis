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
    console.log(error);
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
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}
