import { supabase } from "@/lib/supabaseClient";

export async function getBookings() {
  let { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(name), guests(name, email)");
  if (error) throw new Error(error.message);

  return data;
}
