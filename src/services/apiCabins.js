import { supabase } from "@/lib/supabaseClient";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error(error.message);

  return cabins;
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        name: newCabin.cabinName,
        capacity: Number(newCabin.cabinCapacity),
        price: Number(newCabin.cabinPrice),
        discount: Number(newCabin.cabinDiscount) || 0,
        description: newCabin.cabinDescription,
        image_url: newCabin.cabinPhoto,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteCabin(id) {
  const { error, data: cabin } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return cabin;
}
