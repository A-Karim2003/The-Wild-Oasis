import { supabase } from "@/lib/supabaseClient";
console.log(supabase);

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error(error.message);

  return cabins;
}

export async function createCabin(newCabin) {
  console.log(newCabin);

  // https://pfxghidskavifshmnpzc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  //?  Create a unique file name to avoid collisions
  const imageName =
    `${crypto.randomUUID()}-${newCabin.cabinPhoto.name}`.replace("/", "");
  console.log("imageName", imageName);

  //? Upload file to Supabase storage

  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        name: newCabin.cabinName,
        capacity: Number(newCabin.cabinCapacity),
        price: Number(newCabin.cabinPrice),
        discount: Number(newCabin.cabinDiscount) || 0,
        description: newCabin.cabinDescription,
        image_url: null,
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
