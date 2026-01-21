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

  return data;
}

/*
Example Data returned from insert:

{
  capacity: 6;
  created_at: "2026-01-21T19:36:50.981345+00:00";
  description: "A luxury timber cabin featuring a private hot tub.";
  discount: 50;
  id: 22;
  image_url: "https://example.com/cabin-001.jpg";
  name: "The Sequoia Retreat";
  price: 250;
}
*/

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
