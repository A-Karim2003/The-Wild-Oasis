import { supabase } from "@/lib/supabaseClient";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error(error.message);

  return cabins;
}

export async function deleteCabin(id) {
  const { error, data: cabin } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);

  return cabin;
}
