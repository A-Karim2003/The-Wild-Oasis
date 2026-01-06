import { supabase } from "../lib/supabaseClient";

export async function getCabins() {
  try {
    const { data: cabins, error } = await supabase.from("cabins").select("*");
    if (error) throw new Error(error.message);
  } catch (error) {
    console.log(error);
  }
}
